const express = require("express");
const router = express.Router();

const RecipesController = require("../controllers/recipes");
const GetRecipesController = require("../controllers/getRecipes");

router.get("/:RecipeId", RecipesController.Index);
router.post("/", GetRecipesController);

module.exports = router;
