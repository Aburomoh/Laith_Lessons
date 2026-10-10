# Laith’s English Studio

A quiet, offline English practice tool for an eight-year-old, designed for live tutoring over Microsoft Teams screen sharing.

**Website:** [https://aburomoh.github.io/Laith_Lessons/](https://aburomoh.github.io/Laith_Lessons/) — open it on a computer, iPhone, iPad or Android device.

## Start

Use the website above, or download the repository and open `app/index.html` in your browser. On Windows, double-click `Open English Studio.cmd`.

The teaching screen shows one question, answer choices, a tutor image and three controls: **back · answer · next**. A small **⋯** button opens a short menu: the right/wrong count, then Topics, Mixed practice, Hint, Explanation, Source photo, Lesson recap, Larger text, Full screen and Reset progress. Press **T** to open those tools from the keyboard.

Laith answers aloud. The tutor operates the screen. Responses stay hidden until a choice is selected or Answer is pressed. No account, internet connection or installation is required to teach.

## Phones and tablets

The interface adapts to iPhone, iPad and Android screen sizes, with touch controls and scrollable dialogs. For access from another device, use the website link; a computer’s 127.0.0.1 preview address is local to that computer. Progress remains separate in each browser/device.

## Included

- 152 questions across nine topics, grounded in the 13 selected exam pages.
- Clearly distinguished source-based and extra practice in the ⋯ menu.
- Short feedback, expressive tutor poses, mixed practice and a revisit queue.
- Local browser progress and TypeScript/CSS source.

## Folders

```text
app/                 The app: open app/index.html
  assets/tutor/        17 tutor expressions (WebP, about 40 KB each)
  assets/illustrations/ 3 concept pictures
source-pages/        28 original page photos (page-01 … page-28), approved by the owner
docs/                Teaching decisions, development guide, illustration notes
.github/             Tests and website deployment
```

The website leaves out the page photos; the app works without them. When opened from a download, ⋯ → Source photo shows the matching photo.

See [the teaching and development guide](app/README.md) for keyboard shortcuts, source notes and build instructions.
