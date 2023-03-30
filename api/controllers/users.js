const User = require("../models/user");
const bcrypt = require('bcrypt')

const UsersController = {
  Create: async (req, res) => {
    console.log("CREATING USER")

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      userName: req.body.userName,
      password: hashedPassword,
      email: req.body.email
    })

    await user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
        console.log("FAILURE")
      } else {
        res.status(201).json({ message: 'OK' });
        console.log("SUCCESS")
      }
    });
  },
  GetUser: async (req, res) => {
    try {
      const email = req.query.email;
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user.userName);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = UsersController;
