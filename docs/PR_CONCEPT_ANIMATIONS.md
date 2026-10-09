# Add concept teaching, delayed retrieval and mobile-ready GitHub Pages

The tutor can now press ⓘ beside a question to show a gentle visual explanation, then replay it or close it and return to the same question. The teaching screen keeps its minimal layout. For example, He is at home becomes He is **not** at home, with not falling after is; question formation moves the be verb before the subject.

Immediate correction now stays in the revisit queue. An unaided response after a 24-hour practice gap records delayed recall; hints, concepts and reveals record support. Mixed rounds offer 5/10/15 questions and an optional tutor recap, keeping the learner screen quiet.

The same question flow now supports phone/tablet layouts with touch targets and safe-area spacing. GitHub Pages packages runtime files only and deploys from main after desktop and mobile checks pass.

## Teaching and implementation

- Relevant transformations for negation, question order, contractions, possessive adjectives, capitalisation and long A patterns.
- Three reusable generated illustrations for relevant family, giraffe and school-arrival questions; prompts and provenance recorded.
- Correct unrelated country-picture and oral-reading examples; restrict preview-server routes to lesson assets.
- Related examples for reading, vocabulary, geography and writing; example captions do not imply a bespoke animation for every question.
- Real text, short captions, one playback at a time, no audio, and an immediate final state under reduced motion.
- Pending timers and Web Animations are cancelled on close/replay. Viewing an explanation does not record an answer or change question position.
- Original worksheet photographs remain local. The discarded tutor portrait stays excluded.

## Validation

- Strict TypeScript checks, content/source mapping checks and concept validation pass locally.
- Browser checks pass for all 152 question and concept layouts at 1280 × 720, including image loading, with no scrolling.
- Negation placement, inversion result, replay, reduced motion, dialog focus return, support tracking and delayed-retrieval transitions are tested.
- CI adds a clean npm install, type/build/content checks, committed-build verification, Chromium tests and screenshot artifacts.
- Remote CI results will be checked after publication; local passes are not presented as remote CI success.

## Motives, difficulties and limits

The learner is eight and easily distracted, so explanatory content lives in an optional modal. Three illustrations are reused where useful; spelling and grammar retain live text. Some explanations intentionally reveal useful information; this is a teaching aid, not a timed exam mode.

The target repository started empty. It needs the existing tested tool as a main-branch bootstrap before a feature PR can be compared. The earlier public push was stopped by automatic approval review; publication requires the user's explicit approval. Detailed decisions and process are in docs/DECISIONS.md and docs/DEVELOPMENT.md.
