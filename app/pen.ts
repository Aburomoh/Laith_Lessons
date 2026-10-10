// Teacher pen: free drawing over the whole lesson screen for screen-shared lessons.
// Ink stays visible when the pen is off, so the screen remains usable; it clears on a new question.
type Stroke = {color:string; points:[number,number][]};
const ink = document.getElementById('ink') as HTMLCanvasElement;
const inkContext = ink.getContext('2d')!;
const penButton = document.getElementById('pen') as HTMLButtonElement;
const penBar = document.getElementById('pen-bar')!;
let strokes: Stroke[] = [];
let activeStroke: Stroke|undefined;
let penColor = '#d6452f';

function sizeInk(){
  const ratio = window.devicePixelRatio || 1;
  ink.width = Math.round(innerWidth*ratio); ink.height = Math.round(innerHeight*ratio);
  inkContext.setTransform(ratio,0,0,ratio,0,0);
  drawInk();
}
function drawStroke(stroke:Stroke){
  const [first,...rest] = stroke.points;
  inkContext.strokeStyle = stroke.color; inkContext.fillStyle = stroke.color;
  inkContext.lineWidth = 5; inkContext.lineCap = 'round'; inkContext.lineJoin = 'round';
  if(!rest.length){inkContext.beginPath();inkContext.arc(first[0],first[1],2.5,0,Math.PI*2);inkContext.fill();return}
  inkContext.beginPath(); inkContext.moveTo(first[0],first[1]);
  for(const [x,y] of rest) inkContext.lineTo(x,y);
  inkContext.stroke();
}
function drawInk(){inkContext.clearRect(0,0,innerWidth,innerHeight);strokes.forEach(drawStroke)}
function clearInk(){strokes=[];activeStroke=undefined;drawInk()}
function setPen(on:boolean){
  document.body.classList.toggle('drawing',on);
  penButton.setAttribute('aria-pressed',String(on));
  penBar.hidden = !on;
}

ink.addEventListener('pointerdown',e=>{
  if(!document.body.classList.contains('drawing'))return;
  ink.setPointerCapture(e.pointerId);
  activeStroke = {color:penColor,points:[[e.clientX,e.clientY]]};
  strokes.push(activeStroke); drawInk();
});
ink.addEventListener('pointermove',e=>{
  if(!activeStroke)return;
  for(const point of e.getCoalescedEvents?.() ?? [e]) activeStroke.points.push([point.clientX,point.clientY]);
  drawInk();
});
for(const end of ['pointerup','pointercancel'])ink.addEventListener(end,()=>{activeStroke=undefined});

penButton.onclick = ()=>setPen(!document.body.classList.contains('drawing'));
document.querySelectorAll<HTMLButtonElement>('.pen-color').forEach(button=>button.onclick=()=>{
  penColor = button.dataset.color!;
  document.querySelectorAll('.pen-color').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
});
document.getElementById('pen-undo')!.onclick = ()=>{strokes.pop();drawInk()};
document.getElementById('pen-clear')!.onclick = clearInk;
document.addEventListener('questionchange',clearInk);
document.addEventListener('lessonstep',clearInk);
document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||e.ctrlKey||e.altKey||e.metaKey)return;
  if(['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement).tagName))return;
  if(e.key.toLowerCase()==='p'){e.preventDefault();setPen(!document.body.classList.contains('drawing'))}
  else if(e.key==='Escape'&&document.body.classList.contains('drawing')){e.preventDefault();setPen(false)}
});
addEventListener('resize',sizeInk);
sizeInk();
