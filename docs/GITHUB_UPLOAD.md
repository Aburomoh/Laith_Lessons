# Put this project on GitHub yourself

Repository: https://github.com/Aburomoh/Laith_Lessons

Website after successful deployment: https://aburomoh.github.io/Laith_Lessons/

## Files to use

The `github-ready` folder is a clean copy of the current project, without Git history. Keep its contents together:

```text
.github/           CI, Pages deployment and PR template
docs/              Teaching decisions, development and this guide
learning-tool/     App, TypeScript source, CSS, artwork and tests
scripts/           Local export helper
tutor poses/       All 18 approved tutor portraits
.gitignore         Excludes local-only and generated files
README.md          Project introduction and website link
CHANGELOG.md       Change record
Open English Studio.cmd
WhatsApp Image*.jpeg  All 28 original page photographs
```

All 28 original page photographs are included with the owner’s approval. The original working folder also contains STUDY_MAP.md, node_modules, screenshots and pages-dist; these remain excluded from the clean copy. The copy includes the adapted lesson questions and tutor artwork used by the app. Do not upload the surrounding original folder by drag-and-drop.

## Recommended: retain the existing commits and open a PR

Use a terminal in the **original project folder**, not github-ready. The implementation is already committed on `feature/concept-animations`; the latest export documentation may still appear as local changes. Review and commit those first:

```powershell
git status
git add .
git diff --cached --stat
git commit -m "Include approved page photos and GitHub handoff files"
git push origin main
git push -u origin feature/concept-animations
```

Skip the commit command if Git reports no changes. The main push provides the baseline required by the initially empty repository. Then open a pull request from `feature/concept-animations` into `main`, using docs/PR_CONCEPT_ANIMATIONS.md for its description. Review the changes and wait for the checks to pass before merging.

## Alternative: start from the clean copy

Use this only if you want one new initial commit instead of the existing development history, and the remote repository is still empty. In a terminal inside **github-ready**:

```powershell
git init -b main
git add .
git commit -m "Add English learning platform"
git remote add origin https://github.com/Aburomoh/Laith_Lessons.git
git push -u origin main
```

Choose one route. Do not combine unrelated histories or force-push if the destination already contains work. GitHub Desktop can also add the original repository, or create a repository in the clean folder; include the hidden .github and .gitignore files.

## Enable the website

In the repository's **Settings → Pages**, select **GitHub Actions** as the build source before deploying main. The included workflow checks TypeScript, content, desktop and mobile layouts before deploying. If needed after enabling Pages, manually run **Lesson checks and Pages** from Actions on main. Open the website only after that deployment succeeds.

Add https://aburomoh.github.io/Laith_Lessons/ to the repository's **About → Website** field. The README already contains this link, marked pending; remove that pending wording after verifying the live site. The website retains one question at a time and supports phone/tablet touch layouts. Progress stays in each browser/device.

## Refresh the clean copy

From the original repository, rename any previous github-ready folder, then run:

```powershell
node scripts/export-github.mjs
```

This copies the current working files, including uncommitted project changes; it does not commit, push or publish anything. The helper requires a Git repository and refuses to overwrite an existing export.
