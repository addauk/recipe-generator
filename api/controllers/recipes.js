const AddNewRecipe = require("../models/addNewRecipe");
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
  Create: async (req, res) => {

    try {
      const recipe = await AddNewRecipe.create(req.body);
      console.log(recipe);
      res.status(200).json({ message: "Recipe Successfully Added To The Database!" })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
};

module.exports = RecipesController;
