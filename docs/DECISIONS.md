# Decisions and difficulties

## 2026-10-10 — Quiet teaching screen

**Need:** The learner is eight and easily distracted, and sees the app through Teams screen sharing.

**Decision:** Keep one question, choices, tutor portrait and back/answer/next controls visible. Put topics, sources, progress, hints and explanations in tutor tools. Remove branding, progress bars and character captions from the learner screen.

**Evidence:** Browser interaction and all 152 revealed-answer layouts were checked at 1280 × 720. The discarded curious portrait is absent from the pose catalogue; raised eyebrows replaces it. Tests check every available pose file.

## 2026-10-10 — Optional concept window

**Need:** The tutor wants a small information button that shows a concept visually, without restoring clutter.

**Decision:** Add one ⓘ button beside the question. Open a native modal with one short animation, a caption and replay. The first state lasts 1.6 seconds; transitions last 1.3 seconds, or 1.8 seconds for falling words. No looping, sound, auto-navigation or score changes. Closing/replaying cancels pending timers and animations.

**Grammar correction:** In a be sentence, not follows am/is/are: He is **not** at home. It does not go between he and is. Question formation moves is/are before the subject. Possessive adjectives precede a noun.

**Scope:** All nine topics have a visual explanation. Negation, inversion, contractions, pronoun/possessive mapping, capitalisation and spelling patterns use relevant word transformations. Some topics use a labelled illustrative example, rather than claiming an animation unique to every question. Opening a concept may disclose helpful answer information: this is a tutor-directed teaching aid, not an exam integrity mode.

**Pictures:** Generated images are permitted by the user when needed, but none are currently needed for these word transformations. Live text stays sharp during screen sharing, is easy to correct, and avoids spelling errors inside raster artwork. Future pictures should support a specific question, preserve the simple difficulty level and be recorded with their source/generation details.

**Phonics typography:** Keep letters joined as a real word, rather than separate padded tiles. Use the same dark green and bold weight for a_e, ai and ay. A single underline connects the a and silent e across their consonant. Surrounding letters stay plain; avoid italics, colour legends and multiple competing emphasis styles. Typography appears only in the optional concept window so a spelling question is not answered by its own styling.

**Accessibility:** Reduced-motion preference shows the final state immediately. The final result remains readable as real text, with an explanatory caption; focus and Escape use native dialog behaviour.

**Difficulty encountered:** The GitHub destination was initially empty, so there was no default-branch baseline for a conventional feature PR. An earlier push was blocked by automatic approval review because the repository is public and the content derives from private worksheet photos. Original photos remain excluded. Publishing must respect the approval result; do not bypass it through alternate tools. GitHub CLI network/authentication checks also require the allowed network execution context.
