'use strict';
const express = require('express');
const calculatorRoutes = require('./routes/calculatorRoutes');

const app = express();
app.use(express.json());

// Calculator routes
app.use('/api/v1/calculator', calculatorRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
