const express = require("express");
const router = express.Router();

const RecipesController = require("../controllers/recipes");
router.get("/recipes/:RecipeId", RecipesController.Index);

module.exports = router;
