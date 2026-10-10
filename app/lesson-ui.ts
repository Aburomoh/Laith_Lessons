// Interactive lesson player. It is a full-screen layer under the pen, so the tutor can draw on any step.
// Tiles keep their id between steps: a word that moves glides from its old place, a changed word fades into its new form.
const lessonLayer = $('lesson'); const lessonStage = $('lesson-stage'); const lessonOptions = $('lesson-options'); const lessonCaption = $('lesson-caption');
let activeLesson: Lesson|undefined; let lessonStep = 0; let lessonTimer: ReturnType<typeof setTimeout>|undefined;
type LessonView = {kind:'step'; step:LessonStep}|{kind:'practice'; practice:LessonPractice}|{kind:'summary'};
const lessonMotion = ()=>!matchMedia('(prefers-reduced-motion: reduce)').matches;
const lessonViews = (l:Lesson):LessonView[]=>[...l.steps.map(step=>({kind:'step',step}) as LessonView),...(l.practice?[{kind:'practice',practice:l.practice} as LessonView]:[]),{kind:'summary'}];

function tileElement(t:LessonTile):HTMLElement {
  const el = document.createElement('span'); el.dataset.id = t.id; el.textContent = t.text;
  el.className = ['lesson-tile', t.role&&`role-${t.role}`, t.gap&&'gap', t.br&&'br', t.join&&'join', /^[.?!,:]$/.test(t.text)&&'punct'].filter(Boolean).join(' ');
  return el;
}
function placeTiles(tiles:LessonTile[], from = new Map<string,DOMRect>()) {
  const old = new Map<string,{rect:DOMRect; text:string}>();
  lessonStage.querySelectorAll<HTMLElement>('[data-id]').forEach(el=>old.set(el.dataset.id!,{rect:el.getBoundingClientRect(),text:el.textContent!}));
  from.forEach((rect,id)=>old.set(id,{rect,text:''}));
  lessonStage.replaceChildren(...tiles.map(tileElement));
  if (!lessonMotion()) return;
  lessonStage.querySelectorAll<HTMLElement>('[data-id]').forEach(el=>{
    const before = old.get(el.dataset.id!); const now = el.getBoundingClientRect();
    if (!before) { el.animate([{opacity:0,transform:'translateY(-18px)'},{opacity:1,transform:'none'}],{duration:500,easing:'ease-out'}); return; }
    const dx = before.rect.left-now.left, dy = before.rect.top-now.top, changed = before.text!==el.textContent;
    if (dx||dy||changed) el.animate([{transform:`translate(${dx}px,${dy}px)`,opacity:changed?0.35:1},{transform:'none',opacity:1}],{duration:750,easing:'cubic-bezier(.22,.61,.36,1)'});
  });
}
function wobble(el:HTMLElement) {
  if (lessonMotion()) el.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:320});
}
function optionButton(t:LessonTile, onPick:(button:HTMLButtonElement)=>void) {
  const button = document.createElement('button'); button.className = 'lesson-option'+(t.role?` role-${t.role}`:''); button.textContent = t.text;
  button.onclick = ()=>onPick(button); return button;
}
function practiceSolved() { lessonCaption.classList.add('done'); }

function showPractice(p:LessonPractice) {
  lessonCaption.textContent = p.caption;
  placeTiles(p.tiles);
  if (p.mode==='gap'||p.mode==='pick') {
    lessonOptions.replaceChildren(...p.options.map(o=>optionButton(o,button=>{
      if (lessonCaption.classList.contains('done')) return;
      if (o.text!==p.answer) { wobble(button); return; }
      if (p.mode==='gap') { const rect = button.getBoundingClientRect(); lessonOptions.replaceChildren(); placeTiles(p.after,new Map([['gap',rect]])); }
      else { button.classList.add('picked',`role-${p.role||'mark'}`); lessonOptions.querySelectorAll('button').forEach(b=>{if(b!==button)b.classList.add('faded')}); }
      practiceSolved();
    })));
  } else if (p.mode==='place') {
    const lifted = p.options[0];
    const tileButton = optionButton(lifted,()=>{}); tileButton.classList.add('lifted'); tileButton.tabIndex = -1;
    lessonOptions.replaceChildren(tileButton);
    const tiles = Array.from(lessonStage.children);
    tiles.concat([null as unknown as Element]).forEach((tile,i)=>{
      const slot = document.createElement('button'); slot.className = 'lesson-slot'; slot.setAttribute('aria-label',`Put ${lifted.text} here`);
      slot.onclick = ()=>{
        if (i!==p.slot) { wobble(slot); return; }
        const rect = tileButton.getBoundingClientRect(); lessonOptions.replaceChildren();
        placeTiles(p.after,new Map([[lifted.id,rect]])); practiceSolved();
      };
      lessonStage.insertBefore(slot, tile);
    });
  } else {
    const show = document.createElement('button'); show.className = 'lesson-option'; show.textContent = 'Show answer';
    show.onclick = ()=>{ lessonOptions.replaceChildren(); placeTiles(p.after); practiceSolved(); };
    lessonOptions.replaceChildren(show);
  }
}
function showLessonStep() {
  if (lessonTimer!==undefined) clearTimeout(lessonTimer); lessonTimer = undefined;
  const lesson = activeLesson!; const views = lessonViews(lesson); const view = views[lessonStep];
  document.dispatchEvent(new Event('lessonstep'));
  $('lesson-dots').replaceChildren(...views.map((_,i)=>{const dot=document.createElement('span');if(i===lessonStep)dot.className='on';return dot}));
  $<HTMLButtonElement>('lesson-prev').disabled = lessonStep===0;
  $('lesson-next').textContent = lessonStep===views.length-1 ? '✓' : '→';
  $('lesson-next').setAttribute('aria-label', lessonStep===views.length-1 ? 'Finish lesson' : 'Next step');
  lessonLayer.dataset.view = view.kind; lessonCaption.classList.remove('done'); lessonOptions.replaceChildren();
  if (view.kind==='step') {
    lessonCaption.textContent = view.step.caption; placeTiles(view.step.tiles);
    const then = view.step.then;
    if (then) lessonTimer = setTimeout(()=>{lessonTimer=undefined;placeTiles(then)}, lessonMotion()?1100:0);
  } else if (view.kind==='practice') showPractice(view.practice);
  else { lessonCaption.textContent = lesson.rule; placeTiles(lesson.example); }
}
function lessonGo(step:number) {
  if (!activeLesson) return;
  const next = lessonStep+step;
  if (next>=lessonViews(activeLesson).length) { closeLesson(); return; }
  if (next<0) return;
  lessonStep = next; showLessonStep();
}
function openLesson() {
  const lesson = lessonFor(current()); if (!lesson) return;
  closeTools();
  // Like a hint, a lesson opened before answering counts as support and schedules a later review.
  if (!revealed&&selected!==current().answer) track('concept');
  activeLesson = lesson; lessonStep = 0; $('lesson-title').textContent = lesson.title;
  lessonLayer.hidden = false; document.body.classList.add('lesson-open');
  showLessonStep(); $('lesson-next').focus();
}
function closeLesson() {
  if (lessonTimer!==undefined) clearTimeout(lessonTimer); lessonTimer = undefined;
  activeLesson = undefined; lessonLayer.hidden = true; document.body.classList.remove('lesson-open');
  document.dispatchEvent(new Event('lessonstep'));
}
$('lesson-open').onclick = openLesson;
$('lesson-close').onclick = closeLesson;
$('lesson-prev').onclick = ()=>lessonGo(-1);
$('lesson-next').onclick = ()=>lessonGo(1);
document.addEventListener('keydown',e=>{
  if (!activeLesson||e.defaultPrevented||document.querySelector('dialog[open]')) return;
  if (e.key==='ArrowRight') {e.preventDefault();lessonGo(1)}
  else if (e.key==='ArrowLeft') {e.preventDefault();lessonGo(-1)}
  else if (e.key==='Escape') {e.preventDefault();closeLesson()}
});
