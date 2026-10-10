


const topics          = [
  {id:'words',title:'Words & meanings',icon:'Aa',subtitle:'Family words, actions and describing words'},
  {id:'world',title:'Around the world',icon:'◎',subtitle:'Continents, countries and worksheet clues'},
  {id:'be',title:'Am, is & are',icon:'?',subtitle:'Statements, negatives and short answers'},
  {id:'origins',title:'Where are you from?',icon:'↗',subtitle:'Ask and answer about places'},
  {id:'reading',title:'The giraffe family',icon:'▤',subtitle:'Read, find facts and explain words'},
  {id:'parrots',title:'The parrot family',icon:'▤',subtitle:'New reading · Brazil, parrots and school'},
  {id:'tokyo',title:'A new home in Tokyo',icon:'▤',subtitle:'New reading · city, school and family'},
  {id:'possessives',title:'My, your, his, her…',icon:'↔',subtitle:'Show who something belongs to'},
  {id:'phonics',title:'Long A sounds',icon:'ā',subtitle:'Read and spell a_e, ai and ay'},
  {id:'capitals',title:'Capital letters',icon:'A',subtitle:'Names, places and sentence beginnings'},
  {id:'writing',title:'Tell me about your country',icon:'✎',subtitle:'Build three simple sentences'}
];
const sources                                  = {
  words:['Revision p. 2 · Vocabulary','page-06'], actions:['Revision vocabulary continuation · Page number not visible','page-25'],
  world:['Revision p. 4 · Continents and countries','page-11'], clues:['Revision p. 5 · Country clues and vocabulary','page-21'],
  be:['Revision p. 6 · The verb to be','page-24'], origins:['Revision p. 7 · Where? / Origins','page-04'],
  reading:['Revision p. 8 · Reading comprehension','page-07'], possessives:['Revision p. 9 · Possessive adjectives','page-19'],
  longA:['Revision p. 11 · Long A','page-13'], phonics:['Revision p. 12 · Phonics and Jake story','page-10'],
  bookPhonics:['Classbook p. 15 · Long A phonics','page-01'], capitals:['Revision p. 13 · Capitalisation','page-15'], writing:['Revision p. 14 · Three facts about your country','page-27']
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
It was fun, all the way.`},
  // Extra readings modelled on the giraffe page: same structure, present simple and be, worksheet vocabulary,
  // and exactly two new words each (count, feathers; garden, summer).
  parrots: {title:'The parrot family', text:`Carlos and Ana Silva are parrot experts. They live in Brazil in South America with their son, Pedro and daughter, Sofia. They aren’t from Brazil. They are from Spain. They live there because of the parrots.

Pedro (ten years old)
We help our parents with the parrots. We count the parrots every Friday. We know many parrots because they all have different colours. The school bus arrives at 7:00 AM.

Sofia (eight years old)
Parrots are friendly. They are small and their feathers are green, red and blue. I like their long tails. Kiki is the name of my favourite parrot. I like living here, but we don’t see our grandparents and cousins in Spain very often.`},
  tokyo: {title:'A new home in Tokyo', text:`Omar and Lina Haddad are English teachers. They live in Tokyo in Japan with their son, Sami and daughter, Huda. They aren’t from Japan. They are from Jordan. Their school is in Tokyo.

Sami (eleven years old)
I go to a big school in Tokyo. My classmates are friendly. We play football after school every Friday. Japanese is a difficult language, but I learn new words every day.

Huda (seven years old)
Tokyo is a beautiful city. Our house is small, but our garden is green. I like eating sushi with my dad. We travel to Jordan every summer because our grandparents and cousins live there.`}
};
const questions             = [];
function add(topic         , sourceKey        , prompt        , choices                      , answer        , explanation        , hint        , extra=false, detail                    = {}) {
  const [source, suffix] = sources[sourceKey];
  questions.push({id:`${topic}-${questions.filter(q=>q.topic===topic).length+1}`, topic, prompt, choices, answer, explanation, hint, source, photo:`assets/pages/${suffix}.webp`, extra, ...detail});
}
function mc(topic         , source        , prompt        , choices          , answer        , explanation        , hint        , extra=false, detail                   ={}) {add(topic,source,prompt,choices,answer,explanation,hint,extra,detail)}
function oral(topic         , source        , prompt        , answer        , explanation        , hint        , extra=false, detail                   ={}) {add(topic,source,prompt,undefined,answer,explanation,hint,extra,detail)}

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
]                                     ) mc('words','clues',prompt,choices,answer,explanation,'Choose the word that makes sense in this sentence.');
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
]                              ) mc('world','world',`Which continent matches ${country}?`,options,continent,`${country} → ${continent} (using the worksheet’s continent labels).`,'Think about the country’s place on the world map.');
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
]                              ) mc('world','clues',`In the worksheet, which country matches the ${clue} picture?`,choices,answer,`The worksheet pairs this picture with ${answer}. This is a picture clue, not something found only in that country.`,'Recall the picture-and-country pairs on revision page 5.');
oral('world','world','Say and spell: South America.','South America','Use capital S and capital A. There is a space between the words.','It has two words.',true);

for (const [pronoun,answer,extra] of [['I','am',false],['He','is',false],['She','is',false],['It','is',false],['You','are',false],['We','are',false],['They','are',false]]                             ) mc('be','be',`${pronoun} ___ at home.`,['am','is','are'],answer,`${pronoun} ${answer} at home.`,'I → am. He / she / it → is. You / we / they → are.',extra);
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
]                                     ) mc('be','be',prompt,choices,answer,explanation,'Check the pronoun, then choose am, is or are.');
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
function readMC(prompt       , choices         , answer       , explanation       , excerpt       , extra=false,pose        ){mc('reading','reading',prompt,choices,answer,explanation,'Read the short passage above. Find the words that support your answer.',extra,{excerpt,story:'giraffe',pose})}
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

// New readings: the same question types as the giraffe page. Each answer points to one sentence of evidence.
function readNew(topic                  ,prompt       ,choices         ,answer       ,explanation       ,excerpt       ,evidence       ,pose        ){mc(topic,'reading',prompt,choices,answer,explanation,'Read the short passage above. Find the words that support your answer.',true,{excerpt,story:topic,evidence,pose})}
const parrotFirst='Carlos and Ana Silva are parrot experts. They live in Brazil in South America with their son, Pedro and daughter, Sofia. They aren’t from Brazil. They are from Spain.';
const pedro='Pedro (ten years old)\nWe help our parents with the parrots. We count the parrots every Friday. We know many parrots because they all have different colours.';
const sofia='Sofia (eight years old)\nParrots are friendly. They are small and their feathers are green, red and blue. I like their long tails.';
readNew('parrots','Who are Carlos and Ana?',['Parrot experts','Teachers','Children'],'Parrot experts','The first sentence says they are parrot experts.',parrotFirst,'Carlos and Ana Silva are parrot experts.');
readNew('parrots','How old is Sofia?',['Ten','Eight','Nine'],'Eight','The heading says Sofia is eight years old.',sofia,'Sofia (eight years old)');
readNew('parrots','True or false?\nThe Silva family is from Brazil.',['True','False'],'False','They live in Brazil, but they aren’t from Brazil. They are from Spain.',parrotFirst,'They aren’t from Brazil.');
readNew('parrots','Where are Carlos and Ana from?',['Brazil','Spain','Japan'],'Spain','The passage says “They are from Spain.”',parrotFirst,'They are from Spain.');
readNew('parrots','True or false?\nThey count the parrots every Friday.',['True','False'],'True','Pedro says “We count the parrots every Friday.”',pedro,'We count the parrots every Friday.');
readNew('parrots','What does “count” mean?',['Find how many there are','Play a game'],'Find how many there are','When you count, you say 1, 2, 3… to find how many.',pedro,'We count the parrots every Friday.');
readNew('parrots','Why do they know many parrots?',['They all have different colours.','They all have the same colours.'],'They all have different colours.','Different colours help them know which parrot is which.',pedro,'We know many parrots because they all have different colours.','shock');
readNew('parrots','What does “They” refer to in “They are small”?',['The parents','The parrots','The feathers'],'The parrots','The sentence before it says “Parrots are friendly.” They refers to the parrots.',sofia,'They are small and their feathers are green, red and blue.');
readNew('parrots','What are feathers?',['The soft parts that cover a bird','A bird’s home'],'The soft parts that cover a bird','Birds have feathers. Sofia says the feathers are green, red and blue.',sofia,'They are small and their feathers are green, red and blue.');
readNew('parrots','Find the opposite of “short”.',['long','small','friendly'],'long','Long is the opposite of short. Sofia likes their long tails.',sofia,'I like their long tails.');
readNew('parrots','Find the word that means “a female child”.',['son','daughter','parents'],'daughter','A daughter is a female child.',parrotFirst,'They live in Brazil in South America with their son, Pedro and daughter, Sofia.');
readNew('parrots','Which word is a verb?',['count','parrots','Friday'],'count','Count is an action word: a verb.',pedro,'We count the parrots every Friday.');
readNew('parrots','Which word is an adjective?',['friendly','Parrots','are'],'friendly','Friendly describes the parrots. It is an adjective.',sofia,'Parrots are friendly.');
readNew('parrots','When does the school bus arrive?',['At 7:00 AM','At 9:00 AM'],'At 7:00 AM','Pedro says “The school bus arrives at 7:00 AM.”','The school bus arrives at 7:00 AM.','The school bus arrives at 7:00 AM.');
oral('parrots','reading','Read these sentences aloud.','Tutor checks clear words, a steady pace and pauses at full stops.','This is oral reading practice. There is no single written answer to choose.','Read slowly. Pause at each full stop.',true,{excerpt:'Parrots are friendly. They are small and their feathers are green, red and blue. I like their long tails.',story:'parrots',pose:'reassuring',evidence:'Parrots are friendly. They are small.'});

const tokyoFirst='Omar and Lina Haddad are English teachers. They live in Tokyo in Japan with their son, Sami and daughter, Huda. They aren’t from Japan. They are from Jordan.';
const sami='Sami (eleven years old)\nI go to a big school in Tokyo. My classmates are friendly. We play football after school every Friday. Japanese is a difficult language, but I learn new words every day.';
const huda='Huda (seven years old)\nTokyo is a beautiful city. Our house is small, but our garden is green. I like eating sushi with my dad.';
const summer='We travel to Jordan every summer because our grandparents and cousins live there.';
readNew('tokyo','Who are Omar and Lina?',['English teachers','Parrot experts','Children'],'English teachers','The first sentence says they are English teachers.',tokyoFirst,'Omar and Lina Haddad are English teachers.');
readNew('tokyo','How old is Sami?',['Seven','Eleven','Twelve'],'Eleven','The heading says Sami is eleven years old.',sami,'Sami (eleven years old)');
readNew('tokyo','True or false?\nThe Haddad family is from Japan.',['True','False'],'False','They live in Japan, but they aren’t from Japan. They are from Jordan.',tokyoFirst,'They aren’t from Japan.');
readNew('tokyo','Where is the Haddad family from?',['Japan','Jordan','Spain'],'Jordan','The passage says “They are from Jordan.”',tokyoFirst,'They are from Jordan.');
readNew('tokyo','True or false?\nSami’s classmates are friendly.',['True','False'],'True','Sami says “My classmates are friendly.”',sami,'My classmates are friendly.');
readNew('tokyo','When do they play football?',['Every Friday','Every Sunday'],'Every Friday','Sami says “We play football after school every Friday.”',sami,'We play football after school every Friday.');
readNew('tokyo','Is Japanese an easy language for Sami?',['Yes, it is.','No, it isn’t.'],'No, it isn’t.','Sami says Japanese is a difficult language. Difficult means not easy.',sami,'Japanese is a difficult language, but I learn new words every day.');
readNew('tokyo','Find the opposite of “easy”.',['difficult','friendly','new'],'difficult','Difficult means not easy.',sami,'Japanese is a difficult language, but I learn new words every day.');
readNew('tokyo','What is a garden?',['Land next to a house with grass and plants','A room in a school'],'Land next to a house with grass and plants','A garden is next to a house. Huda says their garden is green.',huda,'Our house is small, but our garden is green.');
readNew('tokyo','What is summer?',['The hot time of the year','A big city'],'The hot time of the year','Summer is the hot time of the year, when school is closed.',summer,'We travel to Jordan every summer because our grandparents and cousins live there.');
readNew('tokyo','What does “there” refer to in “our grandparents and cousins live there”?',['Tokyo','Jordan','The garden'],'Jordan','There means Jordan, the place in the same sentence.',summer,'We travel to Jordan every summer because our grandparents and cousins live there.');
readNew('tokyo','Which word is a noun?',['garden','green','small'],'garden','Garden names a place. It is a noun.',huda,'Our house is small, but our garden is green.');
readNew('tokyo','Which word is a verb?',['travel','summer','Jordan'],'travel','Travel is an action word: a verb.',summer,'We travel to Jordan every summer because our grandparents and cousins live there.');
readNew('tokyo','Which word is an adjective?',['beautiful','Tokyo','city'],'beautiful','Beautiful describes the city. It is an adjective.',huda,'Tokyo is a beautiful city.');
oral('tokyo','reading','Read these sentences aloud.','Tutor checks clear words, a steady pace and pauses at full stops.','This is oral reading practice. There is no single written answer to choose.','Read slowly. Pause at each full stop.',true,{excerpt:'Tokyo is a beautiful city. Our house is small, but our garden is green. I like eating sushi with my dad.',story:'tokyo',pose:'reassuring',evidence:'Tokyo is a beautiful city.'});

for (const [pronoun,answer,choices] of [
  ['I','my',['my','his','our']],['you','your',['her','your','their']],['he','his',['his','her','my']],['she','her',['their','his','her']],['it','its',['it’s','its','their']],['we','our',['your','our','my']],['they','their',['our','her','their']]
]                              ) mc('possessives','possessives',`Which possessive adjective goes with “${pronoun}”?`,choices,answer,`${pronoun} → ${answer}. Put ${answer} before a noun.`,'Think about who something belongs to.');
for (const [prompt,choices,answer,explanation] of [
  ['This bag belongs to me.\nThis is ___ bag.',['my','her','their'],'my','I → my. This is my bag.'],
  ['The ball belongs to him.\nThis is ___ ball.',['her','his','our'],'his','He → his. This is his ball.'],
  ['The book belongs to her.\nThat is ___ book.',['his','their','her'],'her','She → her. That is her book.'],
  ['The cat is in ___ bed.',['its','it’s','their'],'its','Its shows belonging. It’s means it is.'],
  ['The house belongs to us.\nThis is ___ house.',['my','our','your'],'our','We → our. This is our house.'],
  ['The bikes belong to them.\nThose are ___ bikes.',['their','his','our'],'their','They → their. Those are their bikes.'],
  ['Choose the complete sentence.',['This is my.','This is my pen.'],'This is my pen.','A possessive adjective comes before a noun. My pen is complete.']
]                                     ) mc('possessives','possessives',prompt,choices,answer,explanation,'Match the owner to the possessive adjective.');
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
]                                     ) mc('phonics','phonics',prompt,choices,answer,explanation,'Look for the spelling pattern: a_e, ai or ay.');
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
]                                     ) mc('capitals','capitals',prompt,choices,answer,explanation,'Check the sentence start, names, places, I, days and months.');
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


const splitWords=(text       )=>text.trim().split(/\s+/);
const illustrations = {
  family: {src:'assets/illustrations/family.webp',alt:'Two grandparents, two parents, a son and a daughter standing together.'},
  giraffes: {src:'assets/illustrations/giraffes.webp',alt:'Two giraffes with long necks and different spot patterns.'},
  arrival: {src:'assets/illustrations/arrival.webp',alt:'A bus has arrived at school. A child steps out onto the pavement.'}
};
function illustrationFor(q         )                                         {
  if(q.topic==='words'){
    if(/“(?:grandparents|parents|son|daughter)”/.test(q.prompt)||['parents','daughter'].includes(q.answer))return 'family';
    if(/“(?:arrive|travel)”/.test(q.prompt)||['arrive','travel'].includes(q.answer))return 'arrival';
  }
  if(q.topic==='world'&&/giraffe picture/.test(q.prompt))return 'giraffes';
  if(q.topic==='reading'&&/giraffes|giraffe|noses|spots|tall|short|pronoun|refer to|Read these sentences/.test(q.prompt)&&!/Who are Julian/.test(q.prompt))return 'giraffes';
  return undefined;
}
function conceptFor(q         )         {
  const concept=(title       ,before         ,after         ,focus         ,caption       ,movement                    ='move')        =>({title,before,after,focus,caption,movement});
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
    const p=q.prompt.match(/goes with “([^”]+)”/);const map                      ={I:'my',you:'your',he:'his',she:'her',it:'its',we:'our',they:'their'};
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
    const pattern=ai>=0?'ai':ay>=0?'ay':'a_e';
    return {...concept('Long A',tokens,tokens,focus,`${word}: hear the letter name A. ${pattern} makes the long A sound.`,'fade'),phonics:pattern};
  }
  if(q.topic==='capitals'){
    const correct=q.answer;const before=q.choices?.find(c=>c!==correct)||q.prompt.split('\n').at(-1) ;
    const after=splitWords(correct);const initial=splitWords(before);
    return concept('Capital letters',initial,after,after.flatMap((t,i)=>t!==initial[i]?[i]:[]),'Check the start, names, places, I, days and months.');
  }
  if(q.topic==='origins')return concept('Where asks about a place',['Where','is','she','from?'],['She','is','from','Italy.'],[3],'Where? → A place. This is an example.','fall');
  if((q.topic==='parrots'||q.topic==='tokyo')&&q.evidence){
    // New readings highlight the evidence sentence, or the target word inside it.
    const words=splitWords(q.evidence);
    if(/Read these sentences/.test(q.prompt))return concept('Read with pauses',words,words,words.map((w,i)=>/\.$/.test(w)?i:-1).filter(i=>i>=0),'Pause at each full stop.','fade');
    const target=(/refer to/.test(q.prompt)?q.prompt.match(/“(\w+)”/)?.[1]:q.answer) .toLowerCase();
    const at=words.findIndex(w=>w.replace(/[^A-Za-z’']/g,'').toLowerCase()===target);
    const title=/refer to/.test(q.prompt)?'A pronoun replaces a noun':/verb/.test(q.prompt)?'An action word':/noun/.test(q.prompt)?'A naming word':/adjective|opposite/.test(q.prompt)?'A describing word':'Find the evidence';
    if(at>=0&&title!=='Find the evidence')return concept(title,words,words,[at],q.explanation,'fade');
    return concept('Find the evidence',words,words,words.map((_,i)=>i),'Read the passage. Find words that support your answer.','fade');
  }
  if(q.topic==='reading'){
    if(/pronoun|refer to/.test(q.prompt))return concept('A pronoun replaces a noun',['Giraffes','are','tall.'],['They','are','tall.'],[0],'They refers to the giraffes.');
    if(/verb/.test(q.prompt))return concept('An action word',['We','help','our','parents.'],['We','help','our','parents.'],[1],'Help is an action word: a verb.','fade');
    if(/adjective|opposite/.test(q.prompt))return concept('A describing word',['Giraffes','are','tall.'],['Giraffes','are','tall.'],[2],'Tall describes giraffes. Tall is the opposite of short.','fade');
    if(/noun/.test(q.prompt))return concept('A naming word',['We','help','our','parents.'],['We','help','our','parents.'],[3],'Parents names people. It is a noun.','fade');
    const fact=/Julian/.test(q.prompt)?'Julian and Stephanie are giraffe experts.':/Luca.*(?:old|dad)|dad/.test(q.prompt)?'Luca’s dad is from Australia.':/mum/.test(q.prompt)?'Luca’s mum is from Germany.':/spots|recognise/.test(q.prompt)?'Giraffes have different spots.':/photos|use/.test(q.prompt)?'We use photos.':/noses/.test(q.prompt)?'Their noses are soft.':/grandparents/.test(q.prompt)?'We don’t see our grandparents very often.':/Melvin/.test(q.prompt)?'Melvin is Molly’s favourite giraffe.':/Namibia|live/.test(q.prompt)?'They live in Namibia. They aren’t from Namibia.':/male child/.test(q.prompt)?'A son is a male child.':/old is Luca/.test(q.prompt)?'Luca is twelve years old.':'Molly is nine years old.';
    if(!/Read these sentences/.test(q.prompt))return concept('Find the evidence',splitWords(fact),splitWords(fact),splitWords(fact).map((_,i)=>i),'Read the passage. Find words that support your answer.','fade');
    return concept('Read with pauses',['Giraffes','are','cool.','They','are','tall.'],['Giraffes','are','cool.','They','are','tall.'],[2,5],'Pause at each full stop.','fade');
  }
  if(q.topic==='world'){
    const clue=q.prompt.match(/which country matches the (.+) picture/);
    if(clue)return concept('Picture clue',[clue[1],'→','___'],[clue[1],'→',q.answer],[2],'This is the picture-and-country pair in your worksheet.','fade');
    const country=q.prompt.match(/continent matches (.+)\?/);
    if(country)return concept('Country → continent',[country[1],'→','___'],[country[1],'→',q.answer],[2],'A country is in a continent. Use the worksheet’s labels.','fall');
    return concept('Country and continent',['Brazil','→','___'],['Brazil','→','South America'],[2],'Brazil is a country. South America is a continent. This is an example.','fall');
  }
  if(q.topic==='writing')return concept('Build a simple sentence',['I','live','in','…'],['I','live','in','Jordan.'],[0,3],'An example: start with a capital and end with a full stop. Use your own place.','fall');
  const word=q.prompt.match(/“([^”]+)”/)?.[1]||(/Which word is a verb/.test(q.prompt)?'arrive':['arrive','daughter','Tokyo','parents','difficult','friendly','travel'].includes(q.answer)?q.answer:'friendly');
  const meanings                      ={grandparents:'Your mum’s or dad’s parents',parents:'Mother and father',son:'A male child',daughter:'A female child',Friday:'Thursday → Friday → Saturday',game:'A fun activity or sport',friendly:'Kind and nice',difficult:'Not easy',arrive:'Get to a place',travel:'Go to another place',Tokyo:'A city in Japan'};
  return concept('Word and meaning',[word,'→','…'],[word,'→',meanings[word]||'Kind and nice'],[2],'Say the word, then say its meaning.','fade');
}

// A one-day gap is a practical review schedule, not a claim of mastery.
const reviewDelay = 24 * 60 * 60 * 1000;



function recordPractice(previous                       ,event              ,now       )              {
  const delayed=!!previous && now-previous.last>=reviewDelay;
  const supported=event!=='correct'||!!previous?.supported&&!delayed;
  const remembered=event==='correct'&&!!previous?.pending&&delayed&&!supported;
  return {pending:remembered?false:(previous?.pending||event!=='correct'),last:now,supported,
    outcome:event!=='correct'?'practice':remembered?'remembered':supported?'supported':'unaided',
    remembered:remembered?now:previous?.remembered||0};
}
function recordLesson(previous                       ,event              ,recall             )              {
  return {correct:!!previous?.correct||event==='correct',supported:!!previous?.supported||recall.supported,
    missed:!!previous?.missed||event==='retry',revealed:!!previous?.revealed||event==='revealed',
    remembered:!!previous?.remembered||recall.outcome==='remembered'};
}

// Interactive lessons: one rule per lesson, shown with a model, a second example, a turn for Laith and a one-line summary.
// Worked examples use parallel sentences; the question's own sentence appears only in the practice step.



// gap: choose the word for the gap · pick: choose the right tile · place: put the lifted tile in the right slot · say: answer aloud, then show.



const autoRoles                            = {i:'who',you:'who',he:'who',she:'who',it:'who',we:'who',they:'who',am:'be',is:'be',are:'be','’m':'be','’s':'be','’re':'be',not:'not','isn’t':'be','aren’t':'be',my:'own',your:'own',his:'own',her:'own',its:'own',our:'own',their:'own',where:'q'};

// "He/who is at home." → tiles. word/role#id sets a role and a stable id; _ joins words; | breaks the line; ___ is a gap.
// Tiles keep their id between steps, so a word that changes or moves animates instead of reappearing.
function lessonTiles(spec       , auto=true)              {
  const out              = []; const seen = new Map               ();
  const id = (base       )=>{const n=(seen.get(base)||0)+1;seen.set(base,n);return n===1?base:`${base}${n}`};
  for (const token of spec.trim().split(/\s+/)) {
    if (token==='|') {out.push({id:id('br'),text:'',br:true});continue}
    const gap = token.match(/^___([.?!,]?)$/);
    if (gap) {out.push({id:'gap',text:'',gap:true});if(gap[1])out.push({id:id('end'),text:gap[1]});continue}
    const m = token.match(/^(.+?)(?:\/(\w+))?(?:#([\w’]+))?([.?!,:]?)$/) ;
    const text = m[1].replace(/_/g,' '); const lower = text.toLowerCase();
    const role = (m[2]                        ) || (auto ? autoRoles[lower] : undefined);
    out.push({id:m[3] || id(role&&!m[2]&&auto&&autoRoles[lower] ? role : lower.replace(/[’\s]/g,'')), text, role, join:text.startsWith('’')});
    if (m[4]) out.push({id:m[4]===','?id('comma'):m[4]===':'?id('colon'):id('end'), text:m[4]});
  }
  // "belongs to her." uses her as an object, not a possessive: keep it uncoloured.
  return out.map((t,i)=>t.text.toLowerCase()==='her'&&!t.id.startsWith('her')&&/^[.?!,]$/.test(out[i+1]?.text||'')?{...t,role:undefined}:t);
}
const lessonLine = (q         , pattern       )=>q.prompt.split('\n').find(line=>pattern.test(line));
const lastLine = (q         )=>q.prompt.split('\n').at(-1) ;
const optionTiles = (choices         , auto=false)=>choices.map((c,i)=>({id:`option${i}`,text:c,role:auto?autoRoles[c.toLowerCase()]:undefined}));

// The practice step always uses the question itself.
function practiceFor(q         , caption       , auto=true, context        , pickRole            )                {
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

function lessonFor(q         )                  {
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

function beLesson(q         )        {
  return {kind:'be',title:'Am, is or are?',steps:[
    {caption:'I goes with am.',tiles:lessonTiles('I am happy.')},
    {caption:'He, she and it go with is.',tiles:lessonTiles('She is happy.')},
    {caption:'You, we and they go with are.',tiles:lessonTiles('They are happy.')}
  ],practice:practiceFor(q,'Your turn: which word fits?'),
  rule:'I → am · he, she, it → is · you, we, they → are',example:lessonTiles('We are happy.')};
}
function negativeLesson(q         )        {
  const sentence = lastLine(q).replace(/^Make it negative: /,'');
  const tiles = lessonTiles(sentence); const be = tiles.findIndex(t=>t.role==='be');
  return {kind:'negative',title:'Saying no with not',steps:[
    {caption:'A sentence with is.',tiles:lessonTiles('She is happy.')},
    {caption:'Put not after am, is or are.',tiles:lessonTiles('She is not happy.')},
    {caption:'Not comes after are.',tiles:lessonTiles('We are at school.'),then:lessonTiles('We are not at school.')}
  ],practice:{mode:'place',caption:'Your turn: where does not go?',tiles,options:[{id:'not',text:'not',role:'not'}],answer:'not',slot:be+1,after:lessonTiles(q.answer)},
  rule:'Put not after am / is / are.',example:lessonTiles('He is not at home.')};
}
function questionLesson(q         )        {
  let practice               ;
  const statement = lastLine(q).match(/^(?:Make a question: )?((?:I|He|She|It|You|We|They) (?:am|is|are) .+\.)$/)?.[1];
  if (statement) {
    const tiles = lessonTiles(statement); const be = tiles.find(t=>t.role==='be') ;
    practice = {mode:'place',caption:'Your turn: where does '+be.text+' go?',tiles:tiles.filter(t=>t!==be),options:[be],answer:be.text,slot:0,after:lessonTiles(q.answer)};
  } else practice = practiceFor(q,'Your turn: which word starts the question?');
  return {kind:'question',title:'Making a question',steps:[
    {caption:'A sentence.',tiles:lessonTiles('She is happy.')},
    {caption:'Move is to the front. End with ?',tiles:lessonTiles('Is she happy?')},
    {caption:'Are moves to the front too.',tiles:lessonTiles('They are at school.'),then:lessonTiles('Are they at school?')}
  ],practice,rule:'Question: am / is / are goes first.',example:lessonTiles('Is he at home?')};
}
function shortAnswerLesson(q         )        {
  const question = q.prompt.split('\n').find(line=>/\?$/.test(line)&&!/___/.test(line));
  return {kind:'short-answer',title:'Short answers',steps:[
    {caption:'A yes / no question.',tiles:lessonTiles('Is she happy?')},
    {caption:'Yes + she + is.',tiles:lessonTiles('Yes, she is.')},
    {caption:'No + they + are + not.',tiles:lessonTiles('Are they at school?'),then:lessonTiles('No, they are not.')}
  ],practice:practiceFor(q,'Your turn: choose the answer.',true,question),
  rule:'Yes, he is. · No, he isn’t.',example:lessonTiles('No, she isn’t.')};
}
function shortFormLesson(q         )        {
  const words = q.prompt.match(/means “([^”]+)”/)?.[1]||'I am';
  return {kind:'short-form',title:'Short forms',steps:[
    {caption:'Two words.',tiles:lessonTiles('I am')},
    {caption:'They join. ’ shows the missing letter.',tiles:lessonTiles('I ’m/be#be')},
    {caption:'They are → they’re.',tiles:lessonTiles('They are'),then:lessonTiles('They ’re/be#be')}
  ],practice:practiceFor(q,'Your turn: choose the short form.',true,words),
  rule:'I am → I’m · he is → he’s · they are → they’re',example:lessonTiles('She ’s/be#be')};
}
function whereLesson(q         )        {
  const question = q.prompt.split('\n').find(line=>/^Where .+\?$/.test(line));
  return {kind:'where',title:'Where … from?',steps:[
    {caption:'A place.',tiles:lessonTiles('He is from Spain/mark#place.')},
    {caption:'Ask about the place with Where. Is goes before he.',tiles:lessonTiles('Where/q#place is he from?')},
    {caption:'The same with are.',tiles:lessonTiles('They are from Brazil/mark#place.'),then:lessonTiles('Where/q#place are they from?')}
  ],practice:practiceFor(q,'Your turn.',true,question),
  rule:'Where + am / is / are + person + from?',example:lessonTiles('Where are you from?')};
}
function possessiveLesson(q         )        {
  const owner = q.prompt.match(/goes with “([^”]+)”/)?.[1];
  const practice = owner ? {...practiceFor(q,'Your turn: which word shows belonging?'),mode:'gap'         ,tiles:lessonTiles(`${owner} → ___`),options:optionTiles(q.choices ,true),after:lessonTiles(`${owner} → ${q.answer}`)}
    : practiceFor(q,'Your turn: which word fits?',true,/Correct the sentence/.test(q.prompt)?lastLine(q):undefined);
  return {kind:'possessive',title:'My, your, his, her…',steps:[
    {caption:'The bag belongs to me.',tiles:lessonTiles('The bag belongs to me/who#me.')},
    {caption:'me → my. My goes before the thing.',tiles:lessonTiles('This is my#me bag.')},
    {caption:'him → his.',tiles:lessonTiles('The ball belongs to him/who#him.'),then:lessonTiles('This is his#him ball.')}
  ],practice,rule:'I → my · you → your · he → his · she → her · it → its · we → our · they → their',example:lessonTiles('This is our house.')};
}
function capitalTiles(sentence       )              {
  // Changed letters become capitals in place: the tile id stays the lower-case word.
  return lessonTiles(sentence,false).map(t=>t.text!==t.text.toLowerCase()&&!/^[.?!,]$/.test(t.text)?{...t,role:'cap'         }:t);
}
function capitalsLesson(q         )        {
  const wrong = /\n/.test(q.prompt) ? lastLine(q) : undefined;
  let practice               ;
  if (wrong) practice = {mode:'say',caption:'Your turn: which letters need capitals?',tiles:lessonTiles(wrong,false),options:[],answer:q.answer,after:capitalTiles(q.answer)};
  else practice = practiceFor(q,'Your turn: which sentence is correct?',false);
  return {kind:'capitals',title:'Capital letters',steps:[
    {caption:'Look at the first letters.',tiles:lessonTiles('my friend is omar.',false)},
    {caption:'Capitals: the first word and names.',tiles:capitalTiles('My friend is Omar.')},
    {caption:'Capitals: I and days of the week.',tiles:lessonTiles('i play on friday.',false),then:capitalTiles('I play on Friday.')}
  ],practice,rule:'Capitals: the first word, I, names, places, days and months.',example:capitalTiles('Sara is from Japan.')};
}
function wordClassLesson(q         )        {
  const kind = q.prompt.match(/(verb|noun|adjective)/) [1];
  const role            = kind==='verb'?'verb':kind==='noun'?'noun':'adj';
  return {kind:'word-class',title:'Nouns, verbs and adjectives',steps:[
    {caption:'Every word has a job.',tiles:lessonTiles('Molly likes soft noses.',false)},
    {caption:'Noun: a person, place or thing. Verb: an action. Adjective: describes.',tiles:lessonTiles('Molly/noun likes/verb soft/adj noses/noun.',false)},
    {caption:'Try another sentence.',tiles:lessonTiles('We help our parents.',false),then:lessonTiles('We help/verb our parents/noun.',false)}
  ],practice:practiceFor(q,`Your turn: which word is ${kind==='adjective'?'an':'a'} ${kind}?`,false,undefined,role),
  rule:'Noun: a thing · Verb: an action · Adjective: describes',example:lessonTiles('Parrots/noun are friendly/adj.',false)};
}
function pronounLesson(q         )        {
  const quoted = q.prompt.match(/in “([^”]+)”/)?.[1];
  return {kind:'pronoun',title:'Pronouns point back',steps:[
    {caption:'A noun.',tiles:lessonTiles('Giraffes/noun#g are cool.')},
    {caption:'They replaces giraffes.',tiles:lessonTiles('They/who#g are cool.')},
    {caption:'She replaces Molly.',tiles:lessonTiles('Molly/noun#m is nine.'),then:lessonTiles('She/who#m is nine.')}
  ],practice:practiceFor(q,'Your turn: what does it point back to?',true,quoted),
  rule:'A pronoun (he, she, it, they) replaces a noun.',example:lessonTiles('Giraffes are tall. | They are cool.')};
}
function daysLesson(q         )        {
  return {kind:'days',title:'Days of the week',steps:[
    {caption:'Seven days.',tiles:lessonTiles('Friday Monday Sunday Wednesday Tuesday Saturday Thursday',false)},
    {caption:'In order. Each day starts with a capital.',tiles:lessonTiles('Monday Tuesday Wednesday Thursday Friday Saturday Sunday',false)},
    {caption:'Which day comes next?',tiles:lessonTiles('Monday → ___ → Wednesday',false),then:lessonTiles('Monday → Tuesday/mark#gap → Wednesday',false)}
  ],practice:practiceFor(q,'Your turn.',false,'Friday/mark'),
  rule:'Seven days in order. Each starts with a capital letter.',example:lessonTiles('Monday Tuesday Wednesday Thursday Friday Saturday Sunday',false)};
}
function familyLesson(q         )        {
  const word = q.prompt.match(/“([^”]+)”/)?.[1];
  return {kind:'family',title:'Family words',steps:[
    {caption:'Family words.',tiles:lessonTiles('son grandparents daughter parents',false)},
    {caption:'Grandparents → parents → children.',tiles:lessonTiles('grandparents/mark | parents/noun | son daughter',false)},
    {caption:'Mum and dad are your parents.',tiles:lessonTiles('mum + dad = ___',false),then:lessonTiles('mum + dad = parents/noun#gap',false)}
  ],practice:practiceFor(q,'Your turn.',false,word?`${word}/mark`:undefined),
  rule:'grandparents → parents → son (boy) · daughter (girl)',example:lessonTiles('grandparents | parents | son daughter',false)};
}
function continentLesson(q         )        {
  const country = q.prompt.match(/matches (.+)\?/)?.[1];
  return {kind:'continents',title:'Continents and countries',steps:[
    {caption:'Continents and countries.',tiles:lessonTiles('Japan Europe Brazil Asia Poland South_America',false)},
    {caption:'A continent is very big. It has many countries.',tiles:lessonTiles('Asia/mark: Japan | Europe/mark: Poland | South_America/mark: Brazil',false)},
    {caption:'Jordan is in Asia too.',tiles:lessonTiles('Jordan → ___',false),then:lessonTiles('Jordan → Asia/mark#gap',false)}
  ],practice:practiceFor(q,'Your turn.',false,country?country.replace(/ /g,'_')+'/noun':undefined),
  rule:'Continent → many countries. Asia: Japan, Jordan · Europe: Poland',example:lessonTiles('Asia/mark: Japan Jordan',false)};
}


const $ =                                    (id       ) => document.getElementById(id)     ;
const storageKey='laith-english-studio-v1';
const byId = new Map(questions.map(q=>[q.id,q]));
let saved        = {results:{},recall:{},lesson:{},tally:{right:0,wrong:0},large:false,mode:'words',ids:[],index:0};
let storageAvailable=true;
try { const raw=JSON.parse(localStorage.getItem(storageKey)||'null'); if(raw && typeof raw==='object'){saved.results=Object.fromEntries(Object.entries(raw.results||{}).filter(([id,v])=>byId.has(id)&&['correct','retry','revealed'].includes(String(v))))                    ; saved.large=raw.large===true; if([raw.tally?.right,raw.tally?.wrong].every(n=>Number.isInteger(n)&&n>=0))saved.tally={right:raw.tally.right,wrong:raw.tally.wrong}; if(Array.isArray(raw.ids)&&raw.ids.length&&raw.ids.every((id        )=>typeof id==='string'&&byId.has(id))){saved.ids=raw.ids;saved.mode=typeof raw.mode==='string'?raw.mode:'words';saved.index=Math.max(0,Math.min(saved.ids.length-1,Number.isInteger(raw.index)?raw.index:0));}}} catch {storageAvailable=false}
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
function track(event              ){const id=current().id;const r=recordPractice(saved.recall[id],event,Date.now());saved.recall[id]=r;saved.lesson[id]=recordLesson(saved.lesson[id],event,r);persist()}
let queue            =saved.ids.length?saved.ids.map(id=>byId.get(id) ):questions.filter(q=>q.topic==='words');
let index=saved.index;
let revealed=false, selected                 , attempt=0, feedbackVisible=false;
const poses                    = [['x_arms-softened','Wrong answer · gentle'],['x_arms','Wrong answer · firm'],['skeptical','Skeptical'],['confused','Confused'],['unsure','Unsure'],['concerned','Concerned'],['disappointed','Disappointed'],['frustrated','Frustrated'],['empathetic','Empathetic'],['reassuring','Reassuring'],['serious','Serious'],['caution','Caution'],['shock','Surprised'],['aha','Aha!'],['proud','Proud'],['excited','Excited'],['amused','Amused']];
document.body.classList.toggle('large',saved.large);
function persist(){saved.ids=queue.map(q=>q.id);saved.index=index;try{localStorage.setItem(storageKey,JSON.stringify(saved));}catch{storageAvailable=false}}
const poseSrc=(name       )=>`assets/tutor/${name}.webp`;
// Load and decode every pose up front and keep them referenced, so a reaction swaps instantly instead of waiting for the network.
const poseCache=new Map(poses.map(([name])=>{const img=new Image();img.src=poseSrc(name);img.decode().catch(()=>{});return [name,img]         }));
function pose(name       ,message       ){const img=$                  ('tutor');img.src=poseCache.get(name)?.src||poseSrc(name);img.alt=`Tutor: ${poses.find(p=>p[0]===name)?.[1]||name}`;img.dataset.message=message;}
function current(){return queue[index]}
function showFeedback(text       ,tone='info'){feedbackVisible=true;$('feedback').hidden=false;$('feedback').textContent=text;$('feedback').dataset.tone=tone;}
function render(){
  document.dispatchEvent(new Event('questionchange'));
  const q=current();revealed=false;selected=undefined;attempt=0;feedbackVisible=false;
  $('topic-name').textContent=saved.mode==='mixed'?'Mixed practice':saved.mode==='revisit'?'Practise again':topics.find(t=>t.id===q.topic) .title;
  $('position').textContent=`${index+1} / ${queue.length}`;
  $('origin').textContent=q.extra?'Extra practice':'Worksheet practice';$('question').textContent=q.prompt;$('explanation').textContent=q.explanation;$                    ('explanation-panel').open=false;
  $('reading-area').hidden=!q.excerpt;$('excerpt').textContent=q.excerpt||'';$('full-passage').hidden=!q.story;$('lesson-open').hidden=!lessonFor(q);
  $('choices').replaceChildren();$('choices').dataset.count=String(q.choices?.length||0);document.body.classList.toggle('reading-question',!!q.excerpt);$('spoken').hidden=!!q.choices;
  q.choices?.forEach((answer,i)=>{const btn=document.createElement('button');btn.className='choice';const n=document.createElement('span');n.className='number';n.textContent=String(i+1);n.setAttribute('aria-hidden','true');const label=document.createElement('span');label.textContent=answer;btn.append(n,label);btn.addEventListener('click',()=>choose(answer));$('choices').append(btn)});
  $('feedback').hidden=true;$('feedback').textContent='';$                   ('hint').disabled=false;$                   ('reveal').disabled=false;
  $                   ('oral-correct').disabled=false;$                   ('oral-retry').disabled=false;
  $                   ('previous').disabled=index===0;$('next').textContent=index===queue.length-1?'✓':'→';$('next').classList.remove('ready');
  $('source').textContent=q.source;$('session-note').hidden=storageAvailable;
  pose(q.pose||(['amused','reassuring','serious','unsure'][index%4]),q.pose==='shock'?'That’s a surprising detail!':q.pose==='unsure'?'Let’s check this together.':'Take your time. Think it through.');
  persist();
}
function paintChoices(){Array.from($('choices').children).forEach((el,i)=>{const answer=current().choices [i];el.classList.toggle('selected',answer===selected);el.classList.toggle('correct',(revealed||selected===current().answer)&&answer===current().answer);el.classList.toggle('wrong',answer===selected&&answer!==current().answer);(el                     ).disabled=revealed||selected===current().answer;});}
function choose(answer       ){if(revealed||selected===current().answer)return;selected=answer;attempt++;const correct=answer===current().answer;tally(correct);track(correct?'correct':'retry');if(correct){saved.results[current().id]='correct';$                   ('reveal').disabled=true;$('next').classList.add('ready');pose(attempt>1?'aha':index%3===0?'excited':'proud','Well done!');showFeedback('Correct!','correct')}else{saved.results[current().id]='retry';pose(attempt===1||attempt===2&&index%2===0?'x_arms-softened':attempt===2?'concerned':'reassuring','Let’s try again.');showFeedback('Try again.','retry')}paintChoices();persist();}
function reveal(){if(revealed)return;revealed=true;if(selected!==current().answer)track('revealed');if(saved.results[current().id]!=='correct')saved.results[current().id]='revealed';if(current().choices){$('feedback').hidden=true}else showFeedback(current().answer);pose('aha','Here’s how it works.');paintChoices();$                   ('reveal').disabled=true;$                   ('hint').disabled=true;persist();}
// Every marked attempt counts, including second tries; hints and reveals do not.
function tally(correct        ){if(correct)saved.tally.right++;else saved.tally.wrong++}
function openTools(){$('score-right').textContent=String(saved.tally.right);$('score-wrong').textContent=String(saved.tally.wrong);$('tools-reset-confirm').hidden=true;$                    ('more').open=false;$                   ('tools-dialog').showModal()}
function resetProgress(){saved.results={};saved.recall={};saved.lesson={};saved.tally={right:0,wrong:0};start('words')}
function closeTools(){$                   ('tools-dialog').close()}
function hint(){track('hint');closeTools();showFeedback(current().hint);pose('caution','Look at this clue.');}
function oralMark(correct        ){tally(correct);track(correct?'correct':'retry');closeTools();if(correct){saved.results[current().id]='correct';$('next').classList.add('ready');pose('proud','Good thinking!');showFeedback('Correct!','correct');}else{saved.results[current().id]='retry';attempt++;pose(attempt===1?(index%2===0?'x_arms-softened':'empathetic'):'reassuring','Let’s try it one step at a time.');showFeedback('Try again.','retry')}persist();}
function start(mode       ){let next           ;if(mode==='mixed'){next=[...questions];for(let i=next.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[next[i],next[j]]=[next[j],next[i]]}next=next.slice(0,Number($                   ('round-size').value))}else if(mode==='revisit'){next=questions.filter(q=>saved.recall[q.id]?.pending);}else next=questions.filter(q=>q.topic===mode);if(!next.length)return;queue=next;index=0;saved.mode=mode;$                   ('topic-dialog').close();render();}
function updateTopics(){
  $('topic-grid').replaceChildren();for(const topic of topics){const all=questions.filter(q=>q.topic===topic.id);const correct=all.filter(q=>saved.results[q.id]==='correct').length;const btn=document.createElement('button');btn.className='topic-card';const icon=document.createElement('span');icon.className='topic-icon';icon.textContent=topic.icon;const text=document.createElement('span');const title=document.createElement('strong');title.textContent=topic.title;const detail=document.createElement('small');detail.textContent=`${all.length} questions · ${correct} answered correctly`;const sub=document.createElement('small');sub.textContent=topic.subtitle;text.append(title,sub,detail);btn.append(icon,text);btn.onclick=()=>start(topic.id);$('topic-grid').append(btn)}
  const count=questions.filter(q=>saved.recall[q.id]?.pending).length;$('retry-count').textContent=String(count);$('review-note').textContent=`${questions.filter(q=>saved.recall[q.id]?.pending&&Date.now()-saved.recall[q.id].last>=reviewDelay).length} ready for delayed recall · ${count} waiting for a successful later review. Practising now is fine; allow 24 hours without practice before checking recall.`;$                   ('revisit').disabled=!count;
}
function openTopics(){closeTools();updateTopics();$                   ('topic-dialog').showModal();}
function openRecap(){closeTools();const entries=Object.entries(saved.lesson);const count=(key                   )=>entries.filter(([,r])=>r[key]).length;
  $('recap-summary').textContent=`This lesson: ${count('correct')} answered correctly · ${entries.filter(([,r])=>r.correct&&!r.supported).length} without recorded help · ${entries.filter(([,r])=>r.correct&&r.supported).length} with support · ${count('remembered')} remembered later.`;
  $('recap-events').textContent=`${count('missed')} had an incorrect attempt · ${count('revealed')} had an answer revealed. These counts can overlap.`;
  $('recap-items').replaceChildren();for(const [id,r] of entries.filter(([,r])=>r.missed||r.revealed||r.supported)){const li=document.createElement('li');li.textContent=byId.get(id) .prompt+ (saved.recall[id]?.pending?' — revisit later':' — remembered later');$('recap-items').append(li)}
  $                   ('recap-dialog').showModal();}
function next(){if(index<queue.length-1){index++;render()}else{openRecap();}}
$('topics').onclick=openTopics;$('tools').onclick=openTools;$('previous').onclick=()=>{if(index>0){index--;render()}};$('next').onclick=next;$('hint').onclick=hint;$('reveal').onclick=reveal;
$('oral-correct').onclick=()=>oralMark(true);$('oral-retry').onclick=()=>oralMark(false);
$('recap-topics').onclick=()=>{$                   ('recap-dialog').close();openTopics()};$('new-lesson').onclick=()=>{saved.lesson={};persist();$                   ('recap-dialog').close();openTopics()};
$('mixed').onclick=()=>{closeTools();start('mixed')};$('revisit').onclick=()=>start('revisit');
$('size').onclick=()=>{saved.large=!saved.large;document.body.classList.toggle('large',saved.large);$('size').textContent=saved.large?'Normal text':'Larger text';closeTools();persist()};$('size').textContent=saved.large?'Normal text':'Larger text';
$('fullscreen').onclick=async()=>{closeTools();try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{showFeedback('Use your browser’s full-screen shortcut (usually F11).')}};
document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Exit full screen':'Full screen'});
$('explanation-panel').addEventListener('toggle',()=>{if($                    ('explanation-panel').open)track('concept')});
$('full-passage').onclick=()=>{const story=current().story;if(story){closeTools();$('passage-title').textContent=stories[story].title;$('passage-body').textContent=stories[story].text;$                   ('passage-dialog').showModal()}};
$('source-photo').onclick=()=>{closeTools();const img=$                  ('photo');$('photo-note').textContent='Printed source for reference. Handwritten answers may contain mistakes.';img.hidden=false;img.onerror=()=>{img.hidden=true;$('photo-note').textContent='This photo is unavailable.'};img.src=current().photo;$                   ('photo-dialog').showModal()};
document.querySelectorAll                   ('[data-close]').forEach(btn=>btn.onclick=()=>btn.closest('dialog') .close());
$('tools-reset').onclick=()=>{$('tools-reset-confirm').hidden=false;$('tools-reset-confirm').scrollIntoView({block:'nearest'})};$('tools-cancel-reset').onclick=()=>{$('tools-reset-confirm').hidden=true};$('tools-confirm-reset').onclick=()=>{resetProgress();closeTools()};
document.addEventListener('keydown',e=>{if(document.querySelector('dialog[open]')||document.body.classList.contains('lesson-open'))return;const target=e.target               ;if(['INPUT','TEXTAREA','SELECT'].includes(target.tagName)||e.ctrlKey||e.altKey||e.metaKey)return;if(e.key.toLowerCase()==='t'){e.preventDefault();openTools()}else if(e.key==='ArrowRight'){e.preventDefault();next()}else if(e.key==='ArrowLeft'&&index>0){e.preventDefault();index--;render()}else if(e.key.toLowerCase()==='h'){e.preventDefault();hint()}else if(e.key===' '&&target.tagName!=='BUTTON'&&target.tagName!=='A'){e.preventDefault();reveal()}else if(/^[1-4]$/.test(e.key)){const answer=current().choices?.[Number(e.key)-1];if(answer){e.preventDefault();choose(answer)}}});
// Warm the frequently used feedback images so screen-share feedback appears promptly.
render();

let conceptTimer                                        ;
const conceptAnimations            =[];
function stopConcept(){if(conceptTimer!==undefined)clearTimeout(conceptTimer);conceptTimer=undefined;conceptAnimations.splice(0).forEach(a=>a.cancel())}
function animateConcept(){
  stopConcept();const c=conceptFor(current());const row=$('concept-words');const caption=$('concept-caption');
  $('concept-title').textContent=c.title;caption.textContent=c.caption;
  const picture=$                  ('concept-picture');const key=illustrationFor(current());
  picture.hidden=!key;$('concept-dialog').classList.toggle('illustrated',!!key);
  if(key){picture.alt=illustrations[key].alt;picture.src=illustrations[key].src;picture.onerror=()=>{picture.hidden=true;$('concept-dialog').classList.remove('illustrated')}}else picture.removeAttribute('src');
  row.classList.toggle('phonics',!!c.phonics);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fill=(tokens         ,final        )=>{row.replaceChildren();tokens.forEach((word,i)=>{const el=document.createElement('span');el.textContent=word;el.className='concept-word';if(final&&c.focus.includes(i))el.classList.add('concept-focus');if(final&&c.phonics==='a_e'&&i>=c.focus[0]&&i<=c.focus.at(-1) )el.classList.add('phonics-bridge');row.append(el)})};
  if(reduced){fill(c.after,true);return}
  fill(c.before,false);
  conceptTimer=setTimeout(()=>{
    const previous=Array.from(row.children).map(el=>({text:el.textContent .toLowerCase().replace(/[.?]/g,''),rect:el.getBoundingClientRect(),used:false}));
    fill(c.after,true);
    Array.from(row.children).forEach((el,i)=>{
      const text=el.textContent .toLowerCase().replace(/[.?]/g,'');const old=previous.find(p=>!p.used&&p.text===text);const rect=el.getBoundingClientRect();if(old)old.used=true;
      const special=c.focus.includes(i);
      const from=c.movement==='fade'?{opacity:special ? 0.3 : 1}:old?{transform:`translate(${old.rect.x-rect.x}px, ${old.rect.y-rect.y}px)`,opacity:1}:{transform:`translateY(${c.movement==='fall'?'-80':'-24'}px)`,opacity:0};
      conceptAnimations.push(el.animate([from,{transform:'translate(0,0)',opacity:1}],{duration:c.movement==='fall'&&special?1800:1300,easing:'cubic-bezier(.22,.61,.36,1)',fill:'both'}));
    });
    conceptTimer=undefined;
  },1600);
}
$('concept-info').onclick=()=>{if(selected!==current().answer)track('concept');$                   ('concept-dialog').showModal();animateConcept()};
$('concept-replay').onclick=animateConcept;
$('concept-dialog').addEventListener('close',stopConcept);

// Teacher pen: free drawing over the whole lesson screen for screen-shared lessons.
// Ink stays visible when the pen is off, so the screen remains usable; it clears on a new question.

const ink = document.getElementById('ink')                     ;
const inkContext = ink.getContext('2d') ;
const penButton = document.getElementById('pen')                     ;
const penBar = document.getElementById('pen-bar') ;
let strokes           = [];
let activeStroke                  ;
let penColor = '#d6452f';

function sizeInk(){
  const ratio = window.devicePixelRatio || 1;
  ink.width = Math.round(innerWidth*ratio); ink.height = Math.round(innerHeight*ratio);
  inkContext.setTransform(ratio,0,0,ratio,0,0);
  drawInk();
}
function drawStroke(stroke       ){
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
function setPen(on        ){
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
document.querySelectorAll                   ('.pen-color').forEach(button=>button.onclick=()=>{
  penColor = button.dataset.color ;
  document.querySelectorAll('.pen-color').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
});
document.getElementById('pen-undo') .onclick = ()=>{strokes.pop();drawInk()};
document.getElementById('pen-clear') .onclick = clearInk;
document.addEventListener('questionchange',clearInk);
document.addEventListener('lessonstep',clearInk);
document.addEventListener('keydown',e=>{
  if(document.querySelector('dialog[open]')||e.ctrlKey||e.altKey||e.metaKey)return;
  if(['INPUT','TEXTAREA','SELECT'].includes((e.target               ).tagName))return;
  if(e.key.toLowerCase()==='p'){e.preventDefault();setPen(!document.body.classList.contains('drawing'))}
  else if(e.key==='Escape'&&document.body.classList.contains('drawing')){e.preventDefault();setPen(false)}
});
addEventListener('resize',sizeInk);
sizeInk();

// Interactive lesson player. It is a full-screen layer under the pen, so the tutor can draw on any step.
// Tiles keep their id between steps: a word that moves glides from its old place, a changed word fades into its new form.
const lessonLayer = $('lesson'); const lessonStage = $('lesson-stage'); const lessonOptions = $('lesson-options'); const lessonCaption = $('lesson-caption');
let activeLesson                  ; let lessonStep = 0; let lessonTimer                                         ;

const lessonMotion = ()=>!matchMedia('(prefers-reduced-motion: reduce)').matches;
const lessonViews = (l       )             =>[...l.steps.map(step=>({kind:'step',step})              ),...(l.practice?[{kind:'practice',practice:l.practice}              ]:[]),{kind:'summary'}];

function tileElement(t           )             {
  const el = document.createElement('span'); el.dataset.id = t.id; el.textContent = t.text;
  el.className = ['lesson-tile', t.role&&`role-${t.role}`, t.gap&&'gap', t.br&&'br', t.join&&'join', /^[.?!,:]$/.test(t.text)&&'punct'].filter(Boolean).join(' ');
  return el;
}
function placeTiles(tiles             , from = new Map                ()) {
  const old = new Map                                    ();
  lessonStage.querySelectorAll             ('[data-id]').forEach(el=>old.set(el.dataset.id ,{rect:el.getBoundingClientRect(),text:el.textContent }));
  from.forEach((rect,id)=>old.set(id,{rect,text:''}));
  lessonStage.replaceChildren(...tiles.map(tileElement));
  if (!lessonMotion()) return;
  lessonStage.querySelectorAll             ('[data-id]').forEach(el=>{
    const before = old.get(el.dataset.id ); const now = el.getBoundingClientRect();
    if (!before) { el.animate([{opacity:0,transform:'translateY(-18px)'},{opacity:1,transform:'none'}],{duration:500,easing:'ease-out'}); return; }
    const dx = before.rect.left-now.left, dy = before.rect.top-now.top, changed = before.text!==el.textContent;
    if (dx||dy||changed) el.animate([{transform:`translate(${dx}px,${dy}px)`,opacity:changed?0.35:1},{transform:'none',opacity:1}],{duration:750,easing:'cubic-bezier(.22,.61,.36,1)'});
  });
}
function wobble(el            ) {
  if (lessonMotion()) el.animate([{transform:'translateX(0)'},{transform:'translateX(-8px)'},{transform:'translateX(8px)'},{transform:'translateX(0)'}],{duration:320});
}
function optionButton(t           , onPick                                 ) {
  const button = document.createElement('button'); button.className = 'lesson-option'+(t.role?` role-${t.role}`:''); button.textContent = t.text;
  button.onclick = ()=>onPick(button); return button;
}
function practiceSolved() { lessonCaption.classList.add('done'); }

function showPractice(p               ) {
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
    tiles.concat([null                      ]).forEach((tile,i)=>{
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
  const lesson = activeLesson ; const views = lessonViews(lesson); const view = views[lessonStep];
  document.dispatchEvent(new Event('lessonstep'));
  $('lesson-dots').replaceChildren(...views.map((_,i)=>{const dot=document.createElement('span');if(i===lessonStep)dot.className='on';return dot}));
  $                   ('lesson-prev').disabled = lessonStep===0;
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
function lessonGo(step       ) {
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
