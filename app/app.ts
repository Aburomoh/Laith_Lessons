type Saved = {results: Record<string,'correct'|'retry'|'revealed'>; recall:Record<string,RecallRecord>; lesson:Record<string,LessonRecord>; tally:{right:number;wrong:number}; large:boolean; mode:string; ids:string[]; index:number};
const $ = <T extends HTMLElement=HTMLElement>(id:string) => document.getElementById(id) as T;
const storageKey='laith-english-studio-v1';
const byId = new Map(questions.map(q=>[q.id,q]));
let saved: Saved = {results:{},recall:{},lesson:{},tally:{right:0,wrong:0},large:false,mode:'words',ids:[],index:0};
let storageAvailable=true;
try { const raw=JSON.parse(localStorage.getItem(storageKey)||'null'); if(raw && typeof raw==='object'){saved.results=Object.fromEntries(Object.entries(raw.results||{}).filter(([id,v])=>byId.has(id)&&['correct','retry','revealed'].includes(String(v)))) as Saved['results']; saved.large=raw.large===true; if([raw.tally?.right,raw.tally?.wrong].every(n=>Number.isInteger(n)&&n>=0))saved.tally={right:raw.tally.right,wrong:raw.tally.wrong}; if(Array.isArray(raw.ids)&&raw.ids.length&&raw.ids.every((id:unknown)=>typeof id==='string'&&byId.has(id))){saved.ids=raw.ids;saved.mode=typeof raw.mode==='string'?raw.mode:'words';saved.index=Math.max(0,Math.min(saved.ids.length-1,Number.isInteger(raw.index)?raw.index:0));}}} catch {storageAvailable=false}
// Validate the additional progress fields; migrate old outcomes conservatively.
try {
  const raw=JSON.parse(localStorage.getItem(storageKey)||'null');
  for(const id of byId.keys()) {
    const r=raw?.recall?.[id];
    if(r&&typeof r.pending==='boolean'&&typeof r.supported==='boolean'&&Number.isFinite(r.last)&&r.last>=0&&Number.isFinite(r.remembered)&&['supported','unaided','remembered','practice'].includes(r.outcome)) saved.recall[id]=r;
    else if(saved.results[id]&&saved.results[id]!=='correct') saved.recall[id]={pending:true,last:Date.now(),supported:true,outcome:'practice',remembered:0};
    const l=raw?.lesson?.[id];
    if(l&&['correct','supported','missed','revealed','remembered'].every(k=>typeof l[k]==='boolean'))saved.lesson[id]=l;
  }
} catch {storageAvailable=false}
function track(event:PracticeEvent){const id=current().id;const r=recordPractice(saved.recall[id],event,Date.now());saved.recall[id]=r;saved.lesson[id]=recordLesson(saved.lesson[id],event,r);persist()}
let queue: Question[]=saved.ids.length?saved.ids.map(id=>byId.get(id)!):questions.filter(q=>q.topic==='words');
let index=saved.index;
let revealed=false, selected:string|undefined, attempt=0, feedbackVisible=false;
const poses: [string,string][] = [['x_arms-softened','Wrong answer · gentle'],['x_arms','Wrong answer · firm'],['skeptical','Skeptical'],['confused','Confused'],['unsure','Unsure'],['concerned','Concerned'],['disappointed','Disappointed'],['frustrated','Frustrated'],['empathetic','Empathetic'],['reassuring','Reassuring'],['serious','Serious'],['caution','Caution'],['shock','Surprised'],['aha','Aha!'],['proud','Proud'],['excited','Excited'],['amused','Amused']];
document.body.classList.toggle('large',saved.large);
function persist(){saved.ids=queue.map(q=>q.id);saved.index=index;try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{storageAvailable=false}}
const poseSrc=(name:string)=>`assets/tutor/${name}.webp`;
// Load and decode every pose up front and keep them referenced, so a reaction swaps instantly instead of waiting for the network.
const poseCache=new Map(poses.map(([name])=>{const img=new Image();img.src=poseSrc(name);img.decode().catch(()=>{});return [name,img] as const}));
function pose(name:string,message:string){const img=$<HTMLImageElement>('tutor');img.src=poseCache.get(name)?.src||poseSrc(name);img.alt=`Tutor: ${poses.find(p=>p[0]===name)?.[1]||name}`;img.dataset.message=message;}
function current(){return queue[index]}
function showFeedback(text:string,tone='info'){feedbackVisible=true;$('feedback').hidden=false;$('feedback').textContent=text;$('feedback').dataset.tone=tone;}
function render(){
  const q=current();revealed=false;selected=undefined;attempt=0;feedbackVisible=false;
  $('topic-name').textContent=saved.mode==='mixed'?'Mixed practice':saved.mode==='revisit'?'Practise again':topics.find(t=>t.id===q.topic)!.title;
  $('position').textContent=`${index+1} / ${queue.length}`;
  $('origin').textContent=q.extra?'Extra practice':'Worksheet practice';$('question').textContent=q.prompt;$('explanation').textContent=q.explanation;$<HTMLDetailsElement>('explanation-panel').open=false;
  $('reading-area').hidden=!q.excerpt;$('excerpt').textContent=q.excerpt||'';$('full-passage').hidden=!q.story;
  $('choices').replaceChildren();$('choices').dataset.count=String(q.choices?.length||0);document.body.classList.toggle('reading-question',!!q.excerpt);$('spoken').hidden=!!q.choices;
  q.choices?.forEach((answer,i)=>{const btn=document.createElement('button');btn.className='choice';const n=document.createElement('span');n.className='number';n.textContent=String(i+1);n.setAttribute('aria-hidden','true');const label=document.createElement('span');label.textContent=answer;btn.append(n,label);btn.addEventListener('click',()=>choose(answer));$('choices').append(btn)});
  $('feedback').hidden=true;$('feedback').textContent='';$<HTMLButtonElement>('hint').disabled=false;$<HTMLButtonElement>('reveal').disabled=false;
  $<HTMLButtonElement>('oral-correct').disabled=false;$<HTMLButtonElement>('oral-retry').disabled=false;
  $<HTMLButtonElement>('previous').disabled=index===0;$('next').textContent=index===queue.length-1?'✓':'→';$('next').classList.remove('ready');
  $('source').textContent=q.source;$('session-note').hidden=storageAvailable;
  pose(q.pose||(['amused','reassuring','serious','unsure'][index%4]),q.pose==='shock'?'That’s a surprising detail!':q.pose==='unsure'?'Let’s check this together.':'Take your time. Think it through.');
  persist();
}
function paintChoices(){Array.from($('choices').children).forEach((el,i)=>{const answer=current().choices![i];el.classList.toggle('selected',answer===selected);el.classList.toggle('correct',(revealed||selected===current().answer)&&answer===current().answer);el.classList.toggle('wrong',answer===selected&&answer!==current().answer);(el as HTMLButtonElement).disabled=revealed||selected===current().answer;});}
function choose(answer:string){if(revealed||selected===current().answer)return;selected=answer;attempt++;const correct=answer===current().answer;tally(correct);track(correct?'correct':'retry');if(correct){saved.results[current().id]='correct';$<HTMLButtonElement>('reveal').disabled=true;$('next').classList.add('ready');pose(attempt>1?'aha':index%3===0?'excited':'proud','Well done!');showFeedback('Correct!','correct')}else{saved.results[current().id]='retry';pose(attempt===1||attempt===2&&index%2===0?'x_arms-softened':attempt===2?'concerned':'reassuring','Let’s try again.');showFeedback('Try again.','retry')}paintChoices();persist();}
function reveal(){if(revealed)return;revealed=true;if(selected!==current().answer)track('revealed');if(saved.results[current().id]!=='correct')saved.results[current().id]='revealed';if(current().choices){$('feedback').hidden=true}else showFeedback(current().answer);pose('aha','Here’s how it works.');paintChoices();$<HTMLButtonElement>('reveal').disabled=true;$<HTMLButtonElement>('hint').disabled=true;persist();}
// Every marked attempt counts, including second tries; hints and reveals do not.
function tally(correct:boolean){if(correct)saved.tally.right++;else saved.tally.wrong++}
function openTools(){$('score-right').textContent=String(saved.tally.right);$('score-wrong').textContent=String(saved.tally.wrong);$('tools-reset-confirm').hidden=true;$<HTMLDialogElement>('tools-dialog').showModal()}
function resetProgress(){saved.results={};saved.recall={};saved.lesson={};saved.tally={right:0,wrong:0};start('words')}
function closeTools(){$<HTMLDialogElement>('tools-dialog').close()}
function hint(){track('hint');closeTools();showFeedback(current().hint);pose('caution','Look at this clue.');}
function oralMark(correct:boolean){tally(correct);track(correct?'correct':'retry');closeTools();if(correct){saved.results[current().id]='correct';$('next').classList.add('ready');pose('proud','Good thinking!');showFeedback('Correct!','correct');}else{saved.results[current().id]='retry';attempt++;pose(attempt===1?(index%2===0?'x_arms-softened':'empathetic'):'reassuring','Let’s try it one step at a time.');showFeedback('Try again.','retry')}persist();}
function start(mode:string){let next:Question[];if(mode==='mixed'){next=[...questions];for(let i=next.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[next[i],next[j]]=[next[j],next[i]]}next=next.slice(0,Number($<HTMLSelectElement>('round-size').value))}else if(mode==='revisit'){next=questions.filter(q=>saved.recall[q.id]?.pending);}else next=questions.filter(q=>q.topic===mode);if(!next.length)return;queue=next;index=0;saved.mode=mode;$<HTMLDialogElement>('topic-dialog').close();render();}
function updateTopics(){
  $('topic-grid').replaceChildren();for(const topic of topics){const all=questions.filter(q=>q.topic===topic.id);const correct=all.filter(q=>saved.results[q.id]==='correct').length;const btn=document.createElement('button');btn.className='topic-card';const icon=document.createElement('span');icon.className='topic-icon';icon.textContent=topic.icon;const text=document.createElement('span');const title=document.createElement('strong');title.textContent=topic.title;const detail=document.createElement('small');detail.textContent=`${all.length} questions · ${correct} answered correctly`;const sub=document.createElement('small');sub.textContent=topic.subtitle;text.append(title,sub,detail);btn.append(icon,text);btn.onclick=()=>start(topic.id);$('topic-grid').append(btn)}
  const count=questions.filter(q=>saved.recall[q.id]?.pending).length;$('retry-count').textContent=String(count);$('review-note').textContent=`${questions.filter(q=>saved.recall[q.id]?.pending&&Date.now()-saved.recall[q.id].last>=reviewDelay).length} ready for delayed recall · ${count} waiting for a successful later review. Practising now is fine; allow 24 hours without practice before checking recall.`;$<HTMLButtonElement>('revisit').disabled=!count;
}
function openTopics(){closeTools();updateTopics();$<HTMLDialogElement>('topic-dialog').showModal();}
function openRecap(){closeTools();const entries=Object.entries(saved.lesson);const count=(key:keyof LessonRecord)=>entries.filter(([,r])=>r[key]).length;
  $('recap-summary').textContent=`This lesson: ${count('correct')} answered correctly · ${entries.filter(([,r])=>r.correct&&!r.supported).length} without recorded help · ${entries.filter(([,r])=>r.correct&&r.supported).length} with support · ${count('remembered')} remembered later.`;
  $('recap-events').textContent=`${count('missed')} had an incorrect attempt · ${count('revealed')} had an answer revealed. These counts can overlap.`;
  $('recap-items').replaceChildren();for(const [id,r] of entries.filter(([,r])=>r.missed||r.revealed||r.supported)){const li=document.createElement('li');li.textContent=byId.get(id)!.prompt+ (saved.recall[id]?.pending?' — revisit later':' — remembered later');$('recap-items').append(li)}
  $<HTMLDialogElement>('recap-dialog').showModal();}
function next(){if(index<queue.length-1){index++;render()}else{openRecap();}}
$('topics').onclick=openTopics;$('tools').onclick=openTools;$('previous').onclick=()=>{if(index>0){index--;render()}};$('next').onclick=next;$('hint').onclick=hint;$('reveal').onclick=reveal;
$('oral-correct').onclick=()=>oralMark(true);$('oral-retry').onclick=()=>oralMark(false);
$('recap').onclick=openRecap;$('recap-topics').onclick=()=>{$<HTMLDialogElement>('recap-dialog').close();openTopics()};$('new-lesson').onclick=()=>{saved.lesson={};persist();$<HTMLDialogElement>('recap-dialog').close();openTopics()};
$('mixed').onclick=()=>{closeTools();start('mixed')};$('revisit').onclick=()=>start('revisit');
$('size').onclick=()=>{saved.large=!saved.large;document.body.classList.toggle('large',saved.large);$('size').textContent=saved.large?'Normal text':'Larger text';closeTools();persist()};$('size').textContent=saved.large?'Normal text':'Larger text';
$('fullscreen').onclick=async()=>{closeTools();try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{showFeedback('Use your browser’s full-screen shortcut (usually F11).')}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
$('explanation-panel').addEventListener('toggle',()=>{if($<HTMLDetailsElement>('explanation-panel').open)track('concept')});
$('full-passage').onclick=()=>{const story=current().story;if(story){closeTools();$('passage-title').textContent=stories[story].title;$('passage-body').textContent=stories[story].text;$<HTMLDialogElement>('passage-dialog').showModal()}};
$('source-photo').onclick=()=>{closeTools();const img=$<HTMLImageElement>('photo');$('photo-note').textContent='Printed source for reference. Handwritten answers may contain mistakes.';img.hidden=false;img.onerror=()=>{img.hidden=true;$('photo-note').textContent='This photo is unavailable here. Original page photos are in the repository download, but not included in the lightweight website package.'};img.src=`../${current().photo}`;$<HTMLDialogElement>('photo-dialog').showModal()};
document.querySelectorAll<HTMLButtonElement>('[data-close]').forEach(btn=>btn.onclick=()=>btn.closest('dialog')!.close());
$('tools-reset').onclick=()=>{$('tools-reset-confirm').hidden=false;$('tools-reset-confirm').scrollIntoView({block:'nearest'})};$('tools-cancel-reset').onclick=()=>{$('tools-reset-confirm').hidden=true};$('tools-confirm-reset').onclick=()=>{resetProgress();closeTools()};
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]'))return;const target=e.target as HTMLElement;if(['INPUT','TEXTAREA','SELECT'].includes(target.tagName)||e.ctrlKey||e.altKey||e.metaKey)return;if(e.key.toLowerCase()==='t'){e.preventDefault();openTools()}else if(e.key==='ArrowRight'){e.preventDefault();next()}else if(e.key==='ArrowLeft'&&index>0){e.preventDefault();index--;render()}else if(e.key.toLowerCase()==='h'){e.preventDefault();hint()}else if(e.key===' '&&target.tagName!=='BUTTON'&&target.tagName!=='A'){e.preventDefault();reveal()}else if(/^[1-4]$/.test(e.key)){const answer=current().choices?.[Number(e.key)-1];if(answer){e.preventDefault();choose(answer)}}});
// Warm the frequently used feedback images so screen-share feedback appears promptly.
render();
