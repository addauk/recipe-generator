const express = require("express");
const router = express.Router();

const SessionsController = require("../controllers/tokens");

router.post("/", SessionsController.Create);

module.exports = router;
