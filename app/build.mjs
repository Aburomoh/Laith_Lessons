import { stripTypeScriptTypes } from 'node:module';
import { readFileSync, writeFileSync } from 'node:fs';
const source = ['questions.ts', 'concepts.ts', 'progress.ts', 'app.ts', 'concept-ui.ts', 'pen.ts'].map(file => readFileSync(new URL(file, import.meta.url), 'utf8')).join('\n');
writeFileSync(new URL('app.js', import.meta.url), stripTypeScriptTypes(source, { mode: 'strip' }).replace(/[ \t]+$/gm, ''));
console.log('Built app.js from TypeScript. Open index.html to teach offline.');
