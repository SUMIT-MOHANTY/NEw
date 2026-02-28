const jwt = require("jsonwebtoken");

// Mock authentication utilities
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "test-secret-key");
  } catch (err) {
    return null;
  }
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET || "test-secret-key", { expiresIn: "1h" });
};

describe("Auth Utilities", () => {
  describe("generateToken", () => {
    test("should generate a valid JWT token", () => {
      const token = generateToken({ userId: 1, username: "testuser" });
      expect(token).toBeDefined();
      expect(typeof token).toBe("string");
      expect(token.split(".").length).toBe(3);
    });
  });

  describe("verifyToken", () => {
    test("should verify a valid token", () => {
      const token = generateToken({ userId: 1, username: "testuser" });
      const decoded = verifyToken(token);
      expect(decoded).toBeDefined();
      expect(decoded.userId).toBe(1);
    });
    test("should return null for invalid token", () => {
      const result = verifyToken("invalid-token");
      expect(result).toBeNull();
    });
    test("should return null for expired token", () => {
      const expiredToken = jwt.sign(
        { userId: 1 },
        process.env.JWT_SECRET || "test-secret-key",
        { expiresIn: "-1s" }
      );
      const result = verifyToken(expiredToken);
      expect(result).toBeNull();
    });
  });

  describe("Login Flow", () => {
    test("should create token with correct payload", () => {
      const userData = { userId: 42, username: "john" };
      const token = generateToken(userData);
      const decoded = verifyToken(token);
      expect(decoded.userId).toBe(42);
      expect(decoded.username).toBe("john");
    });
  });
});
