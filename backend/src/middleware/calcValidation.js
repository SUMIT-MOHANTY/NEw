'use strict';
const MAX_SAFE = 1e15;
const VALID_OPERATIONS = ['add', 'subtract', 'multiply', 'divide'];

function validateNumber(value, name) {
  if (value === undefined || value === null) {
    return `${name} is required`;
  }
  if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
    return `${name} must be a valid number`;
  }
  if (Math.abs(value) > MAX_SAFE) {
    return `${name} exceeds safe bounds (max ${MAX_SAFE})`;
  }
  return null;
}

function calcValidation(req, res, next) {
  const { a, b, operation } = req.body;
  const errors = [];

  const aError = validateNumber(a, 'a');
  if (aError) errors.push(aError);

  const bError = validateNumber(b, 'b');
  if (bError) errors.push(bError);

  if (!operation || !VALID_OPERATIONS.includes(operation)) {
    errors.push(`operation must be one of: ${VALID_OPERATIONS.join(', ')}`);
  }

  if (errors.length > 0) {
    return res.status(400).json({ success: false, error: errors.join('; ') });
  }
  next();
}

module.exports = calcValidation;
