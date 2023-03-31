const Recipes = require("../models/recipe");

const GetRecipesController = async (req, res) => {
  const { targetIngredients } = req.body;
  try {
    const result = await Recipes.find({
      Ingredients: { $in: targetIngredients },
    }).limit(10);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = GetRecipesController;
