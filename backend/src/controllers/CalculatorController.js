'use strict';
const CalculationService = require('../services/CalculationService');

const operations = {
  add: CalculationService.add,
  subtract: CalculationService.subtract,
  multiply: CalculationService.multiply,
  divide: CalculationService.divide
};

const CalculatorController = {
  add: (req, res) => handleOperation(req, res, 'add'),
  subtract: (req, res) => handleOperation(req, res, 'subtract'),
  multiply: (req, res) => handleOperation(req, res, 'multiply'),
  divide: (req, res) => handleOperation(req, res, 'divide')
};

function handleOperation(req, res, operation) {
  const { a, b } = req.body;
  try {
    const result = operations[operation](a, b);
    res.json({ success: true, result, operation });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
}

module.exports = CalculatorController;
