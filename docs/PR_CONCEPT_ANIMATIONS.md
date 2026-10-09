# Add optional concept animations and a repeatable validation workflow

The tutor can now press ⓘ beside a question to show a gentle visual explanation, then replay it or close it and return to the same question. The teaching screen keeps its minimal layout. For example, He is at home becomes He is **not** at home, with not falling after is; question formation moves the be verb before the subject.

## Teaching and implementation

- Relevant transformations for negation, question order, contractions, possessive adjectives, capitalisation and long A patterns.
- Related examples for reading, vocabulary, geography and writing; example captions do not imply a bespoke animation for every question.
- Real text, short captions, one playback at a time, no audio, and an immediate final state under reduced motion.
- Pending timers and Web Animations are cancelled on close/replay. Viewing an explanation does not record an answer or change question position.
- Original worksheet photographs remain local. The discarded tutor portrait stays excluded.

## Validation

- Strict TypeScript checks, content/source mapping checks and concept validation pass locally.
- Browser checks pass for all 152 revealed-question layouts at 1280 × 720, with no page scrolling.
- Negation placement, inversion result, replay, reduced motion, dialog focus return and unchanged progress are tested.
- CI adds a clean npm install, type/build/content checks, committed-build verification, Chromium tests and screenshot artifacts.
- Remote CI results will be checked after publication; local passes are not presented as remote CI success.

## Motives, difficulties and limits

The learner is eight and easily distracted, so explanatory content lives in an optional modal. No generated raster images were necessary for this change: live text is clearer for spelling and grammar. Some explanations intentionally reveal useful information; this is a teaching aid, not a timed exam mode.

The target repository started empty. It needs the existing tested tool as a main-branch bootstrap before a feature PR can be compared. The earlier public push was stopped by automatic approval review; publication requires the user's explicit approval. Detailed decisions and process are in docs/DECISIONS.md and docs/DEVELOPMENT.md.
