let conceptTimer:ReturnType<typeof setTimeout>|undefined;
const conceptAnimations:Animation[]=[];
function stopConcept(){if(conceptTimer!==undefined)clearTimeout(conceptTimer);conceptTimer=undefined;conceptAnimations.splice(0).forEach(a=>a.cancel())}
function animateConcept(){
  stopConcept();const c=conceptFor(current());const row=$('concept-words');const caption=$('concept-caption');
  $('concept-title').textContent=c.title;caption.textContent=c.caption;
  const picture=$<HTMLImageElement>('concept-picture');const key=illustrationFor(current());
  picture.hidden=!key;$('concept-dialog').classList.toggle('illustrated',!!key);
  if(key){picture.alt=illustrations[key].alt;picture.src=illustrations[key].src;picture.onerror=()=>{picture.hidden=true;$('concept-dialog').classList.remove('illustrated')}}else picture.removeAttribute('src');
  row.classList.toggle('phonics',!!c.phonics);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fill=(tokens:string[],final:boolean)=>{row.replaceChildren();tokens.forEach((word,i)=>{const el=document.createElement('span');el.textContent=word;el.className='concept-word';if(final&&c.focus.includes(i))el.classList.add('concept-focus');if(final&&c.phonics==='a_e'&&i>=c.focus[0]&&i<=c.focus.at(-1)!)el.classList.add('phonics-bridge');row.append(el)})};
  if(reduced){fill(c.after,true);return}
  fill(c.before,false);
  conceptTimer=setTimeout(()=>{
    const previous=Array.from(row.children).map(el=>({text:el.textContent!.toLowerCase().replace(/[.?]/g,''),rect:el.getBoundingClientRect(),used:false}));
    fill(c.after,true);
    Array.from(row.children).forEach((el,i)=>{
      const text=el.textContent!.toLowerCase().replace(/[.?]/g,'');const old=previous.find(p=>!p.used&&p.text===text);const rect=el.getBoundingClientRect();if(old)old.used=true;
      const special=c.focus.includes(i);
      const from=c.movement==='fade'?{opacity:special ? 0.3 : 1}:old?{transform:`translate(${old.rect.x-rect.x}px, ${old.rect.y-rect.y}px)`,opacity:1}:{transform:`translateY(${c.movement==='fall'?'-80':'-24'}px)`,opacity:0};
      conceptAnimations.push(el.animate([from,{transform:'translate(0,0)',opacity:1}],{duration:c.movement==='fall'&&special?1800:1300,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'}));
    });
    conceptTimer=undefined;
  },1600);
}
$('concept-info').onclick=()=>{if(selected!==current().answer)track('concept');$<HTMLDialogElement>('concept-dialog').showModal();animateConcept()};
$('concept-replay').onclick=animateConcept;
$('concept-dialog').addEventListener('close',stopConcept);
