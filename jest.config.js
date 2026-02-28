module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "html", "lcov"],
  coverageThreshold: {
    global: {
      lines: 70,
      functions: 70,
      branches: 60
    }
  },
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  verbose: true
};
