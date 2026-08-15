# Mpathy Therapy — website

Five-page site for Mavis, BABCP Accredited CBT Psychotherapist.
Static HTML/CSS/JS, no build step, no dependencies.

```
mavis/
├── index.html          Homepage — 13 sections
├── services.html       CBT therapy service page + fees
├── about.html          Trust-first About page
├── writing.html        Writing showcase + newsletter
├── apply.html          Free-call enquiry form
└── assets/
    ├── styles.css      Design system
    └── app.js          Interaction layer (~320 lines, vanilla)
```

Preview: `python3 -m http.server 8000` → `/mavis/`

---

## Brand facts used (from Instagram, Aug 2026)

| | |
|---|---|
| Name | Mavis (she/her) |
| Practice | Mpathy Therapy |
| Credential | **BABCP Accredited CBT Psychotherapist** |
| Also | Emerging coach and writer |
| Tagline | "Where psychology meets soulful insight" |
| Strapline | "Reflections for healing, growth & becoming" |
| Domain | www.mpathytherapy.com |
| Themes seen | *We live our lives in between opposites* · *Living well with what hurts* |

The palette (warm ink, ivory, clay `#b45f3c`, gold) and the serif/sans pairing were
chosen to match the autumn tones and serif logotype already on the Instagram grid.

---

## ⚠️ Still to replace before launch

Placeholders appear in the markup as `[square brackets]`, plus a dark **draft notice**
at the top of each page — delete that element on all five pages when you go live.

| Where | What |
|---|---|
| All pages | The `.notice` element |
| Hero, About | Two `.portrait` blocks — swap the `<p>` for an `<img>` |
| `services.html` | **Session fee** and reduced fee (see below) |
| `index.html` | Coaching fee, number of coaching places, course season |
| `about.html` | Four story paragraphs — the most important text on the site |
| About + homepage | Qualification, further training, CPD hours, insurer, ICO number |
| `writing.html` | Two real pieces + one new one; the featured image |
| All pages | `hello@mpathytherapy.com` if that is not your address |
| Footer | Privacy, Terms and Complaints pages |
| `apply.html` | Wire the form to a real inbox (instructions in the file) |

### Setting your fee

UK private CBT runs roughly **£50–£120** per session in 2026; London and accredited
practitioners sit at the top of that. BABCP accreditation is a senior credential — pricing
below ~£80 signals less experience than you have. **£90–£110** is the defensible band,
with a reduced-fee rate around £55–£65 for the places you hold open.

### Two things carrying real regulatory weight

1. **No client testimonials.** I removed the placeholder ones deliberately and built a
   section explaining the refusal (`#proof`) — it converts better than quotes for a
   practice at your stage, and it keeps you clear of BABCP advertising expectations.
   If you ever do add them, get explicit written consent and check the current guidance.
2. **Every credential claim is verifiable.** The site points visitors at the BABCP
   register rather than asking them to take your word for it. Keep it that way.

---

## 1. The hero — engineered for three seconds

A visitor decides in about three seconds, and they are answering four questions at once.
The hero answers all four above the fold:

| Question | Answered by |
|---|---|
| What is this? | Eyebrow: **BABCP Accredited CBT Psychotherapist** |
| Is it for me? | Headline: **"You have been the strong one long enough."** |
| Why you and not someone else? | Subhead: evidence-based *and* soulful |
| What now? | **Book a free 20-minute call** + a low-commitment second door |

**The headline** describes the visitor, not the service. "Compassionate therapy for
women" is about you; "You have been the strong one long enough" is about her, and she
recognises herself before she has learned what you sell. It works because it names an
identity she has never said out loud, and it implies permission — *long enough* means
someone is about to let her stop.

**The subheadline** does the job the headline cannot: differentiation. Your entire wedge
is in one sentence — *properly evidence-based **and** has room for your soul*. Most CBT
feels clinical; most soulful therapy is not evidenced. You are the rare both. It then
closes with the promise stated as a negative, which is more believable than a positive:
"No worksheets without warmth. No platitudes without proof."

**The CTA** is "Book a free 20-minute call", not "Get started" or "Learn more". It states
the format, the length, the price and the commitment — a person hovering knows exactly
what they are agreeing to, which is the only thing that removes the fear of clicking. The
secondary CTA ("Read something of mine first") exists because roughly 95% of visitors are
not ready today; without it, "not yet" means leaving.

Directly beneath sits a four-item **trust band** — BABCP · CBT · UK-wide · Free call —
so that the credential is absorbed even by someone who never scrolls.

---

## 2. Homepage structure, and why each section is there

Conversion for a considered purchase is not a funnel; it is objections answered in the
order they arise.

1. **Hero** — as above.
2. **Trust band** — credential, method, reach, and the free call, in one glance.
3. **Marquee** — five presenting problems in motion. "She has seen this before."
4. **Resonance** — four "this is you" cards. Agitation through recognition, which is the
   only version that is ethical in mental health.
5. **The wedge** — *Where psychology meets soulful insight*, expanded. This is the
   section that makes you un-substitutable, so it gets a full dark band to itself.
6. **Guided quiz** — the conversion engine. Four services paralyse people; three
   questions route them to one and capture intent before the form.
7. **Pathways** — all four offers in one tabbed surface, with coaching and courses
   honestly labelled as newer. A multi-service practice looks scattered across four
   pages and coherent on one.
8. **The method** — Land · Name · Unhook · Become. An unnamed service is an hourly rate;
   a named method is intellectual property. This is the biggest single driver of
   perceived value on the page.
9. **Why there are no testimonials** — the trust section, and the most distinctive thing
   on the site. It converts a weakness (a new practice with no reviews) into evidence of
   integrity, then hands over four things the visitor can verify unaided.
10. **About strip** — in therapy the practitioner *is* the product.
11. **Writing** — converts the not-yet-ready into a relationship instead of a bounce.
12. **FAQ** — eight objections in her words, opening with "what does BABCP accredited
    actually mean?", which most people are too embarrassed to ask.
13. **Final CTA** — permission to be uncertain. Beats urgency in every considered
    purchase, and urgency in therapy is coercive anyway.

---

## 3. The service page (`services.html`)

Ordered so the fee arrives *after* the value is established but *before* the visitor has
to ask for it: who it is for → what the fee actually buys → fees → what happens next →
objections → CTA.

The pivotal section is **"What the fee actually buys"**. Clients silently price therapy
per hour of talking, so the page reframes it as a course of treatment: assessment,
written formulation, outcome measures, planned ending, plus supervision, CPD, insurance
and accreditation behind it. The closing line does the work — *you are not paying for
fifty minutes, you are paying for the years that made the fifty minutes worth having.*

Objections are answered rather than avoided, including the one nobody puts on a therapy
site: **"Is it worth it when the NHS is free?"** Answering that honestly (and offering to
help someone self-refer) buys more trust than dodging it ever could.

---

## 4. The writing page (`writing.html`)

Your portfolio is your writing, so it is treated like a body of work: a pinned featured
piece with real editorial weight, an archive grid, and a "what I write about" section
that turns scattered posts into four coherent themes. It ends with a commissions and
speaking enquiry — the writer's version of "hire me".

---

## 5. The About page (`about.html`)

Opens on the reader's actual thought — *"You are trying to work out if you can trust
me"* — and answers it with a verifiable credential in the first paragraph, before any
biography. Trust first, story second, humanity third.

The story block is deliberately left as four prompts rather than invented prose, because
this is the one section that cannot be outsourced. It also contains **"What I am like"**,
which almost no therapy site includes and every visitor wants: warm and direct, no
blank-faced silence, room for faith, and we will laugh.

---

## 6. Copy principles

1. **Name the person, not the service.**
2. **Say the quiet thing** — "Nothing is wrong with your life. That is exactly the problem."
3. **Remove risk out loud** — free, nothing sold, honest referral, published fees,
   reduced-fee places, "it has never once counted against anyone".
4. **Give the unready visitor somewhere to go** — every CTA is paired: book / read.

British spelling, second person, sharply varied sentence length, no exclamation marks,
concrete nouns over abstractions.

---

## 7. Mobile

- Every interactive element clears the 44px minimum; the 8px slider dots get an invisible
  44px hit area.
- Primary buttons go full-width under 900px — the easiest target on a phone.
- Form fields are 16px on mobile, which stops iOS zooming the page on focus.
- Hover-only effects (lifts, shadows, slide-ins) are disabled on touch, where they cost
  paint and never fire.
- `backdrop-filter` is swapped for flat opacity under 900px — blur is the single most
  expensive effect on mid-range Android.
- Below-the-fold sections use `content-visibility: auto` with an intrinsic size, so the
  browser skips layout and paint until they approach the viewport.
- The hero badge stops overlapping the portrait under 560px and becomes an inline row.
- Font request is trimmed to the weights actually used, with `display=swap`.

Remaining wins once real images exist: export at 2×, convert to WebP/AVIF, set explicit
`width`/`height` to stop layout shift, and add `loading="lazy"` to everything below the
fold. Two portraits carry this entire site — they are worth a real photographer.

---

## Wiring it up

- **Enquiry form** — `apply.html` has a commented block with three options (Netlify
  Forms, Formspree, your own endpoint). While `action` is empty the script shows an
  in-page confirmation instead of posting to a dead URL.
- **Newsletter** — same pattern on the homepage and writing page.
- **Booking** — if you use Acuity or Calendly, link the CTAs to it, but keep the enquiry
  form: the hesitant will write before they will self-book.
- **Analytics** — Plausible or Fathom suits this brand better than GA. Track quiz
  completions by result, tab switches, and enquiry submits.
