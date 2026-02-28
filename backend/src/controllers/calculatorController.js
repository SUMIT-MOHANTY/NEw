const db = require('../config/database');

const evaluate = (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression) {
      return res.status(400).json({ error: 'Expression required' });
    }
    const sanitized = expression.replace(/[^0-9+\-*/().%^ ]/g, '');
    if (!sanitized.trim()) {
      return res.status(400).json({ error: 'Invalid expression' });
    }
    // Safe evaluation using Function constructor
    const result = new Function('return ' + sanitized)();
    if (typeof result !== 'number' || !isFinite(result)) {
      return res.status(400).json({ error: 'Invalid calculation result' });
    }
    res.json({ expression, result: String(result), timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(400).json({ error: 'Evaluation failed: ' + err.message });
  }
};

module.exports = { evaluate };
