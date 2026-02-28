const request = require("supertest");
const jwt = require("jsonwebtoken");
const { app } = require("../../src/server");

describe("API Endpoints", () => {
  let token;

  beforeAll(() => {
    token = jwt.sign({ userId: 1, username: "testuser" }, process.env.JWT_SECRET, { expiresIn: "1h" });
  });

  describe("POST /api/v1/auth/login", () => {
    test("should return 401 for invalid credentials", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({ username: "invalid", password: "wrong" });
      expect(res.status).toBe(401);
    });

    test("should return 400 for missing credentials", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .send({});
      expect(res.status).toBe(400);
    });
  });

  describe("POST /api/v1/auth/logout", () => {
    test("should return 200 for valid token", async () => {
      const res = await request(app)
        .post("/api/v1/auth/logout")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });

    test("should return 401 for missing token", async () => {
      const res = await request(app)
        .post("/api/v1/auth/logout");
      expect(res.status).toBe(401);
    });
  });

  describe("POST /api/v1/calculator/evaluate", () => {
    test("should evaluate valid expression", async () => {
      const res = await request(app)
        .post("/api/v1/calculator/evaluate")
        .send({ expression: "2+2" });
      expect(res.status).toBe(200);
      expect(res.body.result).toBeDefined();
    });

    test("should return 400 for invalid expression", async () => {
      const res = await request(app)
        .post("/api/v1/calculator/evaluate")
        .send({ expression: "" });
      expect(res.status).toBe(400);
    });
  });

  describe("GET /api/v1/history", () => {
    test("should return 401 without token", async () => {
      const res = await request(app).get("/api/v1/history");
      expect(res.status).toBe(401);
    });

    test("should return history with valid token", async () => {
      const res = await request(app)
        .get("/api/v1/history")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.history).toBeDefined();
      expect(Array.isArray(res.body.history)).toBe(true);
    });
  });

  describe("POST /api/v1/history", () => {
    test("should create history entry", async () => {
      const res = await request(app)
        .post("/api/v1/history")
        .set("Authorization", `Bearer ${token}`)
        .send({ expression: "2+2", result: "4" });
      expect(res.status).toBe(201);
      expect(res.body.id).toBeDefined();
    });
  });

  describe("DELETE /api/v1/history/:id", () => {
    test("should delete history entry", async () => {
      const res = await request(app)
        .delete("/api/v1/history/1")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
    });
  });
});
