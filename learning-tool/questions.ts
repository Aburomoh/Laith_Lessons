type TopicId = 'words' | 'world' | 'be' | 'origins' | 'reading' | 'possessives' | 'phonics' | 'capitals' | 'writing';
type Question = { id: string; topic: TopicId; prompt: string; choices?: string[]; answer: string; explanation: string; hint: string; source: string; photo: string; extra: boolean; excerpt?: string; story?: 'giraffe' | 'jake'; pose?: string };
type Topic = { id: TopicId; title: string; icon: string; subtitle: string };
const topics: Topic[] = [
  {id:'words',title:'Words & meanings',icon:'Aa',subtitle:'Family words, actions and describing words'},
  {id:'world',title:'Around the world',icon:'◎',subtitle:'Continents, countries and worksheet clues'},
  {id:'be',title:'Am, is & are',icon:'?',subtitle:'Statements, negatives and short answers'},
  {id:'origins',title:'Where are you from?',icon:'↗',subtitle:'Ask and answer about places'},
  {id:'reading',title:'The giraffe family',icon:'▤',subtitle:'Read, find facts and explain words'},
  {id:'possessives',title:'My, your, his, her…',icon:'↔',subtitle:'Show who something belongs to'},
  {id:'phonics',title:'Long A sounds',icon:'ā',subtitle:'Read and spell a_e, ai and ay'},
  {id:'capitals',title:'Capital letters',icon:'A',subtitle:'Names, places and sentence beginnings'},
  {id:'writing',title:'Tell me about your country',icon:'✎',subtitle:'Build three simple sentences'}
];
const sources: Record<string, [string,string]> = {
  words:['Revision p. 2 · Vocabulary','12.10.07 AM (2)'], actions:['Revision vocabulary continuation · Page number not visible','12.10.12 AM (1)'],
  world:['Revision p. 4 · Continents and countries','12.10.08 AM (3)'], clues:['Revision p. 5 · Country clues and vocabulary','12.10.11 AM (1)'],
  be:['Revision p. 6 · The verb to be','12.10.12 AM'], origins:['Revision p. 7 · Where? / Origins','12.10.07 AM'],
  reading:['Revision p. 8 · Reading comprehension','12.10.07 AM (3)'], possessives:['Revision p. 9 · Possessive adjectives','12.10.10 AM (3)'],
  longA:['Revision p. 11 · Long A','12.10.09 AM (1)'], phonics:['Revision p. 12 · Phonics and Jake story','12.10.08 AM (2)'],
  bookPhonics:['Classbook p. 15 · Long A phonics','12.10.06 AM'], capitals:['Revision p. 13 · Capitalisation','12.10.09 AM (3)'], writing:['Revision p. 14 · Three facts about your country','12.10.12 AM (3)']
};
const stories = {
  giraffe: {title:'The giraffe family', text:`Julian and Stephanie Fennessy are giraffe experts. They live in Namibia in Africa with their son, Luca and daughter, Molly. They aren’t from Namibia. They live there because of the giraffes.

Luca (twelve years old)
We help our parents with the giraffes. We use photos to see which giraffes are there. We know many giraffes because they all have different spots. Our family is from different places – my dad is from Australia, and my mum is from Germany.

Molly (nine years old)
Giraffes are cool. They are tall and their colours are beautiful. I like their soft noses. Melvin is the name of my favourite giraffe. I like living here, but we don’t see our grandparents, uncles and aunts or cousins in Germany and Australia very often.`},
  jake: {title:'Jake the snail',text:`This is Jake. Jake is a snail. Jake likes to play. Jake has two friends, May and Ray.
Jake plays with May and Ray. They see a pail beside the hay. They climb up and down the pail. Then comes the rain.
Jake, May and Ray love the rain. They play all day in the rain.
It was fun, all the way.`}
};
const questions: Question[] = [];
function add(topic: TopicId, sourceKey: string, prompt: string, choices: string[] | undefined, answer: string, explanation: string, hint: string, extra=false, detail: Partial<Question> = {}) {
  const [source, suffix] = sources[sourceKey];
  questions.push({id:`${topic}-${questions.filter(q=>q.topic===topic).length+1}`, topic, prompt, choices, answer, explanation, hint, source, photo:`WhatsApp Image 2026-10-10 at ${suffix}.jpeg`, extra, ...detail});
}
function mc(topic: TopicId, source: string, prompt: string, choices: string[], answer: string, explanation: string, hint: string, extra=false, detail: Partial<Question>={}) {add(topic,source,prompt,choices,answer,explanation,hint,extra,detail)}
function oral(topic: TopicId, source: string, prompt: string, answer: string, explanation: string, hint: string, extra=false, detail: Partial<Question>={}) {add(topic,source,prompt,undefined,answer,explanation,hint,extra,detail)}

// Short prompts adapt the selected pages for spoken tutoring. Added examples are explicitly labelled.
for (const [word,meaning,distractor,hint] of [
  ['grandparents','The parents of your mum or dad','Your brothers and sisters','Think about your grandma and grandpa.'],
  ['parents','Your mother and father','Your cousins','Think about your mum and dad.'],
  ['son','A male child','A female child','A boy can be someone’s son.'],
  ['daughter','A female child','A male child','A girl can be someone’s daughter.'],
  ['Friday','The day after Thursday','The day after Sunday','Thursday, ___, Saturday.'],
  ['game','A fun activity or sport','A place to live','You can play it.'],
  ['friendly','Kind and nice to people','Not easy','A friendly person is kind.']
]) mc('words','words',`What does “${word}” mean?`,[meaning,distractor],meaning,`${word}: ${meaning.toLowerCase()}.`,hint);
for (const [word,meaning,wrong,hint] of [
  ['difficult','Not easy','Very friendly','A hard question is a difficult question.'],
  ['arrive','Get to a place','Play a game','The bus gets to school at 7:00.'],
  ['travel','Go to another place','Stay in one place','Think about going somewhere by bus or plane.']
]) mc('words','actions',`What does “${word}” mean?`,[wrong,meaning],meaning,`${word}: ${meaning.toLowerCase()}.`,hint);
for (const [prompt,choices,answer,explanation] of [
  ['The school bus will ___ at 7:00 AM.',['arrive','daughter','parents'],'arrive','Arrive means get to a place.'],
  ['George has two sons and one ___.',['Tokyo','daughter','difficult'],'daughter','Son and daughter are family words.'],
  ['___ is a beautiful city in Japan.',['Tokyo','Parents','Arrive'],'Tokyo','Tokyo is a city in Japan.'],
  ['I live with my ___ in a nice house.',['difficult','parents','Tokyo'],'parents','Parents means your mother and father.'],
  ['English is not a ___ language to learn.',['daughter','arrive','difficult'],'difficult','Difficult means not easy.']
] as [string,string[],string,string][]) mc('words','clues',prompt,choices,answer,explanation,'Choose the word that makes sense in this sentence.');
mc('words','words','My new classmate is kind. She is ___.',['friendly','difficult','Friday'],'friendly','Friendly means kind and nice to other people.','Which word describes a kind person?',true);
mc('words','actions','We ___ to another city by bus.',['daughter','travel','game'],'travel','Travel means go to another place.','Choose an action word.',true);
mc('words','words','Which word is an adjective?',['son','friendly','game'],'friendly','Friendly describes a person. It is an adjective.','An adjective describes someone or something.',true);
mc('words','actions','Which word is a verb?',['arrive','daughter','Friday'],'arrive','Arrive is an action word: a verb.','A verb can tell us an action.',true);

for (const [country,continent,options] of [
  ['the US','North America',['North America','South America','Europe']],
  ['Brazil and Argentina','South America',['Asia','South America','Africa']],
  ['Poland','Europe',['Africa','Europe','Asia']],
  ['South Africa','Africa',['Europe','Australia','Africa']],
  ['Australia','Australia',['Australia','Asia','Antarctica']],
  ['Jordan and Japan','Asia',['Asia','Europe','North America']]
] as [string,string,string[]][]) mc('world','world',`Which continent matches ${country}?`,options,continent,`${country} → ${continent} (using the worksheet’s continent labels).`,'Think about the country’s place on the world map.');
oral('world','world','Can you name the seven continents on the worksheet?','North America, South America, Europe, Africa, Asia, Antarctica, Australia.','The worksheet uses Australia as its continent label. The classbook map uses Oceania. Keep the source wording clear.','Start with North America and South America.');
mc('world','world','Which one is a continent?',['Japan','Africa','Poland'],'Africa','Africa is a continent. Japan and Poland are countries.','A continent contains countries.',true);
mc('world','world','Which one is a country?',['Europe','Asia','Brazil'],'Brazil','Brazil is a country in South America.','Choose a country, not a continent.',true);
for (const [clue,answer,choices] of [
  ['giraffe','South Africa',['South Africa','Japan','Spain']],
  ['football','the UK',['Brazil','the UK','the US']],
  ['guitar','Spain',['Spain','Japan','South Africa']],
  ['baseball bat and ball','the US',['the UK','the US','Brazil']],
  ['parrot','Brazil',['Japan','Spain','Brazil']],
  ['sushi','Japan',['Japan','the UK','the US']]
] as [string,string,string[]][]) mc('world','clues',`In the worksheet, which country matches the ${clue} picture?`,choices,answer,`The worksheet pairs this picture with ${answer}. This is a picture clue, not something found only in that country.`,'Recall the picture-and-country pairs on revision page 5.');
oral('world','world','Say and spell: South America.','South America','Use capital S and capital A. There is a space between the words.','It has two words.',true);

for (const [pronoun,answer,extra] of [['I','am',false],['He','is',false],['She','is',false],['It','is',false],['You','are',false],['We','are',false],['They','are',false]] as [string,string,boolean][]) mc('be','be',`${pronoun} ___ at home.`,['am','is','are'],answer,`${pronoun} ${answer} at home.`,'I → am. He / she / it → is. You / we / they → are.',extra);
for (const [prompt,choices,answer,explanation] of [
  ['Make it negative: He is at home.',['He is not at home.','He not is at home.'],'He is not at home.','Put not after is.'],
  ['Make it negative: They are at home.',['They not are at home.','They are not at home.'],'They are not at home.','Put not after are.'],
  ['Make a question: He is at home.',['Is he at home?','He is at home?'],'Is he at home?','Move is before he.'],
  ['Make a question: They are at home.',['Are they at home?','Is they at home?'],'Are they at home?','They takes are. Put are first in the question.'],
  ['Is he from Jordan?\nChoose the short answer.',['Yes, he is.','Yes, he are.'],'Yes, he is.','He takes is.'],
  ['Are you from Japan?\nChoose the positive short answer.',['Yes, you am.','Yes, I am.'],'Yes, I am.','When someone asks you, answer about yourself with I.'],
  ['Are you from Japan?\nChoose the negative short answer.',['No, I am not.','No, I is not.'],'No, I am not.','I takes am. Put not after am.'],
  ['Which short form means “I am”?',['I’m','I’s','I’re'],'I’m','I am → I’m.'],
  ['Which short form means “They are”?',['They’s','They’re','They’m'],'They’re','They are → They’re.'],
  ['Which short form means “She is”?',['She’re','She’s','She’m'],'She’s','She is → She’s.'],
  ['Which short form means “We are”?',['We’re','We’s','We’m'],'We’re','We are → We’re.'],
  ['Which short form means “It is”?',['It’re','Its','It’s'],'It’s','It is → It’s. The apostrophe matters.'],
  ['Which short form means “You are”?',['You’s','You’re','Your'],'You’re','You are → You’re. Your shows belonging.'],
  ['Which short form means “He is”?',['He’s','He’re','He’m'],'He’s','He is → He’s.']
] as [string,string[],string,string][]) mc('be','be',prompt,choices,answer,explanation,'Check the pronoun, then choose am, is or are.');
mc('be','be','Molly and Luca ___ children.',['am','is','are'],'are','Two people → they → are.','Replace Molly and Luca with they.',true);
oral('be','be','Make this negative:\nI am at home.','I am not at home.','Put not after am. I’m not at home is also correct.','I am ___ at home.',true);
oral('be','be','Ask a question:\nShe is from Japan.','Is she from Japan?','Put is before she.','Start with Is.',true);

mc('origins','origins','___ are you from?',['Where','Who','What'],'Where','Where asks about a place.','The answer will be a place.');
mc('origins','origins','Where are you from?\nI ___ from Poland.',['am','is','are'],'am','I am from Poland.','Which form of be goes with I?');
mc('origins','origins','Is ___ from Mexico?\nNo, he isn’t.',['they','he','we'],'he','Is he from Mexico? No, he isn’t.','Look at the pronoun in the answer.');
mc('origins','origins','___ football from the UK?\nYes, it is.',['Are','Am','Is'],'Is','Is football from the UK? Yes, it is.','Football is referred to as it here.');
mc('origins','origins','Is football from the UK?\nYes, ___ is.',['he','it','they'],'it','Yes, it is. Use it for the sport.','Football is a thing, not a person.');
oral('origins','origins','Answer positively:\nIs Peter from Argentina?','Yes, he is.','Peter → he. He takes is.','Yes, he ___.');
oral('origins','origins','Where is she from?\nUse: Italy.','She is from Italy.','She’s from Italy is also correct.','She is from ___.');
oral('origins','origins','Where do you live?\nUse: Jordan.','I live in Jordan.','Use in with the place where you live.','I live in ___.');
oral('origins','origins','Where are giraffes from?\nUse: Africa.','They are from Africa.','Giraffes → they. They takes are. The worksheet’s handwritten answer uses South Africa; that is also a suitable answer here.','They are from ___.');
mc('origins','origins','Choose the correct question.',['Where she is from?','Where is she from?'],'Where is she from?','After Where, put is before she.','Where + is + she + from?',true);
mc('origins','origins','Where ___ they from?',['am','is','are'],'are','Where are they from?','They takes are.',true);
oral('origins','origins','Where are they from?\nUse: Japan.','They are from Japan.','They’re from Japan is also correct.','They are from ___.',true);
oral('origins','origins','Answer negatively:\nIs she from Italy?','No, she isn’t.','No, she is not is also correct.','No, she ___.',true);

const first = 'Julian and Stephanie Fennessy are giraffe experts. They live in Namibia in Africa with their son, Luca and daughter, Molly. They aren’t from Namibia.';
const luca = 'Luca (twelve years old)\nWe help our parents with the giraffes. We use photos to see which giraffes are there. We know many giraffes because they all have different spots.';
const origins = 'Our family is from different places – my dad is from Australia, and my mum is from Germany.';
const molly = 'Molly (nine years old)\nGiraffes are cool. They are tall and their colours are beautiful. I like their soft noses. Melvin is the name of my favourite giraffe.';
const relatives = 'I like living here, but we don’t see our grandparents, uncles and aunts or cousins in Germany and Australia very often.';
function readMC(prompt:string, choices:string[], answer:string, explanation:string, excerpt:string, extra=false,pose?:string){mc('reading','reading',prompt,choices,answer,explanation,'Read the short passage above. Find the words that support your answer.',extra,{excerpt,story:'giraffe',pose})}
readMC('Who are Julian and Stephanie?',['Giraffe experts','Teachers','Children'],'Giraffe experts','The first sentence says they are giraffe experts.',first);
readMC('How old is Molly?',['Twelve','Nine','Ten'],'Nine','The heading says Molly is nine years old.',molly);
readMC('True or false?\nThe Fennessy family is from Namibia.',['True','False'],'False','They live in Namibia, but the passage says they aren’t from Namibia.',first);
readMC('True or false?\nLuca’s dad is from Australia.',['True','False'],'True','Luca says his dad is from Australia.',origins);
readMC('True or false?\nMelvin is Molly’s favourite giraffe.',['True','False'],'True','Molly says Melvin is her favourite giraffe.','Melvin is the name of my favourite giraffe.');
readMC('What does “They” refer to in “They are tall”?',['The parents','The giraffes','The photos'],'The giraffes','The sentence before it says “Giraffes are cool.” They refers to giraffes.',molly);
readMC('Find the word that means “a male child”.',['daughter','son','parents'],'son','A son is a male child.',first);
readMC('Find the opposite of “short”.',['soft','tall','beautiful'],'tall','Tall is the opposite of short when describing height.',molly);
readMC('Which word is a verb?',['parents','help','giraffes'],'help','Help is an action word: a verb.',luca);
readMC('Which word is a noun?',['parents','help','different'],'parents','Parents names people. It is a noun.',luca);
readMC('Which word is an adjective?',['They','soft','noses'],'soft','Soft describes the noses. It is an adjective.',molly);
readMC('Which word is a pronoun?',['They','giraffes','tall'],'They','They stands for the giraffes. It is a pronoun.',molly);
readMC('Where does the family live?',['Namibia','Germany','Japan'],'Namibia','They live in Namibia in Africa.',first,true);
readMC('How old is Luca?',['Nine','Twelve','Eleven'],'Twelve','The heading says Luca is twelve years old.',luca,true);
readMC('Where is Luca’s mum from?',['Australia','Germany','Namibia'],'Germany','Luca says his mum is from Germany.',origins,true);
readMC('Why can they recognise different giraffes?',['They all have different spots.','They all have the same spots.'],'They all have different spots.','Different spot patterns help them know which giraffe is which.',luca,true,'shock');
readMC('What do they use to see which giraffes are there?',['Books','Photos','Games'],'Photos','Luca says “We use photos”.',luca,true);
readMC('What does Molly like about giraffes’ noses?',['They are soft.','They are short.'],'They are soft.','Molly says “I like their soft noses.”',molly,true);
readMC('Do they see their grandparents very often?',['Yes, they do.','No, they don’t.'],'No, they don’t.','Molly says they don’t see their relatives very often.',relatives,true);
oral('reading','reading','Read these sentences aloud.','Tutor checks clear words, a steady pace and pauses at full stops.','This is oral reading practice. There is no single written answer to choose.','Read slowly. Pause at each full stop.',true,{excerpt:'Giraffes are cool. They are tall and their colours are beautiful. I like their soft noses.',story:'giraffe',pose:'reassuring'});

for (const [pronoun,answer,choices] of [
  ['I','my',['my','his','our']],['you','your',['her','your','their']],['he','his',['his','her','my']],['she','her',['their','his','her']],['it','its',['it’s','its','their']],['we','our',['your','our','my']],['they','their',['our','her','their']]
] as [string,string,string[]][]) mc('possessives','possessives',`Which possessive adjective goes with “${pronoun}”?`,choices,answer,`${pronoun} → ${answer}. Put ${answer} before a noun.`,'Think about who something belongs to.');
for (const [prompt,choices,answer,explanation] of [
  ['This bag belongs to me.\nThis is ___ bag.',['my','her','their'],'my','I → my. This is my bag.'],
  ['The ball belongs to him.\nThis is ___ ball.',['her','his','our'],'his','He → his. This is his ball.'],
  ['The book belongs to her.\nThat is ___ book.',['his','their','her'],'her','She → her. That is her book.'],
  ['The cat is in ___ bed.',['its','it’s','their'],'its','Its shows belonging. It’s means it is.'],
  ['The house belongs to us.\nThis is ___ house.',['my','our','your'],'our','We → our. This is our house.'],
  ['The bikes belong to them.\nThose are ___ bikes.',['their','his','our'],'their','They → their. Those are their bikes.'],
  ['Choose the complete sentence.',['This is my.','This is my pen.'],'This is my pen.','A possessive adjective comes before a noun. My pen is complete.']
] as [string,string[],string,string][]) mc('possessives','possessives',prompt,choices,answer,explanation,'Match the owner to the possessive adjective.');
mc('possessives','possessives','Sara has a cat.\n___ cat is black.',['My','Her','Their'],'Her','Sara → she → her. Her cat is black.','Sara is one girl.',true);
mc('possessives','possessives','Ali and I have a game.\nThis is ___ game.',['our','their','his'],'our','Ali and I → we → our.','Include yourself: we.',true);
mc('possessives','possessives','The children have books.\nThese are ___ books.',['his','their','my'],'their','The children → they → their.','More than one child: they.',true);
oral('possessives','possessives','Correct the sentence:\nThis is she bag.','This is her bag.','She → her before the noun bag.','Use the possessive adjective for she.',true);
oral('possessives','possessives','Correct the sentence:\nThe cat is in it’s bed.','The cat is in its bed.','Its means belonging to it. It’s means it is.','Which form shows belonging?',true,{pose:'caution'});

for (const [word,pattern,source] of [
  ['cake','a_e','longA'],['rain','ai','longA'],['train','ai','longA'],['plane','a_e','longA'],['snake','a_e','longA'],['game','a_e','longA'],['grain','ai','longA'],['sail','ai','longA'],['play','ay','longA'],['Friday','ay','bookPhonics'],['paint','ai','bookPhonics'],['holiday','ay','bookPhonics'],['tail','ai','bookPhonics'],['crayons','ay','bookPhonics']
]) mc('phonics',source,`Which long A spelling is in “${word}”?`,['a_e','ai','ay'],pattern,`${word} uses ${pattern} for the long A sound /eɪ/.`,'Say the word, then look at its letters.');
for (const [prompt,choices,answer,explanation] of [
  ['Children like to ___ outside.',['plai','play','plae'],'play','Play ends in ay.'],
  ['Complete the word: r__n',['ai','ay','ae'],'ai','r + ai + n → rain.'],
  ['Complete the word: b_k_',['ai','ay','a_e'],'a_e','b + a + k + e → bake. The final e is silent.'],
  ['Complete the spelling group:\nmake, take, ___',['train','bake','day'],'bake','Make, take and bake use a_e.'],
  ['Complete the spelling group:\nrain, train, ___',['play','game','paint'],'paint','Rain, train and paint use ai.']
] as [string,string[],string,string][]) mc('phonics','phonics',prompt,choices,answer,explanation,'Look for the spelling pattern: a_e, ai or ay.');
mc('phonics','phonics','Which word has the same ay spelling as Friday?',['tail','plane','holiday'],'holiday','Friday and holiday use ay. Tail and plane also have long A, but use different spellings. The worksheet’s “same sound” wording allows all three; this question asks about spelling.','Look at the ending of Friday.');
oral('phonics','bookPhonics','Say these words aloud:\nplane · game · train · paint · play · Friday','All six words contain the long A sound /eɪ/, as in the letter name A.','Listen for the same vowel sound with three different spellings.','Say the letter name A, then read each word.');
oral('phonics','phonics','Read this part of the story aloud.','Tutor checks the long A words: Jake, snail, play, May and Ray.','Pause at each full stop. Keep the long A sound clear.','Start slowly: “This is Jake.”',false,{excerpt:'This is Jake. Jake is a snail. Jake likes to play. Jake has two friends, May and Ray.',story:'jake',pose:'amused'});
mc('phonics','phonics','Find an ai word in this sentence.',['play','snail','Jake'],'snail','Snail uses ai. Play uses ay; Jake uses a_e.','Look for the letters a and i together.',true,{excerpt:'Jake is a snail. Jake likes to play.',story:'jake'});
mc('phonics','phonics','Which word belongs with play and day?',['stay','train','cake'],'stay','Play, day and stay all use ay.','Match the spelling pattern.',true);
oral('phonics','bookPhonics','Spell the word: snake.','s n a k e','Snake uses a_e: a + consonant + silent e.','It starts with sn and ends with a silent e.',true);

for (const [prompt,choices,answer,explanation] of [
  ['Choose the correct capitals.',['we are going to the park.','We are going to the park.'],'We are going to the park.','Use a capital letter at the start of a sentence.'],
  ['Choose the correct capitals.',['My friend Sara is kind.','My friend sara is kind.'],'My friend Sara is kind.','Sara is a person’s name.'],
  ['Choose the correct capitals.',['We live in new york.','We live in New York.'],'We live in New York.','Use capitals for place names: New York.'],
  ['Choose the correct capitals.',['I like to read books.','i like to read books.'],'I like to read books.','The pronoun I is always a capital letter.'],
  ['Choose the correct capitals.',['We have music class on monday.','We have music class on Monday.'],'We have music class on Monday.','Days of the week begin with capital letters.'],
  ['Choose the correct capitals.',['My birthday is in December.','My birthday is in december.'],'My birthday is in December.','Months of the year begin with capital letters.']
] as [string,string[],string,string][]) mc('capitals','capitals',prompt,choices,answer,explanation,'Check the sentence start, names, places, I, days and months.');
oral('capitals','capitals','Say the sentence correctly and tell me which letters need capitals:\nmy name is anna.','My name is Anna.','Capital M starts the sentence. Anna is a person’s name, so use capital A.','There are two capital letters.');
oral('capitals','capitals','Correct the capital letters:\nwe went to paris last summer.','We went to Paris last summer.','Capital W starts the sentence. Paris is a place name.','Check the first word and the city.');
oral('capitals','capitals','Correct the capital letters:\ni have piano class on tuesday.','I have piano class on Tuesday.','The pronoun I and the day Tuesday need capitals.','Check I and the day.');
oral('capitals','capitals','Correct the capital letters:\nsara is from japan.','Sara is from Japan.','Sara is a person’s name. Japan is a country name.','Find the person and the country.',true);
oral('capitals','capitals','Correct the capital letters:\nmy birthday is in may.','My birthday is in May.','Capital M starts the sentence. May is a month.','Find the sentence start and the month.',true);

oral('writing','writing','Tell your friend one thing:\nWhere do you live?','Example: I live in Jordan.','Use the place that is true for you. Start with capital I and finish with a full stop.','I live in ___.',true);
oral('writing','writing','Tell your friend one thing about your country.','Example: My country is beautiful.','Other simple, true descriptions are acceptable. Use a capital letter and a full stop.','My country is ___.',true);
oral('writing','writing','Tell your friend about a food from your country.','Example: A food from my country is mansaf.','This is an example based on the worksheet. Choose a food that fits your own country.','A food from my country is ___.',true);
oral('writing','writing','Tell a friend three things about your country.','Example: I live in Jordan.\nMy country is beautiful.\nA food from my country is mansaf.','Use your own true facts. Check capitals, spaces and full stops.','Think: where I live · what my country is like · a food.');
oral('writing','writing','Say three sentences about your country without the sentence starters.','Tutor checks: three simple facts, clear sentences, capital letters and full stops.','Accept any three suitable facts. Ask Laith which letters he would capitalise.','You can talk about your country, a city or a food.',true,{pose:'proud'});
