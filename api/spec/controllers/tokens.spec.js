const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../app");
const User = require("../../models/user");
const TokenGenerator = require("../../models/token_generator");

describe("SessionsController", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const password = await bcrypt.hash("password", 10);
    await User.create({ email: "test@example.com", password: password });
  });

  describe("POST /login", () => {
    it("returns 201 and a token when the credentials are valid", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password" });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("message", "OK");
      expect(response.body).toHaveProperty("user.email", "test@example.com");
    });

    it("returns 401 when the email is incorrect", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "wrong@example.com", password: "password" });
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("message", "auth error");
    });

    it("returns 401 when the password is incorrect", async () => {
      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "wrong" });
      expect(response.statusCode).toBe(401);
      expect(response.body).toHaveProperty("message", "auth error");
    });
  });
});