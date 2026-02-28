const db = require('../config/database');

const _memoryHistory = [];
let _historyIdCounter = 1;

const getAll = (userId = null) => {
  if (db.isMemory()) {
    const results = userId ? _memoryHistory.filter(h => h.userId === userId) : _memoryHistory;
    return Promise.resolve(results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  }
  return new Promise((resolve, reject) => {
    const sql = userId ? 'SELECT * FROM history WHERE userId = ? ORDER BY timestamp DESC' : 'SELECT * FROM history ORDER BY timestamp DESC';
    const params = userId ? [userId] : [];
    db.getDb().all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

const create = (entry) => {
  if (db.isMemory()) {
    const newEntry = { id: _historyIdCounter++, ...entry, timestamp: new Date().toISOString() };
    _memoryHistory.push(newEntry);
    return Promise.resolve(newEntry);
  }
  return new Promise((resolve, reject) => {
    const stmt = db.getDb().prepare('INSERT INTO history (expression, result, userId, timestamp) VALUES (?, ?, ?, ?)');
    stmt.run(entry.expression, entry.result, entry.userId || null, new Date().toISOString(), function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, ...entry, timestamp: new Date().toISOString() });
    });
    stmt.finalize();
  });
};

const remove = (id) => {
  if (db.isMemory()) {
    const idx = _memoryHistory.findIndex(h => h.id === id);
    if (idx > -1) _memoryHistory.splice(idx, 1);
    return Promise.resolve({ deleted: idx > -1 });
  }
  return new Promise((resolve, reject) => {
    db.getDb().run('DELETE FROM history WHERE id = ?', [id], function(err) {
      if (err) reject(err);
      else resolve({ deleted: this.changes > 0 });
    });
  });
};

module.exports = { getAll, create, remove, _memoryHistory };
