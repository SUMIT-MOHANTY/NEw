'use strict';
const CalculationService = require('../src/services/CalculationService');
const assert = require('assert');

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
  } catch (e) {
    console.error(`✗ ${name}: ${e.message}`);
    process.exitCode = 1;
  }
}

// Test basic operations with positive numbers
test('add positive numbers', () => assert.strictEqual(CalculationService.add(2, 3), 5));
test('subtract positive numbers', () => assert.strictEqual(CalculationService.subtract(10, 4), 6));
test('multiply positive numbers', () => assert.strictEqual(CalculationService.multiply(3, 4), 12));
test('divide positive numbers', () => assert.strictEqual(CalculationService.divide(20, 4), 5));

// Test operations with negative numbers
test('add negative numbers', () => assert.strictEqual(CalculationService.add(-5, -3), -8));
test('subtract negative numbers', () => assert.strictEqual(CalculationService.subtract(-5, 3), -8));
test('multiply negative numbers', () => assert.strictEqual(CalculationService.multiply(-3, 4), -12));
test('divide negative numbers', () => assert.strictEqual(CalculationService.divide(-20, 4), -5));

// Test division by zero
test('divide by zero throws error', () => {
  assert.throws(() => CalculationService.divide(10, 0), /Division by zero/);
});

// Test overflow protection
test('overflow throws error', () => {
  assert.throws(() => CalculationService.add(1e16, 1), /exceeds safe bounds/);
});

// Test input validation
test('non-numeric input throws error', () => {
  assert.throws(() => CalculationService.add(NaN, 5), /Invalid a/);
});

test('Infinity input throws error', () => {
  assert.throws(() => CalculationService.multiply(Infinity, 5), /Invalid a/);
});

console.log('\nAll tests completed.');
