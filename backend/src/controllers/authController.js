const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const db = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'calcapp-secret-key';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }
    const user = await userModel.findByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

const logout = (req, res) => {
  res.json({ message: 'Logged out successfully' });
};

const validate = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false, error: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ valid: false, error: 'User not found' });
    }
    res.json({ valid: true, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
};

module.exports = { login, logout, validate };
