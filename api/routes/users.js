const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");

router.post("/", UsersController.Create);

router.get("/:id", UsersController.GetUser);

router.put("/:id", UsersController.UpdateUserBio);

module.exports = router;
