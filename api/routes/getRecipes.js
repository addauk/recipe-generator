const express = require("express");
const app = express();
const router = express.Router();

const GetRecipesController = require("../controllers/getRecipes");

router.post("/", GetRecipesController);

module.exports = router;
