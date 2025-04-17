const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/jokebook.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS jokes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category TEXT,
    setup TEXT,
    delivery TEXT
  )`);
});

module.exports = db;
