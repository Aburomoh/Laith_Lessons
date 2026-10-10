# Laith’s English Studio

## Open and teach

Double-click **index.html** in this folder. It runs offline in a modern browser; no installation or account is needed. The 13 page photos the questions use are in `assets/pages` as small WebP copies; the full-size originals of all 28 pages are in `../source-pages`.

You can also double-click **Open English Studio.cmd** in the parent folder to launch it in your default browser.

For Teams, share the browser window, open ⋯ → Full screen and use Larger text if Laith needs larger text. The default layout is designed for a landscape screen. If enlarged text needs more space on a smaller display, scroll or reduce the text size.

Laith answers aloud. The tutor selects his choice. The screen has back, Answer and next controls only. Open ⋯ for the menu: Topics (choose a lesson or Practise again), Mixed practice (a shuffled round of 5, 10 or 15 questions), Source photo, Full story on reading questions, More (Hint, Explanation, Larger text, Full screen) and Reset progress. On spoken and writing questions the menu also shows ✓ Correct and ↻ Try again. Next never advances automatically. Missed, hinted, explained and revealed questions remain in review after immediate correction. They clear only after an unaided correct response at least 24 hours after their last recorded practice. This is a practical schedule, not a mastery score.

Finish a round to see correct responses, support, misses, reveals and successful delayed recall. Counts may overlap. Start new lesson recap clears only the recap; it never clears the review queue or bypasses the delay. The recap otherwise persists across reloads.

The tutor picture reacts automatically: amused, reassuring, serious or unsure while Laith thinks; the gentle crossed-X, concerned, empathetic or reassuring after a wrong answer; proud, excited or aha after a right one; caution for a hint.

Keyboard: P turns the pen on or off (Esc also turns it off); T opens the menu; 1–4 select choices; H gives a hint; Left/Right change question; Space reveals when focus is outside a button; Esc closes a panel. When a button has keyboard focus, Space activates that button normally.

The box at the top of the ⋯ menu shows how many answers Laith has got right and wrong since the last reset. Every marked attempt counts, including a second try at the same question and spoken answers marked ✓ or ↻; hints and reveals are not counted. **Reset progress** at the bottom of the menu clears this count, the review queue and the lesson recap after a confirmation.

Progress and the current question are saved locally when browser storage is available. Local-file storage behaviour varies by browser; use the local server below for a stable browser origin. Progress stays in your browser. Storage belongs to the browser/device, so it is not synchronised through Teams.

## Content

The question bank follows the **13 photos explicitly selected for the next exam**, not the entire book. Every question has source details in the ⋯ menu. Worksheet practice adapts the page into a one-question spoken activity; it is not always a verbatim transcription. Extra practice is labelled separately.

Topics: vocabulary; countries and continents; am/is/are; origins and Where questions; The giraffe family comprehension and oral reading; two extra readings, The parrot family and A new home in Tokyo; possessive adjectives; long A phonics and the Jake story; capitalisation; three sentences about one's country.

The vocabulary continuation's page number is not visible, so the interface does not assign one. The selected classbook phonics photo remains labelled Classbook p. 15. Revision p. 10 is outside the selected scope. The continent exercise follows the worksheet's Australia label and explains the classbook's Oceania label. Country pictures are treated as worksheet clues rather than exclusive facts about those countries.

The ambiguous Friday sound question is explicitly reframed as an **ay spelling** question. Its explanation in the ⋯ menu explains that tail, plane and holiday all have long A. No original listening recordings are included. Open writing uses model answers, with clear instructions to accept other suitable answers and personalise facts rather than assume Laith's country.

The **ⓘ** beside the question opens a short concept animation. Replay repeats it; Escape or × closes it. Relevant family, giraffe and travel/arrival concepts include one simple illustration. Some concepts use clearly labelled teaching examples. Opening it before answering records support and schedules later review, without recording an answer or advancing the question. Teaching explanations are collapsed in tutor tools; opening one also records support. With reduced motion enabled on the device, the final state appears immediately. Image prompts and provenance are recorded in ../docs/ILLUSTRATIONS.md.

## Extra readings

The parrot family and A new home in Tokyo are extra practice written to match the giraffe page: the same layout (parents, then two children speaking with their ages), present simple with am/is/are, aren’t/don’t, I like + -ing and because, and the same question types (who, how old, true/false, find a verb, noun, adjective or pronoun, opposites and word meanings). They reuse worksheet vocabulary (family words, countries, Friday, friendly, difficult, arrive, travel, school bus, Tokyo, sushi, parrot, football) and each adds exactly two new words: count and feathers; garden and summer. Beyond names, the only other words not in the worksheets are very basic: colours, small, big, every, eight and eating.

## Source and development

- `questions.ts`: typed question bank, source mappings and reading passages.
- `progress.ts`: pure delayed-retrieval transitions and lesson recap evidence.
- `app.ts`: typed interface, feedback, navigation and local progress.
- `concepts.ts`: pure concept descriptions and grammar transformations.
- `concept-ui.ts`: optional animation window, replay and cleanup.
- `styles.css`: screen-share layout and effects, including reduced-motion support.
- `app.js`: generated browser script, included so the tool opens directly.
- `build.mjs`: uses Node 24's built-in TypeScript stripping; no third-party build dependencies. This builds executable JavaScript; it is not a TypeScript semantic type checker.

For development, use Node 24 and run `npm ci`, then `npm run check`. Run `npx playwright install chromium` once, then `npm run test:browser` for interactions, concepts and layout. The lockfile pins TypeScript and Playwright; teaching itself requires neither. CI runs the checks on pushes and pull requests. See ../docs/DEVELOPMENT.md and ../docs/DECISIONS.md for the review process, motives and limitations.

Optional local server: run `npm start` in this folder and open http://127.0.0.1:4173. Stop with Ctrl+C. The server listens only on this computer.
