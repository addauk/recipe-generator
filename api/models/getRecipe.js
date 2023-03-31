const mongoose = require("mongoose");

const GetRecipesSchema = new mongoose.Schema(
  {
    Name: String,
    Calories: Number,
    CookTime: String,
    ImageLinks: [String],
    Ingredients: [String],
  },
  { collection: "getRecipes" }
);

const GetRecipes = mongoose.model("getRecipes", GetRecipesSchema);

module.exports = GetRecipes;
