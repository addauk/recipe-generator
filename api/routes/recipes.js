const express = require("express");
const router = express.Router();

const RecipesController = require("../controllers/recipes");

router.get("/:id", RecipesController.Index);
router.post("/", RecipesController.Search);

module.exports = router;
