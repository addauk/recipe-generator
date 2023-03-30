import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
const RecipeDetail = ({ navigate }) => {
  const [recipe, setRecipe] = useState({});
  const location = useLocation();
  //const [token, setToken] = useState(window.localStorage.getItem("token"));
  //const params = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []);

  function fetchRecipe() {
    setRecipe(location.state.recipe);
    // setRecipe({
    //   _id: {
    //     $oid: "6423250a28113afc5ad3394d",
    //   },
    //   RecipeId: 38,
    //   Name: "Low-Fat Berry Blue Frozen Dessert",
    //   AuthorId: 1533,
    //   AuthorName: "Dancer",
    //   CookTime: "PT24H",
    //   PrepTime: "PT45M",
    //   TotalTime: "PT24H45M",
    //   DatePublished: "1999-08-09T21:46:00Z",
    //   Description:
    //     "Make and share this Low-Fat Berry Blue Frozen Dessert recipe from Food.com.",
    //   RecipeCategory: "Frozen Desserts",
    //   AggregatedRating: 4.5,
    //   ReviewCount: 4,
    //   Calories: 170.9,
    //   FatContent: 2.5,
    //   SaturatedFatContent: 1.3,
    //   CholesterolContent: 8,
    //   SodiumContent: 29.8,
    //   CarbohydrateContent: 37.1,
    //   FiberContent: 3.6,
    //   SugarContent: 30.2,
    //   ProteinContent: 3.2,
    //   RecipeServings: 4,
    //   RecipeYield: "NA",
    //   Ingredients: [
    //     "blueberries",
    //     "granulated sugar",
    //     "vanilla yogurt",
    //     "lemon juice",
    //   ],
    //   ImageLinks: [
    //     "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/38/YUeirxMLQaeE1h3v3qnM_229%20berry%20blue%20frzn%20dess.jpg",
    //     "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/38/AFPDDHATWzQ0b1CDpDAT_255%20berry%20blue%20frzn%20dess.jpg",
    //     "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/38/UYgf9nwMT2SGGJCuzILO_228%20berry%20blue%20frzn%20dess.jpg",
    //     'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/38/PeBMJN2TGSaYks2759BA_20140722_202142.jpg", \n"https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/38/picuaETeN.jpg',
    //     "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/38/pictzvxW5.jpg",
    //   ],
    //   IngredientQuantities: ["4", "1/4", "1", "1"],
    //   Tags: [
    //     "Dessert",
    //     "Low Protein",
    //     "Low Cholesterol",
    //     "Healthy",
    //     "Free Of...",
    //     "Summer",
    //     "Weeknight",
    //     "Freezer",
    //     "Easy",
    //   ],
    //   Instructions: [
    //     "Toss 2 cups berries with sugar.",
    //     "Let stand for 45 minutes, stirring occasionally.",
    //     "Transfer berry-sugar mixture to food processor.",
    //     "Add yogurt and process until smooth.",
    //     "Strain through fine sieve. Pour into baking pan (or transfer to ice cream maker and process according to manufacturers' directions). Freeze uncovered until edges are solid but centre is soft.  Transfer to processor and blend until smooth again.",
    //     "Return to pan and freeze until edges are solid.",
    //     'Transfer to processor and blend until smooth again.", \n"Fold in remaining 2 cups of blueberries.',
    //     "Pour into plastic mold and freeze overnight. Let soften slightly to serve.",
    //   ],
    // });}
    // const url = "recipe/" + params.id;
    // const response = await fetch(url, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // const data = await response.json();
    // window.localStorage.setItem("token", data.token);
    // setToken(window.localStorage.getItem("token"));
    // setRecipe(data.recipe);
  }

  function RenderRecipe() {
    return (
      <>
        <div class="recipeHeader">
          {Array.isArray(recipe.ImageLinks) && recipe.ImageLinks[0] !== "" ? (
            <img class="recipeImage" src={recipe.ImageLinks[0]} alt="" />
          ) : (
            <img
              class="recipeImage"
              src="https://img.freepik.com/premium-vector/404-error-design-with-donut_76243-30.jpg"
              alt="error"
            />
          )}
          <h1 class="recipeTitle">{recipe.Name}</h1>
          <h3 class="recipeSubtitle">{recipe.RecipeCategory}</h3>
          <p class="recipeDescription">{recipe.Description}</p>
          <p class="servings">Serves: {recipe.RecipeServings}</p>
          <div class="dietTags">
            <ul>{recipe.Tags && recipe.Tags.map((tag) => <li>{tag}</li>)}</ul>
          </div>
          <div class="nutrition">
            <ul>
              <li>Calories: {recipe.Calories}</li>
              <li>Fat: {recipe.FatContent}</li>
              <li>Saturated Fat: {recipe.SaturatedFatContent}</li>
              <li>Cholestorol: {recipe.CholestorolContent}</li>
              <li>Salt: {recipe.SodiumContent}</li>
              <li>Carbs: {recipe.CarbohydrateContent}</li>
              <li>Fiber: {recipe.FiberContent}</li>
              <li>Sugar: {recipe.SugarContent}</li>
              <li>Protein: {recipe.ProteinContent}</li>
            </ul>
          </div>
          <div class="rating"></div>
        </div>
        <div class="mainRecipe">
          <div class="ingredients">
            <h2>Ingredients</h2>
            <ul>
              {recipe.Ingredients &&
                recipe.Ingredients.map((ingredient, index) => (
                  <li class="ingredient">
                    {recipe.IngredientQuantities[index]} {ingredient}
                  </li>
                ))}
            </ul>
          </div>
          <div class="method">
            <h2>Method</h2>
            <ol>
              {recipe.Instructions &&
                recipe.Instructions.map((instruction) => (
                  <li class="instruction">{instruction}</li>
                ))}
            </ol>
          </div>
        </div>
      </>
    );
  }
  //return <div>testing</div>;
  return <div class="recipe">{recipe && <RenderRecipe />}</div>;
};

export default RecipeDetail;
