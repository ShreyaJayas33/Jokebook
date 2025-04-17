const db = require('../db/database');

exports.getCategories = () => ['funnyJoke', 'lameJoke'];

exports.getJokesByCategory = (category, limit, callback) => {
  let query = `SELECT * FROM jokes WHERE category = ?`;
  if (limit) query += ` LIMIT ?`;
  db.all(query, limit ? [category, limit] : [category], callback);
};

exports.getRandomJoke = (callback) => {
  db.get(`SELECT * FROM jokes ORDER BY RANDOM() LIMIT 1`, [], callback);
};

exports.addJoke = (category, setup, delivery, callback) => {
  db.run(`INSERT INTO jokes (category, setup, delivery) VALUES (?, ?, ?)`,
    [category, setup, delivery],
    function (err) {
      if (err) return callback(err);
      db.all(`SELECT * FROM jokes WHERE category = ?`, [category], callback);
    });
};
