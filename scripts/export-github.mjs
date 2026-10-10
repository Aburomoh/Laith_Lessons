import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root=fileURLToPath(new URL('../',import.meta.url));
const target=resolve(root,'github-ready');
if(existsSync(target))throw new Error('github-ready already exists. Rename that folder before exporting again.');
// Include current edits and new project files, respecting the repository ignores.
const paths=execFileSync('git',['ls-files','--cached','--others','--exclude-standard','-z'],{cwd:root,encoding:'utf8'}).split('\0').filter(Boolean);
const allowed=paths.filter(path=>[
  '.gitignore','README.md','CHANGELOG.md','Open English Studio.cmd'
].includes(path)||/^WhatsApp Image 2026-10-10 at [\w ().-]+\.jpeg$/.test(path)||/^(?:\.github|docs|scripts|learning-tool)\//.test(path)||/^tutor poses\/tutor_[\w-]+\.png$/.test(path));
for(const path of allowed){
  if(/(?:^|\/)(?:node_modules|\.git|pages-dist|github-ready)(?:\/|$)|(?:^|\/)preview-.*\.png$|STUDY_MAP\.md$/i.test(path))throw new Error(`Unexpected export path: ${path}`);
  const destination=resolve(target,path);
  mkdirSync(dirname(destination),{recursive:true});
  copyFileSync(resolve(root,path),destination);
}
console.log(`Copied ${allowed.length} project files to ${target}`);
console.log('This folder has no Git history, dependencies or generated previews. Nothing was uploaded.');
