const Recipe = require("../models/recipe");

const RecipesController = {
  Index: (req, res) => {
    Recipe.findOne({ _id: req.params.RecipeId }).exec(async (err, recipe) => {
      console.log(req.params.id);
      if (err) {
        throw err;
      }
      console.log(recipe);
      res.status(200).json(recipe);
    });
  },
};

// const RecipesController = {
//   Index: async (req, res) => {
//     try {
//       const { targetIngredients } = req.body;
//       const recipe = await Recipe.findOne({
//         RecipeId: targetIngredients,
//       }).exec();
//       console.log(req.params.id);
//       console.log(recipe);
//       res.status(200).json(recipe);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
// };

module.exports = RecipesController;
