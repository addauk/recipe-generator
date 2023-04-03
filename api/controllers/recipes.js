const Recipe = require("../models/recipe");

const RecipesController = {
  Index: async (req, res) => {
    Recipe.findOne({ _id: req.params.id }).exec(async (err, recipe) => {
      if (err) {
        throw err;
      }
      res.status(200).json(recipe);
    });
  },
  Search: async (req, res) => {
    const { targetIngredients } = req.body;
    try {
      const result = await Recipe.find({
        Ingredients: { $all: targetIngredients },
      })
        .limit(10)
        .select("Name Calories CookTime ImageLinks");
      console.log(result);
      res.status(200).json({ result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = RecipesController;
