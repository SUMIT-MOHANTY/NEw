// Mock database for testing
const mockDb = {
  data: {
    users: [{ id: 1, username: "testuser", password: "$2a$10$testhash" }],
    history: []
  },
  getHistoryByUserId(userId) {
    return this.data.history.filter(h => h.userId === userId);
  },
  createHistory(userId, expression, result) {
    const id = this.data.history.length + 1;
    const entry = { id, userId, expression, result, timestamp: new Date() };
    this.data.history.push(entry);
    return id;
  },
  deleteHistory(id) {
    const idx = this.data.history.findIndex(h => h.id === id);
    if (idx > -1) {
      this.data.history.splice(idx, 1);
      return true;
    }
    return false;
  }
};

describe("Database Operations", () => {
  beforeEach(() => {
    mockDb.data.history = [];
  });

  describe("HistoryModel - createHistory", () => {
    test("should create a new history entry", () => {
      const id = mockDb.createHistory(1, "2+2", "4");
      expect(id).toBe(1);
      expect(mockDb.data.history.length).toBe(1);
    });

    test("should assign correct userId", () => {
      mockDb.createHistory(1, "5*5", "25");
      mockDb.createHistory(2, "10/2", "5");
      const user1History = mockDb.getHistoryByUserId(1);
      const user2History = mockDb.getHistoryByUserId(2);
      expect(user1History.length).toBe(1);
      expect(user2History.length).toBe(1);
    });
  });

  describe("HistoryModel - getHistoryByUserId", () => {
    test("should return empty array for user with no history", () => {
      const history = mockDb.getHistoryByUserId(999);
      expect(history).toEqual([]);
    });

    test("should return all history for a user", () => {
      mockDb.createHistory(1, "1+1", "2");
      mockDb.createHistory(1, "2+2", "4");
      mockDb.createHistory(2, "3+3", "6");
      const history = mockDb.getHistoryByUserId(1);
      expect(history.length).toBe(2);
    });
  });

  describe("HistoryModel - deleteHistory", () => {
    test("should delete existing history entry", () => {
      mockDb.createHistory(1, "1+1", "2");
      const result = mockDb.deleteHistory(1);
      expect(result).toBe(true);
      expect(mockDb.data.history.length).toBe(0);
    });

    test("should return false for non-existent entry", () => {
      const result = mockDb.deleteHistory(999);
      expect(result).toBe(false);
    });
  });
});
