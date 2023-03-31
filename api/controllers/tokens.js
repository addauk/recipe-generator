const User = require("../models/user");
const TokenGenerator = require("../models/token_generator");
const bcrypt = require("bcrypt");

const SessionsController = {
  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      console.log("IN TOKEN CONTROLLER" + user.email);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!user) {
        console.log("auth error: user not found");
        res.status(401).json({ message: "auth error" });
      } else if (!isPasswordValid) {
        console.log("auth error: passwords do not match");
        res.status(401).json({ message: "auth error" });
      } else {
        console.log("Successful token generation for login");
        const token = await TokenGenerator.jsonwebtoken(user.id);
        res.status(201).json({ token: token, message: "OK", user: user });
      }
    });
  },
};

module.exports = SessionsController;
