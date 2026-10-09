type Concept = { title:string; before:string[]; after:string[]; focus:number[]; caption:string; movement:'fall'|'move'|'fade' };
const splitWords=(text:string)=>text.trim().split(/\s+/);
function conceptFor(q:Question):Concept {
  const concept=(title:string,before:string[],after:string[],focus:number[],caption:string,movement:Concept['movement']='move'):Concept=>({title,before,after,focus,caption,movement});
  // Explicit grammar triggers take precedence over broad topic examples.
  if(q.topic==='be'){
    const sentence=q.prompt.match(/\b(I|He|She|It|You|We|They) (am|is|are) ([^?\n]+)\./);
    if(/negative:/i.test(q.prompt)&&sentence){
      const before=splitWords(`${sentence[1]} ${sentence[2]} ${sentence[3]}.`);
      return concept('Make it negative',before,[...before.slice(0,2),'not',...before.slice(2)],[2],`Put not after ${sentence[2]}.`,'fall');
    }
    if(/(?:question:)/i.test(q.prompt)&&sentence){
      const before=splitWords(`${sentence[1]} ${sentence[2]} ${sentence[3]}.`);
      return concept('Make a question',before,splitWords(q.answer),[0],`Move ${sentence[2]} before ${sentence[1].toLowerCase()}.`);
    }
    const contraction=q.prompt.match(/short form means “([^”]+)”/);
    if(contraction)return concept('Short forms',splitWords(contraction[1]),[q.answer],[0],'Two words join. The apostrophe marks missing letters.');
    if(/negative short answer/.test(q.prompt))return concept('A negative answer',['I','am.'],['No,','I','am','not.'],[3],'Not makes the answer negative.','fall');
    const pronoun=q.prompt.match(/^(I|He|She|It|You|We|They) ___/);
    if(pronoun){const p=pronoun[1];const verb=p==='I'?'am':['He','She','It'].includes(p)?'is':'are';return concept('Choose am, is or are',[p,'___','at','home.'],[p,verb,'at','home.'],[1],`${p} goes with ${verb}.`,'fall')}
    if(/Molly and Luca/.test(q.prompt))return concept('Two people → they',['Molly and Luca','→','___'],['Molly and Luca','→','they are'],[2],'Two people: use they and are.','fall');
    return concept('Short answers',['Is','he','at','home?'],['Yes,','he','is.'],[1,2],'Keep he and is together in the answer.');
  }
  if(q.topic==='possessives'){
    const p=q.prompt.match(/goes with “([^”]+)”/);const map:Record<string,string>={I:'my',you:'your',he:'his',she:'her',it:'its',we:'our',they:'their'};
    const owner=p?.[1] || (/Sara|belongs to her|she bag/.test(q.prompt)?'she':/belongs to him/.test(q.prompt)?'he':/cat|it’s bed/.test(q.prompt)?'it':/Ali and I|belongs to us/.test(q.prompt)?'we':/children|belong to them/.test(q.prompt)?'they':/belongs to me/.test(q.prompt)?'I':'you');
    const noun=owner==='it'?'bed':owner==='we'?'house':owner==='they'?'bikes':owner==='she'?'book':owner==='he'?'ball':'bag';
    return concept('Who does it belong to?',[owner,'→','___',noun],[owner,'→',map[owner],noun],[2],`${owner} → ${map[owner]}. Put it before a noun.`,'fall');
  }
  if(q.topic==='phonics'){
    let word=q.prompt.match(/in “([^”]+)”/)?.[1];
    if(!word)word=/b_k_|make, take/.test(q.prompt)?'bake':/Friday/.test(q.prompt)?'holiday':/play and day/.test(q.prompt)?'stay':/snake/.test(q.prompt)?'snake':/rain, train/.test(q.prompt)?'paint':'rain';
    const lower=word.toLowerCase();const ai=lower.indexOf('ai');const ay=lower.indexOf('ay');
    const parts=ai>=0?[word.slice(0,ai),'ai',word.slice(ai+2)]:ay>=0?[word.slice(0,ay),'ay',word.slice(ay+2)]:[word.slice(0,lower.indexOf('a')),'a',word.slice(lower.indexOf('a')+1,-1),'e'];
    const tokens=parts.filter(Boolean);const focus=tokens.flatMap((t,i)=>['a','e','ai','ay'].includes(t)?[i]:[]);
    return concept('Long A',tokens,tokens,focus,`${word}: hear the letter name A. ${ai>=0?'ai':ay>=0?'ay':'a_e'} makes the long A sound.`,'fade');
  }
  if(q.topic==='capitals'){
    const correct=q.answer;const before=q.choices?.find(c=>c!==correct)||q.prompt.split('\n').at(-1)!;
    const after=splitWords(correct);const initial=splitWords(before);
    return concept('Capital letters',initial,after,after.flatMap((t,i)=>t!==initial[i]?[i]:[]),'Check the start, names, places, I, days and months.');
  }
  if(q.topic==='origins')return concept('Where asks about a place',['Where','is','she','from?'],['She','is','from','Italy.'],[3],'Where? → A place. This is an example.','fall');
  if(q.topic==='reading'){
    if(/pronoun|refer to/.test(q.prompt))return concept('A pronoun replaces a noun',['Giraffes','are','tall.'],['They','are','tall.'],[0],'They refers to the giraffes.');
    if(/verb/.test(q.prompt))return concept('An action word',['We','help','our','parents.'],['We','help','our','parents.'],[1],'Help is an action word: a verb.','fade');
    if(/adjective|opposite/.test(q.prompt))return concept('A describing word',['Giraffes','are','tall.'],['Giraffes','are','tall.'],[2],'Tall describes giraffes. Tall is the opposite of short.','fade');
    if(/noun/.test(q.prompt))return concept('A naming word',['We','help','our','parents.'],['We','help','our','parents.'],[3],'Parents names people. It is a noun.','fade');
    const fact=/Julian/.test(q.prompt)?'Julian and Stephanie are giraffe experts.':/Luca.*(?:old|dad)|dad/.test(q.prompt)?'Luca’s dad is from Australia.':/mum/.test(q.prompt)?'Luca’s mum is from Germany.':/spots|recognise/.test(q.prompt)?'Giraffes have different spots.':/photos|use/.test(q.prompt)?'We use photos.':/noses/.test(q.prompt)?'Their noses are soft.':/grandparents/.test(q.prompt)?'We don’t see our grandparents very often.':/Melvin/.test(q.prompt)?'Melvin is Molly’s favourite giraffe.':/Namibia|live/.test(q.prompt)?'They live in Namibia. They aren’t from Namibia.':/male child/.test(q.prompt)?'A son is a male child.':/old is Luca/.test(q.prompt)?'Luca is twelve years old.':'Molly is nine years old.';
    if(!/Read these sentences/.test(q.prompt))return concept('Find the evidence',splitWords(fact),splitWords(fact),splitWords(fact).map((_,i)=>i),'Read the passage. Find words that support your answer.','fade');
    return concept('Find the evidence',['Molly','is','nine','years','old.'],['Molly','is','nine','years','old.'],[2],'For an age question, find the age in the story. This is an example.','fade');
  }
  if(q.topic==='world'){
    const country=q.prompt.match(/continent matches (.+)\?/);
    if(country)return concept('Country → continent',[country[1],'→','___'],[country[1],'→',q.answer],[2],'A country is in a continent. Use the worksheet’s labels.','fall');
    return concept('Country and continent',['Brazil','→','___'],['Brazil','→','South America'],[2],'Brazil is a country. South America is a continent. This is an example.','fall');
  }
  if(q.topic==='writing')return concept('Build a simple sentence',['I','live','in','…'],['I','live','in','Jordan.'],[0,3],'An example: start with a capital and end with a full stop. Use your own place.','fall');
  const word=q.prompt.match(/“([^”]+)”/)?.[1]||(/Which word is a verb/.test(q.prompt)?'arrive':['arrive','daughter','Tokyo','parents','difficult','friendly','travel'].includes(q.answer)?q.answer:'friendly');
  const meanings:Record<string,string>={grandparents:'Your mum’s or dad’s parents',parents:'Mother and father',son:'A male child',daughter:'A female child',Friday:'Thursday → Friday → Saturday',game:'A fun activity or sport',friendly:'Kind and nice',difficult:'Not easy',arrive:'Get to a place',travel:'Go to another place',Tokyo:'A city in Japan'};
  return concept('Word and meaning',[word,'→','…'],[word,'→',meanings[word]||'Kind and nice'],[2],'Say the word, then say its meaning.','fade');
}
