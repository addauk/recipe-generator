const TokenGenerator = require("../../models/token_generator");
const JWT = require("jsonwebtoken");

describe("TokenGenerator", () => {
  describe("jsonwebtoken", () => {
    const user_id = "123";

    it("returns a valid JWT token", () => {
      const token = TokenGenerator.jsonwebtoken(user_id);
      const decoded = JWT.verify(token, process.env.JWT_SECRET || 'default-secret-key');
      expect(decoded.user_id).toBe(user_id);
    });

    it("sets the expiration time to 10 minutes from now", () => {
      const token = TokenGenerator.jsonwebtoken(user_id);
      const decoded = JWT.verify(token, process.env.JWT_SECRET || 'default-secret-key');
      const expirationTime = decoded.exp;
      const currentTime = Math.floor(Date.now() / 1000);
      expect(expirationTime - currentTime).toBe(10 * 60);
    });
  });
});