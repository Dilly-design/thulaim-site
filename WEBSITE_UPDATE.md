# Thulaim website update — 6 October 2026

Prepared from original revision `33de85596fd73263788b799e795558cdae523e9c`. Browser-based release to the existing main/root GitHub Pages source.

## Changes

- Short brand-derived line/dot motion; stable food photography and immediately readable headline.
- Clear Riyadh/private-occasion positioning, one primary WhatsApp route, optional menu builder.
- Mobile sticky WhatsApp appears after leaving the opening section; hidden while a menu or booking dialog is open.
- Occasion choices: tamimah, aqiqah, wedding, milkah, shabka, family gathering; the matching booking value is preselected.
- Real food/service gallery comes before the brand story. No invented customer testimonials or event volumes.
- Pre-rendered static HTML contains visible service and occasion text. Relative assets support a custom domain and GitHub Pages subpath.
- Root CNAME and original files/assets are retained. `.nojekyll` is added. No domain registrar or DNS settings changed.

## Verification

Production build passed. Mobile layout inspected at 390px iframe width; no horizontal overflow. Occasion prefill and dialog controls verified. WhatsApp destination and draft fields verified without sending a message. Full booking calculation/steps were previously verified and pricing logic is unchanged. Static HTML and referenced local assets checked.

## Release

The production assets are uploaded first, followed by the pre-rendered root index.html and .nojekyll. Editable React/Vite source is included in site-source.zip; extract it into the repository root to restore the site-source directory. From that directory run npm ci, then npm run pages to rebuild root files. Keep CNAME set to thulaim.com. Roll back the homepage by restoring index.html from the original revision above; original assets remain available.

## Sales evaluation after release

Record WhatsApp starts separately from actual messages. Track qualified inquiries (occasion, guest count, date), quotes issued, confirmed bookings, and cost per booking. Do not claim that UI changes alone guarantee revenue. Actual conversion measurement is not configured in this update.

## Latest design revision

- Opening simplified to a short headline, tagline, and single WhatsApp action.
- Brand watermark reveal and a scroll-driven frame transition; reduced motion supported.
- Repetitive service-summary and process sections removed, occasion and story copy shortened.
- Gallery expanded to nine real photographs, including seven new selections from Drive.
- Mobile width, gallery navigation, occasion prefill, and reduced-motion control checked.

## Occasion section refinement

Replaced duplicated category tabs and their large photograph with one compact six-option occasion selector. On mobile the options form two rows; each opens booking with the correct occasion selected. Existing menu, pricing, gallery, WhatsApp route, and domain configuration are preserved.
