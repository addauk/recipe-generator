const express = require("express");
const router = express.Router();

const RecipesController = require("../controllers/recipes");
router.get("/:id", RecipesController.Index);

module.exports = router;
