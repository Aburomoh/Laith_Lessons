import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
import { runInNewContext } from 'node:vm';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const {webkit,chromium,devices}=await import(process.env.PLAYWRIGHT_PATH?pathToFileURL(process.env.PLAYWRIGHT_PATH).href:'playwright');
const questions=runInNewContext(stripTypeScriptTypes(readFileSync(new URL('questions.ts',import.meta.url),'utf8'))+'\nquestions');
const root=new URL('../pages-dist/',import.meta.url);
// Exercise the actual deployment package under a GitHub project subdirectory.
const server=createServer(async(req,res)=>{try{const path=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(!path.startsWith('/Laith_Lessons/'))throw Error();const file=path.slice('/Laith_Lessons/'.length)||'index.html';if(file.includes('..'))throw Error();const data=await readFile(new URL(file,root));const ext=file.split('.').at(-1);res.writeHead(200,{'Content-Type':({html:'text/html',js:'text/javascript',css:'text/css',png:'image/png',webp:'image/webp'})[ext]||'text/plain'});res.end(data)}catch{res.writeHead(404).end()}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const url=`http://127.0.0.1:${server.address().port}/Laith_Lessons/`;
try {
  for(const [name,engine,device,all] of [
    ['iphone-se',webkit,'iPhone SE',true],['ipad',webkit,'iPad (gen 7)',true],
    ['iphone-landscape',webkit,'iPhone 13 landscape',false],['android',chromium,'Pixel 5',false]
  ]) {
    const browser=await engine.launch({headless:true});
    try {
      const page=await browser.newPage({...devices[device],reducedMotion:'reduce'});
      const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
      await page.goto(url);await page.waitForURL('**/app/index.html');await page.locator('#tutor').evaluate(img=>img.decode());
      const bank=all?questions:questions.filter((q,i)=>i===questions.findIndex(other=>other.topic===q.topic));
      await page.evaluate(ids=>{const state=JSON.parse(localStorage.getItem('laith-english-studio-v1'));state.ids=ids;state.index=0;localStorage.setItem('laith-english-studio-v1',JSON.stringify(state))},bank.map(q=>q.id));await page.reload();
      for(let i=0;i<bank.length;i++){
        await page.locator('#concept-info').tap();
        if(await page.locator('#concept-picture').isVisible())await page.locator('#concept-picture').evaluate(img=>img.decode());
        assert(await page.locator('#concept-dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1),`${name}: concept clipping ${bank[i].id}`);
        if(i===0)await page.screenshot({path:`preview-${name}-concept.png`,fullPage:true});
        await page.locator('#concept-dialog [data-close]').tap();await page.locator('#reveal').tap();
        assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${name}: page clipping ${bank[i].id}`);
        for(const selector of ['#tools','#concept-info','.controls button'])for(const button of await page.locator(selector).all())assert(await button.evaluate(el=>el.getBoundingClientRect().height>=44),`${name}: touch target ${selector}`);
        if(i===0)await page.screenshot({path:`preview-${name}.png`,fullPage:true});
        if(i<bank.length-1)await page.locator('#next').tap();
      }
      await page.locator('#tools').tap();await page.locator('#topics').tap();assert(await page.locator('#topic-dialog').evaluate(el=>el.scrollWidth<=el.clientWidth+1));await page.locator('#topic-dialog [data-close]').tap();await page.locator('#tools').tap();await page.locator('#round-size').selectOption('5');await page.locator('#mixed').tap();
      await page.locator('#tools').tap();await page.locator('#size').tap();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      await page.locator('#tools').tap();await page.locator('#recap').tap();await page.locator('#recap-dialog [data-close]').tap();
      assert.deepEqual(errors,[],`${name}: scripts and deployed assets`);
      console.log(`${name}: ${bank.length} questions and concepts, touch controls, dialogs and project-relative assets passed.`);
    } finally {await browser.close()}
  }
} finally {await new Promise(resolve=>server.close(resolve))}
