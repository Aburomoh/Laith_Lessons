import { readFileSync, existsSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
const data=runInNewContext(['questions.ts','concepts.ts'].map(name=>stripTypeScriptTypes(readFileSync(new URL(name,import.meta.url),'utf8'))).join('\n')+'\n({questions,topics,sources,conceptFor,illustrations,illustrationFor})');
const {questions,topics,sources}=data;
const appSource=stripTypeScriptTypes(readFileSync(new URL('app.ts',import.meta.url),'utf8'));
const poseDeclaration=appSource.match(/const poses[^=]*=([^;]+);/s)[0];
const availablePoses=runInNewContext(poseDeclaration+'\nposes');
for(const [name] of availablePoses)assert(existsSync(new URL(`../tutor poses/tutor_${name}.png`,import.meta.url)),`Missing pose ${name}`);
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length,'Unique question IDs');
assert.equal(Object.keys(sources).length,13,'All 13 selected source photos mapped');
for(const [source,photo] of Object.values(sources)){assert(questions.some(q=>q.source===source),`Missing training: ${source}`);assert(questions.some(q=>q.photo===`WhatsApp Image 2026-10-10 at ${photo}.jpeg`));}
for(const q of questions){assert(topics.some(t=>t.id===q.topic));for(const key of ['prompt','answer','explanation','hint','source','photo'])assert(q[key]?.length,`${q.id}: ${key}`);if(q.choices){assert(q.choices.length>=2&&q.choices.length<=4);assert.equal(new Set(q.choices).size,q.choices.length);assert(q.choices.includes(q.answer),`${q.id}: answer missing`)}}
for(const q of questions){const c=data.conceptFor(q);assert(c.title&&c.caption,`Concept text: ${q.id}`);assert(c.before.length&&c.after.length);assert([...c.before,...c.after].every(t=>typeof t==='string'&&t.length));assert(c.focus.every(i=>i>=0&&i<c.after.length));}
for(const q of questions.filter(q=>q.topic==='be'&&/negative:/i.test(q.prompt))){const c=data.conceptFor(q);assert.equal(c.after[2],'not','Not must follow the be verb');assert(['am','is','are'].includes(c.after[1]));assert.equal(c.movement,'fall');}
const inverted=data.conceptFor(questions.find(q=>q.prompt==='Make a question: He is at home.'));assert.equal(inverted.after.join(' '),'Is he at home?');
for(const art of Object.values(data.illustrations))assert(existsSync(new URL(art.src,import.meta.url)),`Missing illustration: ${art.src}`);
for(const q of questions){const key=data.illustrationFor(q);if(key)assert(data.illustrations[key]);}
assert.equal(data.conceptFor(questions.find(q=>q.prompt.includes('guitar picture'))).after.at(-1),'Spain');
assert.equal(data.conceptFor(questions.find(q=>q.prompt==='Read these sentences aloud.')).title,'Read with pauses');
console.log(`Content checks passed: ${questions.length} questions, ${topics.length} topics, 13 source photos.`);
if(!process.argv.includes('--browser'))process.exit(0);
const {chromium}=await import(process.env.PLAYWRIGHT_PATH?pathToFileURL(process.env.PLAYWRIGHT_PATH).href:'playwright');
const browser=await chromium.launch({headless:true});
const page=await browser.newPage({viewport:{width:1280,height:720}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const openTools=async()=>page.locator('#tools').click();
const openTopics=async()=>{await openTools();await page.locator('#topics').click()};
await page.goto(new URL('index.html',import.meta.url).href);
await page.evaluate(()=>localStorage.clear());await page.reload();
await page.locator('#tutor').evaluate(img=>img.decode());
const initialProgress=await page.evaluate(()=>localStorage.getItem('laith-english-studio-v1'));
await page.locator('#concept-info').click();assert(await page.locator('#concept-dialog').isVisible());await page.locator('#concept-picture').evaluate(img=>img.decode());await page.screenshot({path:resolve('preview-family.png'),fullPage:true});await page.locator('#concept-replay').click();await page.keyboard.press('Escape');
assert.equal(await page.evaluate(()=>localStorage.getItem('laith-english-studio-v1')),initialProgress,'Concepts do not affect progress');
assert(await page.locator('#concept-info').evaluate(el=>el===document.activeElement),'Dialog returns focus to the info button');
await page.locator('#choices button').nth(1).click();assert.match(await page.locator('#feedback').innerText(),/Try again/);
await openTopics();assert.equal(await page.locator('#retry-count').innerText(),'1');await page.locator('#topic-dialog [data-close]').click();
await page.locator('#choices button').nth(0).click();assert.match(await page.locator('#feedback').innerText(),/Correct!/);
await openTopics();assert.equal(await page.locator('#retry-count').innerText(),'0');await page.locator('#topic-dialog [data-close]').click();
await page.locator('#next').click();await page.locator('#reveal').click();await page.reload();await openTools();assert.equal(await page.locator('#position').innerText(),'2 / 19');await page.locator('#tools-dialog [data-close]').click();assert(await page.locator('#feedback').isHidden(),'Reload hides the answer');
await openTopics();await page.locator('#revisit').click();await openTools();assert.equal(await page.locator('#position').innerText(),'1 / 1');await page.locator('#tools-dialog [data-close]').click();
await page.locator('#reveal').click();await page.locator('#next').click();assert(await page.locator('#topic-dialog').isVisible());
await page.locator('#topic-grid button').filter({hasText:'Tell me about your country'}).click();await openTools();await page.locator('#oral-retry').click();await openTools();await page.locator('#oral-correct').click();await page.locator('#reveal').click();assert.match(await page.locator('#feedback').innerText(),/Example: I live in Jordan/);
await openTools();await page.locator('#poses').click();await page.locator('#pose-grid button').filter({hasText:'Frustrated'}).click();assert.match(await page.locator('#tutor').getAttribute('data-message'),/break it down/);
await openTopics();await page.locator('#mixed').click();
assert.equal(await page.locator('.controls button:visible').count(),3,'Only three main controls');
assert(await page.locator('#source').isHidden());assert(await page.locator('#topic-name').isHidden());
let checked=0;const overflow=[];
for(let i=0;i<questions.length;i++){
  // Every optional concept, including illustrations, must fit the lesson viewport.
  await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#concept-info').click();
  if(await page.locator('#concept-picture').isVisible())await page.locator('#concept-picture').evaluate(img=>img.decode());
  const conceptFits=await page.locator('#concept-dialog').evaluate(el=>el.scrollHeight<=el.clientHeight+1&&el.scrollWidth<=el.clientWidth+1);
  assert(conceptFits,`Concept overflow: ${await page.locator('#question').textContent()}`);await page.keyboard.press('Escape');
  await page.locator('#reveal').click();
  const bounds=await page.evaluate(()=>({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,screenWidth:innerWidth,screenHeight:innerHeight,prompt:document.querySelector('#question').textContent}));
  if(bounds.width>bounds.screenWidth+1||bounds.height>bounds.screenHeight+1)overflow.push(bounds);
  checked++;
  if(i<questions.length-1)await page.locator('#next').click();
}
await page.emulateMedia({reducedMotion:'no-preference'});
console.log(`Screen-share layout checks: ${checked} revealed questions at 1280×720; ${overflow.length} require vertical scrolling.`);
if(overflow.length)console.log(JSON.stringify(overflow.slice(0,12),null,2));
assert.equal(overflow.filter(b=>b.width>b.screenWidth+1).length,0,'No horizontal clipping');
assert.equal(overflow.length,0,'Default teaching screens fit at 1280×720, including revealed answers');
await openTopics();await page.locator('#topic-grid button').filter({hasText:'Am, is & are'}).click();
await page.screenshot({path:new URL('preview-grammar.png',import.meta.url).pathname.replace(/^\/([A-Za-z]:)/,'$1'),fullPage:true});
await page.locator('#choices button').nth(1).click();await page.screenshot({path:resolve('preview-feedback.png'),fullPage:true});
// Negation example: pause then animate NOT after IS. Test replay, Escape, and reduced motion.
for(let i=0;i<7;i++)await page.locator('#next').click();
await page.locator('#concept-info').click();await page.waitForFunction(()=>document.querySelector('#concept-words').textContent.includes('not'));
assert.equal(await page.locator('#concept-words').innerText(),'He\nis\nnot\nat\nhome.');
await page.locator('#concept-words').evaluate(async el=>{await Promise.all(Array.from(el.children).flatMap(child=>child.getAnimations().map(a=>a.finished)))});
await page.screenshot({path:resolve('preview-concept.png'),fullPage:true});
await page.locator('#concept-replay').click();assert.equal(await page.locator('#concept-words').innerText(),'He\nis\nat\nhome.');await page.keyboard.press('Escape');
await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#concept-info').click();assert.equal(await page.locator('#concept-words').innerText(),'He\nis\nnot\nat\nhome.');assert.equal(await page.locator('#concept-words').evaluate(el=>el.getAnimations({subtree:true}).length),0);await page.keyboard.press('Escape');await page.emulateMedia({reducedMotion:'no-preference'});
await openTopics();await page.locator('#topic-grid button').filter({hasText:'Long A sounds'}).click();await page.emulateMedia({reducedMotion:'reduce'});await page.locator('#concept-info').click();
assert.equal(await page.locator('#concept-words').textContent(),'cake','Phonics preserves a connected word');
assert.equal(await page.locator('.phonics .concept-focus').count(),2,'Only a and e are emphasised');
assert.equal(await page.locator('.phonics-bridge').count(),3,'Underline bridges a, consonant and e');
assert(await page.locator('.phonics .concept-focus').first().evaluate(el=>getComputedStyle(el).fontWeight==='700'));
await page.screenshot({path:resolve('preview-phonics.png'),fullPage:true});await page.keyboard.press('Escape');await page.locator('#next').click();await page.locator('#concept-info').click();
assert.equal(await page.locator('#concept-words').textContent(),'rain');assert.equal(await page.locator('.phonics .concept-focus').count(),1);assert.equal(await page.locator('.phonics .concept-focus').textContent(),'ai');assert.equal(await page.locator('.phonics-bridge').count(),0);await page.keyboard.press('Escape');await page.emulateMedia({reducedMotion:'no-preference'});
await page.setViewportSize({width:1440,height:900});await openTopics();await page.locator('#topic-grid button').filter({hasText:'The giraffe family'}).click();await page.locator('#reveal').click();await page.screenshot({path:resolve('preview-reading.png'),fullPage:true});
await openTools();await page.locator('#full-passage').click();assert.match(await page.locator('#passage-body').innerText(),/Fennessy/);await page.locator('#passage-dialog [data-close]').click();
await openTools();await page.locator('#source-photo').click();if(existsSync(new URL('../'+questions.find(q=>q.topic==='reading').photo,import.meta.url))){await page.locator('#photo').evaluate(img=>img.decode())}else{await page.locator('#photo').waitFor({state:'hidden'});assert.match(await page.locator('#photo-note').innerText(),/not included/)}await page.locator('#photo-dialog [data-close]').click();
await page.setViewportSize({width:1024,height:768});await openTools();await page.locator('#size').click();assert(await page.locator('body').evaluate(el=>el.classList.contains('large')));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
await openTopics();await page.locator('#reset').click();await page.locator('#confirm-reset').click();await openTools();assert.equal(await page.locator('#position').innerText(),'1 / 19');await page.locator('#tools-dialog [data-close]').click();
assert.deepEqual(errors,[],'No browser script errors');
// Verify the delivered file also works without a server.
const offline=await browser.newPage();await offline.goto(new URL('index.html',import.meta.url).href);assert(await offline.locator('#question').innerText());await offline.locator('#reveal').click();assert(await offline.locator('.choice.correct').isVisible());await offline.locator('#tutor').evaluate(img=>img.decode());
await browser.close();console.log('Browser checks passed: feedback, retry queue, saved position, oral marking, poses, stories, sources, reset and offline launch.');
