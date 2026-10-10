# Development and review

Use a feature branch for changes. Keep `main` as the reviewed baseline. Open a PR with the learner-facing outcome, teaching decisions, validation evidence and remaining limitations. Wait for CI and human review before merging; do not auto-merge.

From `app`, use Node 24 and run:

```sh
npm ci
npm run check
npx playwright install chromium webkit
npm run test:browser
npm run build:pages
npm run test:mobile
```

`check` performs strict TypeScript checking, regenerates `app.js`, and validates content and source mappings. Browser tests use local files: no preview server, external worksheet images or hosted services are required. CI installs Chromium and its system dependencies and uploads screenshots as review artifacts. It also rejects a stale generated `app.js`.

Runtime remains dependency-free; TypeScript and Playwright are development dependencies. Dependency versions are exact and locked. Do not commit node_modules, local progress or preview screenshots. The 28 original page photographs are approved for the repository and kept in `source-pages`; the discarded tutor portrait remains excluded.

Record meaningful changes in CHANGELOG.md. Record motives, teaching decisions and observed difficulties in docs/DECISIONS.md. Update the PR description to reflect the final implementation. Do not claim remote CI passed until its checks report success.

## GitHub Pages

The Actions workflow validates both feature branches and PRs; only main can deploy, after the validation job succeeds. Pages uses GitHub Actions as its source. The site is live at https://aburomoh.github.io/Laith_Lessons/.

`build:pages` creates a fresh ignored `pages-dist` directory containing only runtime files, the approved tutor pictures and the three concept illustrations, all as web-sized WebP files (under 1 MB in total). It intentionally refuses an existing output directory to avoid stale files. Remove that generated directory before rebuilding, after checking its path. Original worksheet photos, source files and repository metadata are excluded from the site artifact. A relative root redirect opens app/index.html, preserving offline asset paths and GitHub project subpaths.

`test:mobile` serves the packaged site temporarily on loopback under /Laith_Lessons/. It checks all 152 questions and concepts in iPhone SE and iPad WebKit emulation, plus representative iPhone landscape and Android views. Checks include horizontal clipping, touch targets, dialog interaction and asset loading. Screenshots are included in CI artifacts. Emulation does not replace testing on physical Apple devices. Long phone content scrolls vertically.

Workflow setup follows [GitHub’s custom Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
