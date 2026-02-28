const historyModel = require('../models/historyModel');
const db = require('../config/database');

const getHistory = async (req, res) => {
  try {
    if (db.isMemory()) {
      return res.status(503).json({ error: 'History unavailable - database disconnected', offline: true });
    }
    const userId = req.user ? req.user.id : null;
    const history = await historyModel.getAll(userId);
    res.json(history);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

const saveHistory = async (req, res) => {
  try {
    if (db.isMemory()) {
      return res.status(503).json({ error: 'History unavailable - database disconnected', offline: true });
    }
    const { expression, result } = req.body;
    if (!expression || !result) {
      return res.status(400).json({ error: 'Expression and result required' });
    }
    const userId = req.user ? req.user.id : null;
    const entry = await historyModel.create({ expression, result, userId });
    res.status(201).json(entry);
  } catch (err) {
    console.error('Save history error:', err);
    res.status(500).json({ error: 'Failed to save history' });
  }
};

const deleteHistory = async (req, res) => {
  try {
    if (db.isMemory()) {
      return res.status(503).json({ error: 'History unavailable - database disconnected', offline: true });
    }
    const { id } = req.params;
    const result = await historyModel.remove(parseInt(id));
    if (!result.deleted) {
      return res.status(404).json({ error: 'History entry not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('Delete history error:', err);
    res.status(500).json({ error: 'Failed to delete history' });
  }
};

module.exports = { getHistory, saveHistory, deleteHistory };
