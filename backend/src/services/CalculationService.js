'use strict';
const MAX_SAFE = 1e15;

class CalculationService {
  static #validateNumber(value, name) {
    if (typeof value !== 'number' || Number.isNaN(value) || !Number.isFinite(value)) {
      throw new Error(`Invalid ${name}: must be a finite number`);
    }
    if (Math.abs(value) > MAX_SAFE) {
      throw new Error(`${name} exceeds safe bounds (max ${MAX_SAFE})`);
    }
  }

  static add(a, b) {
    this.#validateNumber(a, 'a');
    this.#validateNumber(b, 'b');
    return a + b;
  }

  static subtract(a, b) {
    this.#validateNumber(a, 'a');
    this.#validateNumber(b, 'b');
    return a - b;
  }

  static multiply(a, b) {
    this.#validateNumber(a, 'a');
    this.#validateNumber(b, 'b');
    return a * b;
  }

  static divide(a, b) {
    this.#validateNumber(a, 'a');
    this.#validateNumber(b, 'b');
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }
}

module.exports = CalculationService;
