# MPATHY — premium website build

A four-pillar site (Therapy · Coaching · Courses · Writing) for Mavis.
Static HTML/CSS/JS, no build step, no dependencies. Drop the folder on any host.

```
mavis/
├── index.html          Homepage — the full 13-section experience
├── about.html          The longer story, credentials, beliefs
├── apply.html          Consultation enquiry + reassurance rail
├── assets/styles.css   Design system (tokens → primitives → sections)
└── assets/app.js       Interaction layer (vanilla, ~300 lines)
```

Preview locally: `python3 -m http.server 8000` then open `/mavis/`.

---

## ⚠️ Read this before publishing

I could not reach the Instagram account (`@mpathytherapy`) — Instagram is blocked from
this environment and there is no reliable public record of the practice. **Every factual
claim on the site is a placeholder.** Persuasive copy is finished and ready to use;
facts are not, and publishing them as-is would misrepresent a real practice.

Placeholders are marked in the markup as `[square brackets]`. Replace all of them:

| Where | What to replace |
|---|---|
| Every page, top | The dark **pre-launch notice strip** — delete the whole element |
| Hero + About | Two `.portrait` blocks — swap the `<p>` note for an `<img>` |
| Pathways × 4 | `£[Fee]`, cohort dates, place counts, reader numbers |
| Proof | **Three sample testimonials** — replace with real, consented quotes |
| Proof | **Four statistics** — `data-count` values; use figures you can evidence |
| Course spotlight | `[Course Name]` and the six module descriptions |
| About page | Four biography paragraphs, six credential rows, ethical framework |
| Investment | All three tier prices |
| FAQ | `[platform]`, `[location]`, `[days]`, `[ethical framework]` |
| Footer | Email, practice name, ICO/registration number, legal page links |
| Safeguarding block | Swap 999 / Samaritans for local equivalents if not UK |
| `apply.html` | Wire the form to a real endpoint (instructions in the comment) |

Two things carry real regulatory weight: **testimonials** (many therapy bodies restrict
them, and consent must be explicit and recorded) and **credential claims** (each one
should be verifiable on a public register in under a minute). Check both against your
professional body's advertising rules before launch.

---

## The 13 sections, and why each one is there

Conversion for a high-consideration service is not a funnel — it is a sequence of
objections answered in the order they arise.

1. **Hero** — the visitor's own situation named back to them in one line. Not what
   Mavis does; what they *are*. Dual CTA: ready ("Book a consultation") and not-ready
   ("Not sure where to start?"). Never make the unready visitor choose between booking
   and bouncing.
2. **Marquee** — five presenting problems in motion. In two seconds it says "she has
   seen this before", the single strongest early trust signal.
3. **Resonance** — four "this is you" cards. Problem-agitation done with recognition
   rather than fear, which is the only version that works in mental health.
4. **Guided quiz** — the conversion engine. Four offers paralyse people; three
   questions route them to one. It also captures intent before the enquiry form.
5. **Pathways** — tabbed depth for all four pillars. Tabs, not four pages: a
   multi-service business looks scattered when it fragments, and coherent when one
   surface holds the range.
6. **Method** — a named four-step process (Land · Name · Unhook · Build). This is the
   single biggest driver of perceived price. An unnamed service is an hourly rate; a
   named method is intellectual property.
7. **Proof** — testimonial slider + counted statistics. Emotional proof and numerical
   proof answer different objections; you need both.
8. **Course spotlight** — one flagship offer with its curriculum open. The accordion
   lets sceptics audit the content without a sales call.
9. **About strip** — the person. In therapy the practitioner *is* the product, so this
   sits mid-page where trust is being decided, with the full story a click away.
10. **Investment** — real prices, on the page. Hiding fees behind "enquire" costs more
    bookings than any number ever does, and it reads as distrust of your own value.
11. **Writing** — three essays plus a newsletter capture. Most visitors are not ready
    today; this converts the 95% into a relationship instead of a bounce.
12. **FAQ** — seven objections, answered in the visitor's own words. "Is this therapy
    or coaching?", "I tried therapy before and it did not help", "Can I afford this?"
13. **Final CTA** — permission to be uncertain. "You do not have to arrive certain"
    outperforms urgency in every high-consideration category.

Plus the **safeguarding block** in the footer. Ethically necessary, and it reads as
seriousness — a practitioner who has thought about the worst case.

---

## The design decisions that make it read as expensive

Premium is not more decoration. It is fewer elements, held to a higher standard.

**Space.** Section padding runs to `9.5rem` on desktop. Cheap sites are dense because
density feels like value for money; expensive sites are confident enough to leave
things out.

**Type as the whole design.** One variable serif (Fraunces, with its optical-size and
`WONK` axes on the italics) against one neutral sans (Inter). Display type reaches
`7.4rem` and sets at `line-height: 0.94`, which only looks right at that scale — the
single clearest signal of a designed page. Every size is a `clamp()` on the viewport,
so the hierarchy holds identically at 320px and 2560px.

**A warm, restrained palette.** Ink `#17120f`, canvas `#f6f0e8`, one accent clay
`#b45f3c`, gold `#c8a45c` used sparingly. No pure black, no pure white — both read as
default, and default reads as cheap. Warm neutrals are load-bearing in this category:
the page has to feel like a room you would sit down in.

**Texture.** An SVG grain overlay at 32% multiply, plus soft radial blooms behind the
hero and CTA. Flat colour looks like a template; grain looks printed.

**Editorial furniture.** Hairline rules, `01–04` numbering, uppercase eyebrows at
`0.22em` tracking, hanging quote marks. The vocabulary is print, not SaaS.

**Motion with intent.** Masked line-by-line reveals in the hero; staggered
`IntersectionObserver` reveals elsewhere (80–90ms apart — under 60 looks nervous, over
150 looks broken); a 34px cursor ring that scales to 66px over anything interactive;
magnetic buttons; a hairline scroll-progress bar; buttons whose fill sweeps up from
below on hover. Every duration sits between 0.3s and 1.05s on
`cubic-bezier(0.22, 1, 0.36, 1)` — one easing curve across the whole site, which is what
makes it feel like one hand made it.

**Interaction that does work, not tricks.** The quiz routes to an offer. The tabs hold
four services in one place. The accordion lets people audit a curriculum. The slider
is keyboard-operable and pauses on hover. Nothing animates that does not earn it.

**Restraint as a signal.** Two typefaces. One accent. One easing curve. One radius
scale (14 / 18 / 22px, and 999px for pills). Consistency at that level is what people
are actually reading when they say a site "looks expensive".

**Craft that only shows when it is missing.** `prefers-reduced-motion` disables every
animation. Focus rings are visible and styled. Tabs have full arrow-key support and
correct ARIA. There is a skip link. The form validates before it confirms. Contrast
passes AA throughout.

---

## The copy engine

Four rules generated every line on this site.

**1. Name the person, not the service.** "You have been the strong one long enough"
beats "Compassionate therapy for women". The reader should recognise herself before she
learns what you sell.

**2. Say the quiet thing.** "Nothing is wrong with your life. That is exactly the
problem." Specific enough to be uncomfortable is the point — vague comfort converts
nobody.

**3. Remove the risk, out loud.** Free consultation, no preparation, nothing sold, an
honest referral if you are not the fit, prices published, reduced-fee places, "asking
has never once counted against anyone". Each line answers a real reason someone closes
the tab.

**4. Give the unready visitor somewhere to go.** Every CTA is paired: book / read.
Apply / see what it involves. The letters exist precisely so that "not yet" is a path
rather than an exit.

Voice notes: British spelling; second person throughout; sentences that vary sharply in
length; no exclamation marks; no clinical jargon; concrete nouns over abstractions
("the diagnosis, the grief" not "life's challenges").

---

## Wiring it up

- **Enquiry form** — `apply.html` has a commented block with three options (Netlify
  Forms, Formspree, your own endpoint). While `action` is empty, the script shows an
  in-page confirmation rather than posting to a dead URL.
- **Newsletter** — same pattern on the homepage; point it at your email platform.
- **Booking** — if you use Acuity/Calendly, either link the CTAs straight to it or
  embed it below the form. Keep the enquiry form as well: not everyone will self-book,
  and the enquiry route converts the hesitant.
- **Analytics** — a privacy-first tool (Plausible/Fathom) suits this brand better than
  GA. Worth tracking: quiz completions by result, tab switches, and enquiry submits.
- **Images** — export at 2× and convert to WebP. Two portraits carry the whole site;
  they are worth a real photographer.
