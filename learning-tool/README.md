# Laith’s English Studio

## Open and teach

Double-click **index.html** in this folder. It runs offline in a modern browser; no installation or account is needed. Keep this folder beside the existing `tutor poses` folder for the character images. Original JPEG photos are optional, stay local and are excluded from GitHub.

You can also double-click **Open English Studio.cmd** in the parent folder to launch it in your default browser.

For Teams, share the browser window, open ⋯ → Full screen and use Larger text if Laith needs larger text. The default layout is designed for a landscape screen. If enlarged text needs more space on a smaller display, scroll or reduce the text size.

Laith answers aloud. The tutor selects his choice. The screen has back, Answer and next controls only. Open ⋯ for hints, explanations, spoken-answer marking and other tutor tools. Next never advances automatically. Open ⋯ → Topics to move between lessons, start shuffled Mixed practice, or revisit incorrect/revealed questions. Answering a question correctly removes it from the revisit list.

Open ⋯ → Tutor expression to select any of the 18 available expressions. Automatic reactions include raised eyebrows, serious, unsure, crossed arms, concerned, empathetic, reassuring, aha, proud, excited, surprised, caution and amused. Frustration and disappointment can be selected for appropriate teaching moments; they refer to the task. Character captions are hidden from the teaching screen.

Keyboard: T opens tutor tools; 1–4 select choices; H gives a hint; Left/Right change question; Space reveals when focus is outside a button; Esc closes a panel. When a button has keyboard focus, Space activates that button normally.

Progress and the current question are saved locally when browser storage is available. Local-file storage behaviour varies by browser; use the local server below for a stable browser origin. Progress stays in your browser. Storage belongs to the browser/device, so it is not synchronised through Teams.

## Content

The question bank follows the **13 photos explicitly selected for the next exam**, not the entire book. Every question has source details in Tutor tools. Worksheet practice adapts the page into a one-question spoken activity; it is not always a verbatim transcription. Extra practice is labelled separately.

Topics: vocabulary; countries and continents; am/is/are; origins and Where questions; The giraffe family comprehension and oral reading; possessive adjectives; long A phonics and the Jake story; capitalisation; three sentences about one's country.

The vocabulary continuation's page number is not visible, so the interface does not assign one. The selected classbook phonics photo remains labelled Classbook p. 15. Revision p. 10 is outside the selected scope. The continent exercise follows the worksheet's Australia label and explains the classbook's Oceania label. Country pictures are treated as worksheet clues rather than exclusive facts about those countries.

The ambiguous Friday sound question is explicitly reframed as an **ay spelling** question. Its explanation in Tutor tools explains that tail, plane and holiday all have long A. No original listening recordings are included. Open writing uses model answers, with clear instructions to accept other suitable answers and personalise facts rather than assume Laith's country.

The **ⓘ** beside the question opens a short concept animation. Replay repeats it; Escape or × closes it. Relevant family, giraffe and travel/arrival concepts include one simple illustration. Some concepts use clearly labelled teaching examples. Opening it does not change the score or advance the question. With reduced motion enabled on the device, the final state appears immediately. Image prompts and provenance are recorded in ../docs/ILLUSTRATIONS.md.

## Source and development

- `questions.ts`: typed question bank, source mappings and reading passages.
- `app.ts`: typed interface, feedback, navigation and local progress.
- `concepts.ts`: pure concept descriptions and grammar transformations.
- `concept-ui.ts`: optional animation window, replay and cleanup.
- `styles.css`: screen-share layout and effects, including reduced-motion support.
- `app.js`: generated browser script, included so the tool opens directly.
- `build.mjs`: uses Node 24's built-in TypeScript stripping; no third-party build dependencies. This builds executable JavaScript; it is not a TypeScript semantic type checker.

For development, use Node 24 and run `npm ci`, then `npm run check`. Run `npx playwright install chromium` once, then `npm run test:browser` for interactions, concepts and layout. The lockfile pins TypeScript and Playwright; teaching itself requires neither. CI runs the checks on pushes and pull requests. See ../docs/DEVELOPMENT.md and ../docs/DECISIONS.md for the review process, motives and limitations.

Optional local server: run `npm start` in this folder and open http://127.0.0.1:4173. Stop with Ctrl+C. The server listens only on this computer.
