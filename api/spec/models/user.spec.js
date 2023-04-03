const mongoose = require("mongoose");
const User = require("../../models/user");

describe("User", () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/(TEST URL GOES HERE)", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

//   afterAll(async () => {
//     await mongoose.connection.db.dropDatabase();
//     await mongoose.connection.close();
//   });

  describe("Validation", () => {
    it("requires a userName, email, and password", async () => {
      const user = new User({
        userName: "testuser",
        email: "testuser@example.com",
        password: "testpassword",
        });
        await user.save();

      await new Promise((resolve) => {
      user.validate((error) => {
        console.log(error.errors.password)
        expect(error.errors.userName).toBeDefined();
        expect(error.errors.email).toBeDefined();
        expect(error.errors.password).toBeDefined();
        resolve();
      });
    })
    });

    it("requires the email to be unique", async () => {
      const user = new User({
        userName: "test",
        email: "test@example.com",
        password: "password",
      });
      await user.save();

      const duplicateUser = new User({
        userName: "test",
        email: "test@example.com",
        password: "password",
      });
      await duplicateUser.save();

      await new Promise((resolve) => {
        duplicateUser.validate((error) => {
          expect(error.errors.email).toBeDefined();
          resolve();
      });
    });
    })
})
})