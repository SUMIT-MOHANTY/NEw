// Global test setup
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "test-secret-key";
process.env.NODE_ENV = "test";

global.testToken = jwt.sign({ userId: 1, username: "testuser" }, process.env.JWT_SECRET, { expiresIn: "1h" });

global.beforeAll(async () => {
  console.log("Test suite starting...");
});

global.afterAll(async () => {
  console.log("Test suite completed.");
});
