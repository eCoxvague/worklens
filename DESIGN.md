# WorkLens design

## Direction

A clean research notebook for computation: generous warm-white space, dark ink, and one restrained blue accent. The first viewport pairs the project proposition with an actual, editable calculation rather than decorative graphics. The visual proof is the product.

## Tokens

- Background: #f8f9fc; surface: #ffffff; ink: #14213d.
- Secondary ink: #526078; accent: #254be9; accent-soft: #edf1ff.
- Rules: #d6ddea; success: #186546; warning: #87520a.
- Display and body: self-hosted Manrope variable, 400–800.
- Data: system monospace, tabular numerals.
- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.
- Main content: 1160px maximum; minimum side gutters: 48px by default, 32px at widths up to 1050px, and 20px at widths up to 760px.
- Display type: clamp(2.8rem, 5.5vw, 4.7rem), line-height 1.08. At widths up to 1050px: clamp(2.7rem, 5.6vw, 4.7rem); up to 760px: clamp(2.8rem, 9vw, 4.5rem).
- Body: 17px, line-height 1.65. Navigation and control labels: 13–15px; compact data captions, badges, and notes: 12–13px.
- Controls: at least 44px high, 3px visible keyboard focus.

## Structure

Minimal navigation; two-column introduction with a computational example; three concise workflow rows; an honest implementation note; compact footer with source and QMS documentation. No testimonials, pricing, mailing list, decorative counters, scroll effects, or wallet requests.

The footer also links to a narrow, readable metrics-and-privacy page. It inherits the same tokens, explains session-based measurement, links to the external public dashboard, and provides opt-out choices. The footer wraps on narrow screens. No fabricated metric cards are rendered.

## Interaction

Changing a binary variable updates the highlighted matrix cells, score, and score-match status immediately. A reset restores the recorded example. Export saves the input, calculation convention, and verification limits in JSON. No animation is necessary; honor reduced motion.

## References

Impeccable's distill, craft-floor, and polish guidance informed hierarchy, restrained surfaces, accessible states, and truthful demo labeling. Astro Starlight and shadcn Taxonomy were reviewed for readable hierarchy and restrained navigation. No template source code was copied.
