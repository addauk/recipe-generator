const Recipes = require("../models/recipe");
const mongoose = require("mongoose");

// const GetRecipesController = {
//   FindRecipe: (req, res) => {
//     GetRecipes.find(async (err, recipes) => {
//       if (err) {
//         throw err;
//       }
//       res.status(200).json({ recipe: RecipeId, name: Name });
//     });
//   },
// };

const GetRecipesController = async (req, res) => {
  const { targetIngredients } = req.body;
  try {
    const result = await Recipes.find({
      Ingredients: { $all: targetIngredients },
    })
      .select("RecipeId Name Calories CookTime ImageLinks Ingredients")
      .limit(10);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = GetRecipesController;
