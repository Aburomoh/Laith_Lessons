// Interactive lessons: one rule per lesson, shown with a model, a second example, a turn for Laith and a one-line summary.
// Worked examples use parallel sentences; the question's own sentence appears only in the practice step.
type LessonRole = 'who'|'be'|'not'|'own'|'q'|'noun'|'verb'|'adj'|'cap'|'mark';
type LessonTile = {id:string; text:string; role?:LessonRole; gap?:boolean; br?:boolean; join?:boolean};
type LessonStep = {caption:string; tiles:LessonTile[]; then?:LessonTile[]};
// gap: choose the word for the gap · pick: choose the right tile · place: put the lifted tile in the right slot · say: answer aloud, then show.
type LessonPractice = {mode:'gap'|'pick'|'place'|'say'; caption:string; tiles:LessonTile[]; options:LessonTile[]; answer:string; slot?:number; after:LessonTile[]; role?:LessonRole};
type Lesson = {kind:string; title:string; steps:LessonStep[]; practice?:LessonPractice; rule:string; example:LessonTile[]};

const autoRoles: Record<string,LessonRole> = {i:'who',you:'who',he:'who',she:'who',it:'who',we:'who',they:'who',am:'be',is:'be',are:'be','’m':'be','’s':'be','’re':'be',not:'not','isn’t':'be','aren’t':'be',my:'own',your:'own',his:'own',her:'own',its:'own',our:'own',their:'own',where:'q'};

// "He/who is at home." → tiles. word/role#id sets a role and a stable id; _ joins words; | breaks the line; ___ is a gap.
// Tiles keep their id between steps, so a word that changes or moves animates instead of reappearing.
function lessonTiles(spec:string, auto=true):LessonTile[] {
  const out:LessonTile[] = []; const seen = new Map<string,number>();
  const id = (base:string)=>{const n=(seen.get(base)||0)+1;seen.set(base,n);return n===1?base:`${base}${n}`};
  for (const token of spec.trim().split(/\s+/)) {
    if (token==='|') {out.push({id:id('br'),text:'',br:true});continue}
    const gap = token.match(/^___([.?!,]?)$/);
    if (gap) {out.push({id:'gap',text:'',gap:true});if(gap[1])out.push({id:id('end'),text:gap[1]});continue}
    const m = token.match(/^(.+?)(?:\/(\w+))?(?:#([\w’]+))?([.?!,:]?)$/)!;
    const text = m[1].replace(/_/g,' '); const lower = text.toLowerCase();
    const role = (m[2] as LessonRole|undefined) || (auto ? autoRoles[lower] : undefined);
    out.push({id:m[3] || id(role&&!m[2]&&auto&&autoRoles[lower] ? role : lower.replace(/[’\s]/g,'')), text, role, join:text.startsWith('’')});
    if (m[4]) out.push({id:m[4]===','?id('comma'):m[4]===':'?id('colon'):id('end'), text:m[4]});
  }
  // "belongs to her." uses her as an object, not a possessive: keep it uncoloured.
  return out.map((t,i)=>t.text.toLowerCase()==='her'&&!t.id.startsWith('her')&&/^[.?!,]$/.test(out[i+1]?.text||'')?{...t,role:undefined}:t);
}
const lessonLine = (q:Question, pattern:RegExp)=>q.prompt.split('\n').find(line=>pattern.test(line));
const lastLine = (q:Question)=>q.prompt.split('\n').at(-1)!;
const optionTiles = (choices:string[], auto=false)=>choices.map((c,i)=>({id:`option${i}`,text:c,role:auto?autoRoles[c.toLowerCase()]:undefined}));

// The practice step always uses the question itself.
function practiceFor(q:Question, caption:string, auto=true, context?:string, pickRole?:LessonRole):LessonPractice {
  if (q.choices && lessonLine(q,/___/)) {
    // Every line of the prompt: the second line often holds the clue (for example "No, he isn’t.").
    const spec = q.prompt.split('\n').join(' | ');
    return {mode:'gap',caption,tiles:lessonTiles(spec,auto),options:optionTiles(q.choices,auto),answer:q.answer,
      after:lessonTiles(spec,auto).map(t=>t.gap?{id:'gap',text:q.answer,role:(auto&&autoRoles[q.answer.toLowerCase()])||pickRole||'mark'}:t)};
  }
  if (q.choices) {
    const tiles = context ? lessonTiles(context,auto) : [];
    return {mode:'pick',caption,tiles,options:optionTiles(q.choices),answer:q.answer,after:tiles,role:pickRole};
  }
  return {mode:'say',caption:'Your turn: say it aloud.',tiles:lessonTiles(context||lastLine(q),auto),options:[],answer:q.answer,after:lessonTiles(q.answer,auto)};
}

function lessonFor(q:Question):Lesson|undefined {
  const p = q.prompt;
  if (q.topic==='be'||q.topic==='origins') {
    if (/negative:/i.test(p)&&/Make/.test(p)) return negativeLesson(q);
    if (/question:|Ask a question|^___ \w+ from/.test(p)) return questionLesson(q);
    if (/short form/.test(p)) return shortFormLesson(q);
    if (/short answer|Answer positively|Answer negatively|Yes, ___|^Is ___/.test(p)) return shortAnswerLesson(q);
    if (q.topic==='origins'&&/Where/.test(p+(q.choices||[]).join(' '))&&!/Where do you live|I ___/.test(p)) return whereLesson(q);
    if (/___/.test(p)) return beLesson(q);
    return undefined;
  }
  if (q.topic==='possessives') return possessiveLesson(q);
  if (q.topic==='capitals') return capitalsLesson(q);
  if (/Which word is an? (verb|noun|adjective)\?/.test(p)) return wordClassLesson(q);
  if (/Which word is a pronoun|refer to/.test(p)) return pronounLesson(q);
  if (q.topic==='words'&&/Friday/.test(p)) return daysLesson(q);
  if (q.topic==='words'&&/grandparents|parents|son|daughter/.test(p+q.answer)) return familyLesson(q);
  if (q.topic==='world'&&/continent|country/.test(p)&&!/picture/.test(p)) return continentLesson(q);
  return undefined;
}

function beLesson(q:Question):Lesson {
  return {kind:'be',title:'Am, is or are?',steps:[
    {caption:'I goes with am.',tiles:lessonTiles('I am happy.')},
    {caption:'He, she and it go with is.',tiles:lessonTiles('She is happy.')},
    {caption:'You, we and they go with are.',tiles:lessonTiles('They are happy.')}
  ],practice:practiceFor(q,'Your turn: which word fits?'),
  rule:'I → am · he, she, it → is · you, we, they → are',example:lessonTiles('We are happy.')};
}
function negativeLesson(q:Question):Lesson {
  const sentence = lastLine(q).replace(/^Make it negative: /,'');
  const tiles = lessonTiles(sentence); const be = tiles.findIndex(t=>t.role==='be');
  return {kind:'negative',title:'Saying no with not',steps:[
    {caption:'A sentence with is.',tiles:lessonTiles('She is happy.')},
    {caption:'Put not after am, is or are.',tiles:lessonTiles('She is not happy.')},
    {caption:'Not comes after are.',tiles:lessonTiles('We are at school.'),then:lessonTiles('We are not at school.')}
  ],practice:{mode:'place',caption:'Your turn: where does not go?',tiles,options:[{id:'not',text:'not',role:'not'}],answer:'not',slot:be+1,after:lessonTiles(q.answer)},
  rule:'Put not after am / is / are.',example:lessonTiles('He is not at home.')};
}
function questionLesson(q:Question):Lesson {
  let practice:LessonPractice;
  const statement = lastLine(q).match(/^(?:Make a question: )?((?:I|He|She|It|You|We|They) (?:am|is|are) .+\.)$/)?.[1];
  if (statement) {
    const tiles = lessonTiles(statement); const be = tiles.find(t=>t.role==='be')!;
    practice = {mode:'place',caption:'Your turn: where does '+be.text+' go?',tiles:tiles.filter(t=>t!==be),options:[be],answer:be.text,slot:0,after:lessonTiles(q.answer)};
  } else practice = practiceFor(q,'Your turn: which word starts the question?');
  return {kind:'question',title:'Making a question',steps:[
    {caption:'A sentence.',tiles:lessonTiles('She is happy.')},
    {caption:'Move is to the front. End with ?',tiles:lessonTiles('Is she happy?')},
    {caption:'Are moves to the front too.',tiles:lessonTiles('They are at school.'),then:lessonTiles('Are they at school?')}
  ],practice,rule:'Question: am / is / are goes first.',example:lessonTiles('Is he at home?')};
}
function shortAnswerLesson(q:Question):Lesson {
  const question = q.prompt.split('\n').find(line=>/\?$/.test(line)&&!/___/.test(line));
  return {kind:'short-answer',title:'Short answers',steps:[
    {caption:'A yes / no question.',tiles:lessonTiles('Is she happy?')},
    {caption:'Yes + she + is.',tiles:lessonTiles('Yes, she is.')},
    {caption:'No + they + are + not.',tiles:lessonTiles('Are they at school?'),then:lessonTiles('No, they are not.')}
  ],practice:practiceFor(q,'Your turn: choose the answer.',true,question),
  rule:'Yes, he is. · No, he isn’t.',example:lessonTiles('No, she isn’t.')};
}
function shortFormLesson(q:Question):Lesson {
  const words = q.prompt.match(/means “([^”]+)”/)?.[1]||'I am';
  return {kind:'short-form',title:'Short forms',steps:[
    {caption:'Two words.',tiles:lessonTiles('I am')},
    {caption:'They join. ’ shows the missing letter.',tiles:lessonTiles('I ’m/be#be')},
    {caption:'They are → they’re.',tiles:lessonTiles('They are'),then:lessonTiles('They ’re/be#be')}
  ],practice:practiceFor(q,'Your turn: choose the short form.',true,words),
  rule:'I am → I’m · he is → he’s · they are → they’re',example:lessonTiles('She ’s/be#be')};
}
function whereLesson(q:Question):Lesson {
  const question = q.prompt.split('\n').find(line=>/^Where .+\?$/.test(line));
  return {kind:'where',title:'Where … from?',steps:[
    {caption:'A place.',tiles:lessonTiles('He is from Spain/mark#place.')},
    {caption:'Ask about the place with Where. Is goes before he.',tiles:lessonTiles('Where/q#place is he from?')},
    {caption:'The same with are.',tiles:lessonTiles('They are from Brazil/mark#place.'),then:lessonTiles('Where/q#place are they from?')}
  ],practice:practiceFor(q,'Your turn.',true,question),
  rule:'Where + am / is / are + person + from?',example:lessonTiles('Where are you from?')};
}
function possessiveLesson(q:Question):Lesson {
  const owner = q.prompt.match(/goes with “([^”]+)”/)?.[1];
  const practice = owner ? {...practiceFor(q,'Your turn: which word shows belonging?'),mode:'gap' as const,tiles:lessonTiles(`${owner} → ___`),options:optionTiles(q.choices!,true),after:lessonTiles(`${owner} → ${q.answer}`)}
    : practiceFor(q,'Your turn: which word fits?',true,/Correct the sentence/.test(q.prompt)?lastLine(q):undefined);
  return {kind:'possessive',title:'My, your, his, her…',steps:[
    {caption:'The bag belongs to me.',tiles:lessonTiles('The bag belongs to me/who#me.')},
    {caption:'me → my. My goes before the thing.',tiles:lessonTiles('This is my#me bag.')},
    {caption:'him → his.',tiles:lessonTiles('The ball belongs to him/who#him.'),then:lessonTiles('This is his#him ball.')}
  ],practice,rule:'I → my · you → your · he → his · she → her · it → its · we → our · they → their',example:lessonTiles('This is our house.')};
}
function capitalTiles(sentence:string):LessonTile[] {
  // Changed letters become capitals in place: the tile id stays the lower-case word.
  return lessonTiles(sentence,false).map(t=>t.text!==t.text.toLowerCase()&&!/^[.?!,]$/.test(t.text)?{...t,role:'cap' as const}:t);
}
function capitalsLesson(q:Question):Lesson {
  const wrong = /\n/.test(q.prompt) ? lastLine(q) : undefined;
  let practice:LessonPractice;
  if (wrong) practice = {mode:'say',caption:'Your turn: which letters need capitals?',tiles:lessonTiles(wrong,false),options:[],answer:q.answer,after:capitalTiles(q.answer)};
  else practice = practiceFor(q,'Your turn: which sentence is correct?',false);
  return {kind:'capitals',title:'Capital letters',steps:[
    {caption:'Look at the first letters.',tiles:lessonTiles('my friend is omar.',false)},
    {caption:'Capitals: the first word and names.',tiles:capitalTiles('My friend is Omar.')},
    {caption:'Capitals: I and days of the week.',tiles:lessonTiles('i play on friday.',false),then:capitalTiles('I play on Friday.')}
  ],practice,rule:'Capitals: the first word, I, names, places, days and months.',example:capitalTiles('Sara is from Japan.')};
}
function wordClassLesson(q:Question):Lesson {
  const kind = q.prompt.match(/(verb|noun|adjective)/)![1];
  const role:LessonRole = kind==='verb'?'verb':kind==='noun'?'noun':'adj';
  return {kind:'word-class',title:'Nouns, verbs and adjectives',steps:[
    {caption:'Every word has a job.',tiles:lessonTiles('Molly likes soft noses.',false)},
    {caption:'Noun: a person, place or thing. Verb: an action. Adjective: describes.',tiles:lessonTiles('Molly/noun likes/verb soft/adj noses/noun.',false)},
    {caption:'Try another sentence.',tiles:lessonTiles('We help our parents.',false),then:lessonTiles('We help/verb our parents/noun.',false)}
  ],practice:practiceFor(q,`Your turn: which word is ${kind==='adjective'?'an':'a'} ${kind}?`,false,undefined,role),
  rule:'Noun: a thing · Verb: an action · Adjective: describes',example:lessonTiles('Parrots/noun are friendly/adj.',false)};
}
function pronounLesson(q:Question):Lesson {
  const quoted = q.prompt.match(/in “([^”]+)”/)?.[1];
  return {kind:'pronoun',title:'Pronouns point back',steps:[
    {caption:'A noun.',tiles:lessonTiles('Giraffes/noun#g are cool.')},
    {caption:'They replaces giraffes.',tiles:lessonTiles('They/who#g are cool.')},
    {caption:'She replaces Molly.',tiles:lessonTiles('Molly/noun#m is nine.'),then:lessonTiles('She/who#m is nine.')}
  ],practice:practiceFor(q,'Your turn: what does it point back to?',true,quoted),
  rule:'A pronoun (he, she, it, they) replaces a noun.',example:lessonTiles('Giraffes are tall. | They are cool.')};
}
function daysLesson(q:Question):Lesson {
  return {kind:'days',title:'Days of the week',steps:[
    {caption:'Seven days.',tiles:lessonTiles('Friday Monday Sunday Wednesday Tuesday Saturday Thursday',false)},
    {caption:'In order. Each day starts with a capital.',tiles:lessonTiles('Monday Tuesday Wednesday Thursday Friday Saturday Sunday',false)},
    {caption:'Which day comes next?',tiles:lessonTiles('Monday → ___ → Wednesday',false),then:lessonTiles('Monday → Tuesday/mark#gap → Wednesday',false)}
  ],practice:practiceFor(q,'Your turn.',false,'Friday/mark'),
  rule:'Seven days in order. Each starts with a capital letter.',example:lessonTiles('Monday Tuesday Wednesday Thursday Friday Saturday Sunday',false)};
}
function familyLesson(q:Question):Lesson {
  const word = q.prompt.match(/“([^”]+)”/)?.[1];
  return {kind:'family',title:'Family words',steps:[
    {caption:'Family words.',tiles:lessonTiles('son grandparents daughter parents',false)},
    {caption:'Grandparents → parents → children.',tiles:lessonTiles('grandparents/mark | parents/noun | son daughter',false)},
    {caption:'Mum and dad are your parents.',tiles:lessonTiles('mum + dad = ___',false),then:lessonTiles('mum + dad = parents/noun#gap',false)}
  ],practice:practiceFor(q,'Your turn.',false,word?`${word}/mark`:undefined),
  rule:'grandparents → parents → son (boy) · daughter (girl)',example:lessonTiles('grandparents | parents | son daughter',false)};
}
function continentLesson(q:Question):Lesson {
  const country = q.prompt.match(/matches (.+)\?/)?.[1];
  return {kind:'continents',title:'Continents and countries',steps:[
    {caption:'Continents and countries.',tiles:lessonTiles('Japan Europe Brazil Asia Poland South_America',false)},
    {caption:'A continent is very big. It has many countries.',tiles:lessonTiles('Asia/mark: Japan | Europe/mark: Poland | South_America/mark: Brazil',false)},
    {caption:'Jordan is in Asia too.',tiles:lessonTiles('Jordan → ___',false),then:lessonTiles('Jordan → Asia/mark#gap',false)}
  ],practice:practiceFor(q,'Your turn.',false,country?country.replace(/ /g,'_')+'/noun':undefined),
  rule:'Continent → many countries. Asia: Japan, Jordan · Europe: Poland',example:lessonTiles('Asia/mark: Japan Jordan',false)};
}
