# Changelog

## 2026-10-10 — Clearer controls

- Disable Answer once the right choice is picked (spoken and writing questions keep it, so the example answer can still be shown).
- Put a soft circle around the next arrow.

## 2026-10-10 — Gentle crossed-X more often

- Show the gentle crossed-X on alternate questions for a second wrong pick and for a spoken answer marked Try again, as well as on every first wrong pick.

## 2026-10-10 — Faster pictures

- Convert tutor pictures and illustrations to web-sized WebP: 37 MB down to under 1 MB.
- Preload every tutor expression so reactions change the moment an answer is picked.
- Remove the raised-eyebrows expression; the friendly amused expression replaces it on the opening screen and in the waiting rotation.

## 2026-10-10 — Larger tutor on phones

- On phones the tutor fills the space below the answers (up to 300px tall, never below 90px), so it is much larger while the controls stay on screen.

## 2026-10-10 — Score box and reset

- Show how many answers Laith has got right and wrong in Tutor tools.
- Add Reset progress, with confirmation, to Tutor tools; resetting also clears the count.

## 2026-10-10 — Repository tidy-up

- Rename `learning-tool` to `app`; move tutor portraits to `app/assets/tutor` and illustrations to `app/assets/illustrations`.
- Move the 28 page photos to `source-pages` as `page-01.jpeg` … `page-28.jpeg`.
- Remove one-off upload helpers and the branch-mode website redirect.
- Publish the website through GitHub Pages.

## Concept explanations, delayed retrieval and CI

- Include all 28 original page photos with explicit owner approval.
- Prepare a runtime-only GitHub Pages package and deployment gated by CI.
- Adapt phone/tablet layouts with safe-area spacing, touch targets and scrollable dialogs.
- Add packaged-site tests for iPhone/iPad WebKit and Android Chromium emulation.

- Retain missed and supported questions for an unaided later review after a 24-hour practice gap.
- Record hints, concepts and reveals separately from correct responses; preserve support across reloads.
- Add short mixed rounds, tutor-only lesson recap, and spoken/phonics coaching.

- Add three reusable illustrations inside relevant concept windows: family, giraffes and school arrival.
- Correct unrelated country-clue and oral-reading explanations found during code review.
- Restrict the local preview server to lesson assets; verify all concept windows fit at 1280 × 720.
- Keep phonics words joined; highlight long-A letters with one colour and bold weight, and connect split a_e with a simple underline.
- Add an optional ⓘ concept window with gentle word animation, replay and reduced-motion support.
- Explain negation, question order, contractions, possession, phonics, capitals and related source concepts.
- Add strict TypeScript checking, locked development dependencies, browser checks and GitHub Actions CI.
- Add a PR template and development/decision records.

## Initial local baseline — 2026-10-10

- Build 152 simple questions across the nine confirmed topic groups, based on 13 selected exam pages.
- Simplify the screen for an eight-year-old in a live Teams lesson.
- Add local progress, tutor reactions and a revisit queue; exclude the discarded portrait and original source photographs.
