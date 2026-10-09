# Development and review

Use a feature branch for changes. Keep `main` as the reviewed baseline. Open a PR with the learner-facing outcome, teaching decisions, validation evidence and remaining limitations. Wait for CI and human review before merging; do not auto-merge.

The repository began empty. The existing tested minimal teaching tool is the bootstrap baseline; subsequent work belongs in feature PRs. A bootstrap PR requires a baseline commit on the default branch before GitHub can compare branches.

From `learning-tool`, use Node 24 and run:

```sh
npm ci
npm run check
npx playwright install chromium
npm run test:browser
```

`check` performs strict TypeScript checking, regenerates `app.js`, and validates content and source mappings. Browser tests use local files: no preview server, external worksheet images or hosted services are required. CI installs Chromium and its system dependencies and uploads screenshots as review artifacts. It also rejects a stale generated `app.js`.

Runtime remains dependency-free; TypeScript and Playwright are development dependencies. Dependency versions are exact and locked. Do not commit node_modules, private worksheet photographs, local progress or preview screenshots.

Record meaningful changes in CHANGELOG.md. Record motives, teaching decisions and observed difficulties in docs/DECISIONS.md. Update the PR description to reflect the final implementation. Do not claim remote CI passed until its checks report success.
