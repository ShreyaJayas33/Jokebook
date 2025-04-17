const db = require('./db/database');
const jokes = [
  ['funnyJoke', 'Why did the student eat his homework?', 'Because the teacher told him it was a piece of cake!'],
  ['funnyJoke', 'What kind of tree fits in your hand?', 'A palm tree'],
  ['funnyJoke', 'What is worse than raining cats and dogs?', 'Hailing taxis'],
  ['lameJoke', 'Which bear is the most condescending?', 'Pan-DUH'],
  ['lameJoke', 'What would the Terminator be called in his retirement?', 'The Exterminator']
];

jokes.forEach(([category, setup, delivery]) => {
  db.run('INSERT INTO jokes (category, setup, delivery) VALUES (?, ?, ?)', [category, setup, delivery]);
});

console.log('✅ Sample jokes seeded!');

