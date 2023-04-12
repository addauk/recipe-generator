const express = require("express");
const router = express.Router();

const RecipesController = require("../controllers/recipes");

router.get("/:id", RecipesController.Index);
router.post("/", RecipesController.Search);
router.post("/new", RecipesController.Create);

module.exports = router;
