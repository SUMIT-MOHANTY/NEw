const db = require('../config/database');

const _memoryUsers = [];

const findByUsername = (username) => {
  if (db.isMemory()) {
    return _memoryUsers.find(u => u.username === username) || null;
  }
  return new Promise((resolve, reject) => {
    db.getDb().get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
};

const findById = (id) => {
  if (db.isMemory()) {
    return _memoryUsers.find(u => u.id === id) || null;
  }
  return new Promise((resolve, reject) => {
    db.getDb().get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
};

const create = (user) => {
  if (db.isMemory()) {
    const newUser = { id: _memoryUsers.length + 1, ...user, createdAt: new Date().toISOString() };
    _memoryUsers.push(newUser);
    return Promise.resolve(newUser);
  }
  return new Promise((resolve, reject) => {
    const stmt = db.getDb().prepare('INSERT INTO users (username, email, password, createdAt) VALUES (?, ?, ?, ?)');
    stmt.run(user.username, user.email, user.password, new Date().toISOString(), function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, ...user, createdAt: new Date().toISOString() });
    });
    stmt.finalize();
  });
};

module.exports = { findByUsername, findById, create, _memoryUsers };
