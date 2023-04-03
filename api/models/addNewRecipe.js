const mongoose = require("mongoose");
const { Schema } = mongoose;

const AddNewRecipeSchema = new Schema({
  Name: {
    type: String,
  },
  Description: {
    type: String,
  },
  Ingredients: {
    type: String,
  },
  IngredientQuantities: {
    type: Array,
  },
  Instructions: {
    type: Array,
  },
  AuthorName: {
    type: String,
  },
  CookTime: {
    type: String,
  },
  PrepTime: {
    type: String
  },
  TotalTime: {
    type: String
  },
  RecipeCategory: {
    type: String
  },
  RecipeServings: {
    type: String
  },
  ImageLinks: {
    type: Array
  }
},
{ collection: "Recipes" });

const AddRecipes = mongoose.model("addRecipe", AddNewRecipeSchema);

module.exports = AddRecipes;