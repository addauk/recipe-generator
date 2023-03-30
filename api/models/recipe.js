const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  RecipeId: Number,
  Name: String,
  AuthorId: Number,
  AuthorName: String,
  CookTime: String,
  PrepTime: String,
  TotalTime: String,
  DatePublished: Date,
  Description: String,
  RecipeCategory: String,
  AggregatedRating: Number,
  ReviewCount: Number,
  Calories: Number,
  FatContent: Number,
  SaturatedFatContent: Number,
  CholesterolContent: Number,
  SodiumContent: Number,
  CarbohydrateContent: Number,
  FiberContent: Number,
  SugarContent: Number,
  ProteinContent: Number,
  RecipeServings: Number,
  RecipeYield: Number,
  ImageLinks: [String],
  IngredientQuantities: [String],
  Tags: [String],
  Ingredients: [String],
  Instructions: [String],
});

const Recipe = mongoose.model("Recipe", RecipeSchema);

module.exports = Recipe;
