const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = null;
let useMemory = false;

const connect = () => {
  const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/calcapp.db');
  try {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.warn('DB connection failed, using memory:', err.message);
        useMemory = true;
      }
    });
  } catch (e) {
    console.warn('DB initialization failed, using memory:', e.message);
    useMemory = true;
  }
  return db;
};

const close = () => {
  if (db) db.close();
};

module.exports = { getDb: () => db, isMemory: () => useMemory, connect, close };
