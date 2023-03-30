const Recipe = require("../models/recipe");
const RecipesController = {
  Index: (req, res) => {
    Recipe.findOne({ _id: req.params.id }).exec(async (err, recipe) => {
      if (err) {
        throw err;
      }
      console.log(recipe);
      res.status(200).json(recipe);
    });
  },
};
module.exports = RecipesController;
