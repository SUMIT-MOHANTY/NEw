const { add, subtract, multiply, divide } = require("../../src/utils/calculator");

describe("Calculator", () => {
  describe("add", () => {
    test("should return sum of two positive numbers", () => {
      expect(add(2, 3)).toBe(5);
    });
    test("should handle negative numbers", () => {
      expect(add(-5, 3)).toBe(-2);
    });
    test("should handle decimals", () => {
      expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
    });
    test("should handle zero", () => {
      expect(add(0, 5)).toBe(5);
    });
    test("should handle large numbers", () => {
      expect(add(1000000, 2000000)).toBe(3000000);
    });
  });

  describe("subtract", () => {
    test("should return difference of two positive numbers", () => {
      expect(subtract(10, 4)).toBe(6);
    });
    test("should handle negative results", () => {
      expect(subtract(3, 8)).toBe(-5);
    });
    test("should handle decimals", () => {
      expect(subtract(1.5, 0.5)).toBe(1);
    });
    test("should handle zero", () => {
      expect(subtract(5, 0)).toBe(5);
    });
  });

  describe("multiply", () => {
    test("should return product of two positive numbers", () => {
      expect(multiply(4, 5)).toBe(20);
    });
    test("should handle negative numbers", () => {
      expect(multiply(-3, 4)).toBe(-12);
    });
    test("should handle decimals", () => {
      expect(multiply(2.5, 2)).toBe(5);
    });
    test("should return zero when multiplying by zero", () => {
      expect(multiply(100, 0)).toBe(0);
    });
    test("should handle large numbers", () => {
      expect(multiply(1000, 1000)).toBe(1000000);
    });
  });

  describe("divide", () => {
    test("should return quotient of two numbers", () => {
      expect(divide(10, 2)).toBe(5);
    });
    test("should handle negative numbers", () => {
      expect(divide(-10, 2)).toBe(-5);
    });
    test("should handle decimals", () => {
      expect(divide(7, 2)).toBe(3.5);
    });
    test("should return zero when dividing zero", () => {
      expect(divide(0, 5)).toBe(0);
    });
    test("should throw on division by zero", () => {
      expect(() => divide(10, 0)).toThrow("Division by zero");
    });
  });
});
