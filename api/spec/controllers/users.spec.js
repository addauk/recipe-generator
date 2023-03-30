const request = require("supertest");
const app = require("../../app");
const User = require("../../models/user");

describe("UsersController", () => {
//   beforeEach(async () => {
//     await User.deleteMany({});
//   });

  describe("Create", () => {
    test("should create a user with valid data", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          userName: "testuser",
          password: "testpassword",
          email: "testuser@example.com",
        })
        .expect(201);

      expect(response.body).toEqual({ message: "OK" });

      const user = await User.findOne({ email: "testuser@example.com" });
      expect(user).toBeDefined();
      expect(user.userName).toBe("testuser");
      expect(user.password).not.toBe("testpassword");
      expect(await user.verifyPassword("testpassword")).toBe(true);
    });

    test("should return a 400 error with invalid data", async () => {
      const response = await request(app)
        .post("/users")
        .send({
          userName: "testuser",
          email: "testuser@example.com",
        })
        .expect(400);

      expect(response.body).toEqual({ message: "Bad request" });

      const user = await User.findOne({ email: "testuser@example.com" });
      expect(user).toBeNull();
    });
  });

  describe("GetUser", () => {
    test("should return a user with valid email", async () => {
      const user = new User({
        userName: "testuser",
        password: "testpassword",
        email: "testuser@example.com",
      });
      await user.save();

      const response = await request(app)
        .get("/users")
        .query({ email: "testuser@example.com" })
        .expect(200);

      expect(response.body).toBe("testuser");
    });

    test("should return a 404 error with invalid email", async () => {
      const response = await request(app)
        .get("/users")
        .query({ email: "nonexistent@example.com" })
        .expect(404);

      expect(response.body).toEqual({ error: "User not found" });
    });

    test("should return a 500 error with server error", async () => {
      jest.spyOn(User, "findOne").mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      const response = await request(app)
        .get("/users")
        .query({ email: "testuser@example.com" })
        .expect(500);

      expect(response.body).toEqual({ error: "Server error" });
    });
  });
});