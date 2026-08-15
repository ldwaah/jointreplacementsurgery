/* ==========================================================================
   MPATHY — interaction layer
   No dependencies. Every enhancement degrades to a working static page.
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* --- Scroll progress -------------------------------------------------- */
  function scrollProgress() {
    var bar = $('.progress');
    if (!bar) return;
    var tick = function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var pct = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = 'scaleX(' + pct + ')';
    };
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    tick();
  }

  /* --- Header: solidify on scroll, hide on scroll-down ------------------ */
  function header() {
    var el = $('.header');
    if (!el) return;
    var last = window.scrollY;

    // The pre-launch notice sits in the flow above a fixed header. Ride the
    // header down by whatever is left of it so the two never overlap.
    // Delete the notice element and this becomes a no-op.
    var notice = $('.notice');
    var noticeH = notice ? notice.offsetHeight : 0;

    var place = function () {
      if (noticeH) el.style.top = Math.max(0, noticeH - window.scrollY) + 'px';
    };

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      el.classList.toggle('is-stuck', y > noticeH + 40);
      var drawerOpen = document.body.classList.contains('drawer-open');
      el.classList.toggle('is-hidden', y > 420 && y > last && !drawerOpen);
      last = y;
      place();
    }, { passive: true });

    window.addEventListener('resize', function () {
      noticeH = notice ? notice.offsetHeight : 0;
      place();
    });

    place();
  }

  /* --- Mobile drawer ---------------------------------------------------- */
  function drawer() {
    var panel = $('.drawer');
    var open = $('.menu-btn');
    var close = $('.drawer__close');
    if (!panel || !open) return;

    var setOpen = function (state) {
      panel.classList.toggle('is-open', state);
      document.body.classList.toggle('drawer-open', state);
      document.body.style.overflow = state ? 'hidden' : '';
      open.setAttribute('aria-expanded', String(state));
      panel.setAttribute('aria-hidden', String(!state));
      if (state) { (close || panel).focus(); } else { open.focus(); }
    };

    open.addEventListener('click', function () { setOpen(true); });
    if (close) close.addEventListener('click', function () { setOpen(false); });
    $$('a', panel).forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && panel.classList.contains('is-open')) setOpen(false);
    });
  }

  /* --- Reveal on scroll ------------------------------------------------- */
  function reveals() {
    var items = $$('.reveal, .reveal-mask');
    if (!items.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* --- Stagger helper: auto-delay siblings ------------------------------ */
  function stagger() {
    $$('[data-stagger]').forEach(function (group) {
      var step = parseInt(group.getAttribute('data-stagger'), 10) || 80;
      $$('.reveal', group).forEach(function (el, i) {
        el.style.setProperty('--delay', (i * step) + 'ms');
      });
    });
  }

  /* --- Custom cursor ---------------------------------------------------- */
  function cursor() {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    var dot = document.createElement('div');
    dot.className = 'cursor';
    dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);

    var x = 0, y = 0, cx = 0, cy = 0, raf = null;
    var loop = function () {
      cx += (x - cx) * 0.18;
      cy += (y - cy) * 0.18;
      dot.style.transform = 'translate3d(' + (cx - 17) + 'px,' + (cy - 17) + 'px,0)';
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', function (e) {
      x = e.clientX; y = e.clientY;
      if (!raf) loop();
    });
    document.addEventListener('mouseover', function (e) {
      var hit = e.target.closest('a, button, .card, .quiz__option, .step');
      dot.classList.toggle('is-active', !!hit);
    });
    document.addEventListener('mouseleave', function () { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', function () { dot.style.opacity = '1'; });
  }

  /* --- Magnetic buttons ------------------------------------------------- */
  function magnetic() {
    if (reduceMotion || window.matchMedia('(pointer: coarse)').matches) return;
    $$('[data-magnetic]').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.3;
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* --- Tabs (pathways) -------------------------------------------------- */
  function tabs() {
    $$('[data-tabs]').forEach(function (root) {
      var triggers = $$('[role="tab"]', root);
      var panels = $$('[role="tabpanel"]', root);
      if (!triggers.length) return;

      var select = function (id, focus) {
        triggers.forEach(function (t) {
          var on = t.getAttribute('aria-controls') === id;
          t.setAttribute('aria-selected', String(on));
          t.setAttribute('tabindex', on ? '0' : '-1');
          if (on && focus) t.focus();
        });
        panels.forEach(function (p) { p.classList.toggle('is-active', p.id === id); });
      };

      triggers.forEach(function (t, i) {
        t.addEventListener('click', function () { select(t.getAttribute('aria-controls')); });
        t.addEventListener('keydown', function (e) {
          var dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
          if (!dir) return;
          e.preventDefault();
          var next = triggers[(i + dir + triggers.length) % triggers.length];
          select(next.getAttribute('aria-controls'), true);
        });
      });

      // Allow deep links / quiz routing: #pathways?tab=coaching or data attr
      root.selectTab = select;
    });
  }

  function openPathway(key) {
    var root = $('[data-tabs]');
    if (!root || !root.selectTab) return;
    var trigger = $('[role="tab"][data-key="' + key + '"]', root);
    if (!trigger) return;
    root.selectTab(trigger.getAttribute('aria-controls'));
    var target = $('#pathways');
    if (target) target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }

  /* --- Accordion -------------------------------------------------------- */
  function accordions() {
    $$('.accordion').forEach(function (root) {
      var single = root.hasAttribute('data-single');
      var triggers = $$('.accordion__trigger', root);
      triggers.forEach(function (t) {
        t.addEventListener('click', function () {
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          var isOpen = t.getAttribute('aria-expanded') === 'true';
          if (single) {
            triggers.forEach(function (other) {
              if (other === t) return;
              other.setAttribute('aria-expanded', 'false');
              var p = document.getElementById(other.getAttribute('aria-controls'));
              if (p) p.classList.remove('is-open');
            });
          }
          t.setAttribute('aria-expanded', String(!isOpen));
          if (panel) panel.classList.toggle('is-open', !isOpen);
        });
      });
    });
  }

  /* --- Testimonial slider ----------------------------------------------- */
  function quotes() {
    var root = $('.quotes');
    if (!root) return;
    var items = $$('.quote', root);
    var dots = $$('.quotes__dot', root);
    if (items.length < 2) return;
    var idx = 0;
    var timer = null;

    var go = function (n) {
      idx = (n + items.length) % items.length;
      items.forEach(function (q, i) { q.classList.toggle('is-active', i === idx); });
      dots.forEach(function (d, i) { d.setAttribute('aria-selected', String(i === idx)); });
    };
    var restart = function () {
      if (reduceMotion) return;
      window.clearInterval(timer);
      timer = window.setInterval(function () { go(idx + 1); }, 7500);
    };

    var prev = $('[data-quote-prev]', root);
    var next = $('[data-quote-next]', root);
    if (prev) prev.addEventListener('click', function () { go(idx - 1); restart(); });
    if (next) next.addEventListener('click', function () { go(idx + 1); restart(); });
    dots.forEach(function (d, i) {
      d.addEventListener('click', function () { go(i); restart(); });
    });
    root.addEventListener('mouseenter', function () { window.clearInterval(timer); });
    root.addEventListener('mouseleave', restart);
    restart();
  }

  /* --- Counting stats --------------------------------------------------- */
  function counters() {
    var nodes = $$('[data-count]');
    if (!nodes.length) return;
    var run = function (el) {
      var target = parseFloat(el.getAttribute('data-count'));
      var suffix = el.getAttribute('data-suffix') || '';
      var prefix = el.getAttribute('data-prefix') || '';
      if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
      var start = performance.now();
      var dur = 1500;
      var step = function (now) {
        var p = Math.min((now - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = target % 1 ? (target * eased).toFixed(1) : Math.round(target * eased);
        el.textContent = prefix + val + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { nodes.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        io.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    nodes.forEach(function (el) { io.observe(el); });
  }

  /* --- Guided quiz ------------------------------------------------------ */
  var QUIZ_RESULTS = {
    therapy: {
      title: 'Start with Therapy',
      body: 'What you are carrying deserves a clinical space, not a strategy session. We begin with a full assessment and weekly sessions until the ground feels steady underneath you.',
      cta: 'Book a therapy consultation',
      href: 'apply.html?path=therapy',
      key: 'therapy'
    },
    coaching: {
      title: 'Start with Coaching',
      body: 'You are not in crisis — you are in transition. Coaching gives you a strategist and a witness for the next twelve months of your life, with the psychological depth most coaching skips.',
      cta: 'Apply for coaching',
      href: 'apply.html?path=coaching',
      key: 'coaching'
    },
    courses: {
      title: 'Start with a Course',
      body: 'You want the framework in your own hands, at your own pace. The programmes give you the same method I use one-to-one, structured so you can work through it privately.',
      cta: 'See the current cohort',
      href: 'apply.html?path=courses',
      key: 'courses'
    },
    writing: {
      title: 'Start with the Writing',
      body: 'You are not ready to be in a room with someone yet — and that is a legitimate place to begin. Read first. The letters arrive every other Sunday and cost you nothing but attention.',
      cta: 'Read the letters',
      href: '#journal',
      key: 'writing'
    }
  };

  function quiz() {
    var root = $('.quiz');
    if (!root) return;
    var steps = $$('.quiz__step', root);
    var bars = $$('.quiz__progress i', root);
    var result = $('.quiz__result', root);
    if (!steps.length || !result) return;

    var scores = {};
    var at = 0;

    var show = function (n) {
      steps.forEach(function (s, i) { s.classList.toggle('is-active', i === n); });
      bars.forEach(function (b, i) { b.classList.toggle('is-done', i <= n); });
    };

    var finish = function () {
      var best = 'therapy';
      var top = -1;
      Object.keys(scores).forEach(function (k) {
        if (scores[k] > top) { top = scores[k]; best = k; }
      });
      var r = QUIZ_RESULTS[best] || QUIZ_RESULTS.therapy;
      $('[data-result-title]', root).textContent = r.title;
      $('[data-result-body]', root).textContent = r.body;
      var link = $('[data-result-cta]', root);
      link.textContent = r.cta;
      link.setAttribute('href', r.href);
      var jump = $('[data-result-jump]', root);
      if (jump) {
        jump.onclick = function (e) { e.preventDefault(); openPathway(r.key); };
      }
      steps.forEach(function (s) { s.classList.remove('is-active'); });
      bars.forEach(function (b) { b.classList.add('is-done'); });
      result.classList.add('is-active');
      result.setAttribute('tabindex', '-1');
      result.focus({ preventScroll: true });
    };

    $$('.quiz__option', root).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var weight = btn.getAttribute('data-weight') || '';
        weight.split(',').forEach(function (pair) {
          var parts = pair.split(':');
          var k = parts[0].trim();
          if (!k) return;
          scores[k] = (scores[k] || 0) + (parseFloat(parts[1]) || 1);
        });
        at += 1;
        if (at >= steps.length) { finish(); } else { show(at); }
      });
    });

    var restart = $('.quiz__restart', root);
    if (restart) {
      restart.addEventListener('click', function () {
        scores = {}; at = 0;
        result.classList.remove('is-active');
        bars.forEach(function (b) { b.classList.remove('is-done'); });
        show(0);
      });
    }

    show(0);
  }

  /* --- Forms: client-side validation + graceful confirmation ------------ */
  function forms() {
    $$('form[data-form]').forEach(function (form) {
      var status = $('.form-status', form);
      form.addEventListener('submit', function (e) {
        // No backend is wired yet — see README. Confirm in-page instead of
        // dropping the visitor onto a broken endpoint.
        if (!form.getAttribute('action')) {
          e.preventDefault();
          if (!form.reportValidity()) return;
          if (status) {
            status.textContent = form.getAttribute('data-success') ||
              'Thank you — your message is with Mavis. You will hear back within two working days.';
            status.classList.add('is-visible');
          }
          form.reset();
        }
      });
    });
  }

  /* --- Prefill the enquiry form from ?path= ----------------------------- */
  function prefill() {
    var select = $('[data-path-select]');
    if (!select) return;
    var path = new URLSearchParams(window.location.search).get('path');
    if (!path) return;
    var match = $$('option', select).filter(function (o) { return o.value === path; })[0];
    if (match) select.value = path;
  }

  /* --- Pathway deep-links from anywhere on the page --------------------- */
  function pathwayLinks() {
    $$('[data-open-pathway]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        openPathway(el.getAttribute('data-open-pathway'));
      });
    });
  }

  /* --- Ambient background video ----------------------------------------- */
  function ambient() {
    var vids = $$('[data-ambient]');
    if (!vids.length) return;
    // Decorative only: never spend a download on it for someone who has asked
    // for less motion, and never before it is close to being seen.
    if (reduceMotion) return;

    var start = function (v) {
      if (v.dataset.started) return;
      v.dataset.started = '1';
      // Sources are held back in data-src so nothing is fetched until now;
      // the browser then picks the first type it can actually play.
      $$('source[data-src]', v).forEach(function (src) {
        src.src = src.getAttribute('data-src');
      });
      v.load();
      var p = v.play();
      // Autoplay can still be refused (battery saver, iOS low power). The
      // poster stays put, so a rejection is silent rather than broken.
      if (p && p.catch) p.catch(function () {});
    };

    if (!('IntersectionObserver' in window)) { vids.forEach(start); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        start(e.target);
        io.unobserve(e.target);
      });
    }, { rootMargin: '200px' });
    vids.forEach(function (v) { io.observe(v); });
  }

  /* --- Year stamp ------------------------------------------------------- */
  function year() {
    $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* --- Boot ------------------------------------------------------------- */
  function init() {
    scrollProgress();
    header();
    drawer();
    stagger();
    reveals();
    cursor();
    magnetic();
    tabs();
    pathwayLinks();
    accordions();
    quotes();
    counters();
    quiz();
    ambient();
    forms();
    prefill();
    year();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
