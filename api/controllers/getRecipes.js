const GetRecipe = require("../models/getRecipe");
const mongoose = require("mongoose");

const GetRecipesController = async (req, res) => {
  const { targetIngredients } = req.body;
  try {
    const result = await GetRecipe.find(
      { Ingredients: { $all: ["butter", "egg"] } }
      //   {
      //     projection: {
      //       RecipeId: 1,
      //       Name: 1,
      //       Calories: 1,
      //       CookTime: 1,
      //       ImageLinks: 1,
      //       Ingredients: 1,
      //     },
      //   }
    ).limit(20);
    //   .toArray();
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = GetRecipesController;
