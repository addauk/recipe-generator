const Recipe = require("../models/recipe");

const RecipesController = {
  Index: async (req, res) => {
    Recipe.findOne({ _id: req.params.id }).exec(async (err, recipe) => {
      if (err) {
        throw err;
      }
      console.log(recipe);
      res.status(200).json(recipe);
    });
  },
  Search: async (req, res) => {
    try {
      console.log("Connected to MongoDB server");

      let targetIngredients = req.body.targetIngredients;
      if (Array.isArray(targetIngredients)) {
        targetIngredients = targetIngredients.join(",");
      }

      const skip = parseInt(req.body.skip);
      const limit = parseInt(req.body.limit);

      const recipes = await Recipe.find(
        { Ingredients: { $all: [targetIngredients] } },
        {
          RecipeId: 1,
          Name: 1,
          Calories: 1,
          CookTime: 1,
          ImageLinks: 1,
          Ingredients: 1,
          _id: 1,
        }
      )
        .skip(skip)
        .limit(limit);

      const totalMatches = await Recipe.countDocuments({
        Ingredients: { $all: [targetIngredients] },
      }).limit(200);

      res.status(200).json({ totalMatches, recipes });
    } catch (err) {
      console.error(err);
      res.status(500).send("Error getting recipes from database");
    }
  },
};

module.exports = RecipesController;
