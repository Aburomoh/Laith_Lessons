# Decisions and difficulties

## 2026-10-10 — Full expression range approved

The parent confirms that Laith interprets the tutor's exaggerated expressions as funny, including expressions that could otherwise appear judgmental. Keep all 18 approved poses available: do not remove, soften or prohibit frustration, disappointment, skepticism or firm crossed arms on that assumption. Use them as playful reactions to a tricky problem, a surprising choice or a deliberate tutor joke, with timing guided by the tutor and Laith's response. Avoid automatically escalating sternness after repeated mistakes; the tutor can choose the full range for appropriate moments. The previously discarded image remains excluded. This clarification preserves the existing pose catalogue and tutor control; no interface change is needed.

## 2026-10-10 — Quiet teaching screen

**Need:** The learner is eight and easily distracted, and sees the app through Teams screen sharing.

**Decision:** Keep one question, choices, tutor portrait and back/answer/next controls visible. Put topics, sources, progress, hints and explanations in tutor tools. Remove branding, progress bars and character captions from the learner screen.

**Evidence:** Browser interaction and all 152 revealed-answer layouts were checked at 1280 × 720. The discarded curious portrait is absent from the pose catalogue; raised eyebrows replaces it. Tests check every available pose file.

## 2026-10-10 — Optional concept window

**Need:** The tutor wants a small information button that shows a concept visually, without restoring clutter.

**Decision:** Add one ⓘ button beside the question. Open a native modal with one short animation, a caption and replay. The first state lasts 1.6 seconds; transitions last 1.3 seconds, or 1.8 seconds for falling words. No looping, sound, auto-navigation or score changes. Closing/replaying cancels pending timers and animations.

**Grammar correction:** In a be sentence, not follows am/is/are: He is **not** at home. It does not go between he and is. Question formation moves is/are before the subject. Possessive adjectives precede a noun.

**Scope:** All nine topics have a visual explanation. Negation, inversion, contractions, pronoun/possessive mapping, capitalisation and spelling patterns use relevant word transformations. Some topics use a labelled illustrative example, rather than claiming an animation unique to every question. Opening a concept may disclose helpful answer information: this is a tutor-directed teaching aid, not an exam integrity mode.

**Pictures:** Grammar transformations use live text. Following the user's illustration approval, three images support relevant vocabulary and reading concepts: a fictional family, giraffes with visible spot patterns, and school arrival. One picture appears only inside the optional concept window. Prompts and provenance are in ILLUSTRATIONS.md. Reuse keeps generation and asset costs small. These are illustrative scenes, not portraits of the people in the reading passage.

**Phonics typography:** Keep letters joined as a real word, rather than separate padded tiles. Use the same dark green and bold weight for a_e, ai and ay. A single underline connects the a and silent e across their consonant. Surrounding letters stay plain; avoid italics, colour legends and multiple competing emphasis styles. Typography appears only in the optional concept window so a spelling question is not answered by its own styling.

**Accessibility:** Reduced-motion preference shows the final state immediately. The final result remains readable as real text, with an explanatory caption; focus and Escape use native dialog behaviour.

**Difficulty encountered:** The GitHub destination was initially empty, so there was no default-branch baseline for a conventional feature PR. An earlier push was blocked by automatic approval review because the repository is public and the content derives from private worksheet photos. Original photos remain excluded. Publishing must respect the approval result; do not bypass it through alternate tools. GitHub CLI network/authentication checks also require the allowed network execution context.

## 2026-10-10 — Focused code review

Read the study map, README, development guide and decisions before editing. Corrected country-picture concepts that fell back to an unrelated Brazil example and oral-reading guidance that incorrectly used an age example. Added an asset registry, descriptive alt text and graceful image-load fallback. The optional local server now serves only known lesson-file categories, preventing requests for Git metadata and development files. No new runtime dependencies or learner controls were added.

Validation: strict TypeScript and content checks; browser checks covering all 152 question and concept layouts at 1280 × 720, reduced motion and image loading; loopback checks for allowed assets and denied repository internals. Generated images were visually inspected. Remote CI is a separate check after publication.

## 2026-10-10 — Pedagogy review: delayed retrieval

Applied the user-supplied expert review locally; no issue or comment was posted. Correcting an error immediately now leaves the question in review. Hint, concept, teaching explanation and reveal events count as support; mistakes also make immediate correction supported. A successful unaided response after at least 24 hours without a recorded practice event clears review and records remembered-later evidence. A new mistake reopens review. The 24-hour interval is a transparent scheduling choice, not an evidence-based mastery threshold or guarantee of retention.

Support survives navigation and reloads. Older incorrect/revealed records migrate into pending review with a fresh delay; older correct records are not retroactively labelled unaided or remembered. Opening a concept after a selected correct choice does not undo that response. Source photos and full stories remain tutor reference tools: use Hint to record any additional modelling or assistance supplied outside the tracked controls.

Mixed rounds default to 10, with 5 and 15 available. Tutor-only recaps record overlapping lesson events and persist until Start new lesson recap. Starting a recap never bypasses the retrieval delay. Tutor coaching preserves flexible spoken marking, invites explanations of choices, and asks the child to read phonics words aloud before identifying spelling. No extra learner-screen labels, controls or difficulty were added.

Difficulty: progress previously had one last-result field, so an immediate correction erased a miss. A separate pure transition model now retains support and review eligibility alongside the legacy last-result field. Local storage can be unavailable and records are not synchronised between devices; unrecorded tutor help cannot be inferred. Tests cover state transitions and browser reload behaviour as well as the existing exhaustive layouts.

## 2026-10-10 — Mobile access and GitHub Pages

The user requests public GitHub hosting and phone/tablet access. Preserve the same one-question flow on small screens; enlarge touch targets, account for safe areas, wrap tutor controls, and allow vertical scrolling instead of shrinking all text to fit. Use WebKit device emulation for iPhone/iPad and Chromium for Android. Physical-device behaviour remains a separate verification limit.

Pages deploys only the explicitly packaged runtime after both desktop and mobile checks pass on main. Feature branches and PRs validate without deploying. The root redirect uses a relative link so the app works below the repository subpath and offline. No original worksheet images are published. The push was again rejected by automatic approval review, which requires explicit consent to expose the adapted exam content publicly despite the hosting request. Complete and test locally before requesting that consent; do not bypass the rejection.

Validation: strict TypeScript/content checks and the desktop suite passed. The packaged site passed all 152 question/concept layouts on iPhone SE and iPad WebKit emulation, plus nine representative topics on iPhone landscape and Android. Touch controls, dialogs, large text and project-relative assets passed. iPhone and iPad screenshots were visually reviewed. No physical-device or remote CI pass is claimed.

## 2026-10-10 — All original page photographs approved

The user explicitly approved including all 28 original page photographs in the commit, in addition to the 18 tutor portraits and 3 concept illustrations. Root JPEG exceptions and the GitHub export now include those 28 files. Keep their names and locations for the source viewer. The discarded tutor_curious portrait remains excluded. This supersedes the earlier repository-photo exclusion; the lightweight Pages artifact still omits source photographs. Prepared files remain available for the user to commit and push themselves.
