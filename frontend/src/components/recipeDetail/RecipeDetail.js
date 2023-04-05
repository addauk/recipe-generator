import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar";

const RecipeDetail = ({ navigate }) => {
  const [recipe, setRecipe] = useState();
  //const location = useLocation();
  //const [token, setToken] = useState(window.localStorage.getItem("token"));
  const params = useParams();
  // console.log(RecipeId);
  useEffect(() => {
    getRecipe();
  }, []);

  async function getRecipe() {
    const response = await fetch(`/recipes/${params.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setRecipe(data);
  }

  // async function fetchRecipe() {
  //setRecipe(location.state.recipe);
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
  // const url = "/recipes/" + params.id;
  // const response = await fetch(url, {
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
  // });

  //   const data = await response.json();
  //   // window.localStorage.setItem("token", data.token);
  //   // setToken(window.localStorage.getItem("token"));
  //   setRecipe(data.recipe);
  // }

  if (recipe) {
    return (
      <>
        <div className="bg-cover bg-repeat bg-background-body">
          <div className="recipe-container" class="flex p-12">
            <Navbar navigate={navigate} />
            <div className="bg-orange-200 w-1/2 mx-auto p-8 rounded-lg shadow-xl">
              <div className="recipeHeader" class=" mt-8 mb-4 ">
                <div>
                  <h1
                    className="recipeTitle"
                    class="flex justify-center text-orange-600 font-bold text-3xl font-[5000]-cursive"
                  >
                    {recipe.Name}
                  </h1>
                </div>
                <div class="">
                  <div
                    className="recipe-image justify-center"
                    class="flex mt-3"
                  >
                    {Array.isArray(recipe.ImageLinks) &&
                    recipe.ImageLinks[0] !== "" ? (
                      <img
                        class="mx-auto flex w-1/2 shadow-lg"
                        className="recipeImage"
                        src={recipe.ImageLinks[0]}
                        alt=""
                      />
                    ) : (
                      <img
                        className="recipeImage"
                        src="https://img.freepik.com/premium-vector/404-error-design-with-donut_76243-30.jpg"
                        alt="error"
                      />
                    )}
                  </div>
                  <div className="dietTags" class="flex justify-right">
                    <ul>
                      {recipe.Tags && <li class="mt-5">{recipe.Tags}</li>}
                    </ul>
                  </div>
                  <div className="nutrition" class="flex justify-between">
                    <div class="shadow-lg">
                      <table class="border-separate border-spacing-2 table-fixed w-full h-26">
                        <thead>
                          <tr>
                            <th class="bg-orange-300 font-sm font-light px-6 w-1/9">
                              Kcal
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-3 w-1/9">
                              Fat
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-3 w-1/9">
                              Saturates
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-0.5 w-1/9">
                              Cholesterol
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-3 w-1/9">
                              Salt
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-3 w-1/9">
                              Carbs
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-3 w-1/9">
                              Fibre
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-3 w-1/9">
                              Sugar
                            </th>
                            <th class="bg-orange-300 font-sm font-light px-3 w-1/9">
                              Protein
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.Calories}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.FatContent}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.SaturatedFatContent}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.CholesterolContent}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.SodiumContent}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.CarbohydrateContent}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.FiberContent}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.SugarContent}
                            </td>

                            <td class="bg-orange-300 font-sm font-light px-3 w-1/9 text-center">
                              {recipe.ProteinContent}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="mb-4 mt-5 rounded-md w-40 bg-orange-500 py-2 px-2 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2">
                    <h2 class="text-xl font-semibold"> My Inspiration</h2>
                  </div>
                  <div>
                    <p
                      className="recipeDescription mt-4"
                      class="flex mb-4 text-justify"
                    >
                      {recipe.Description}
                    </p>
                  </div>
                  <div className="recipe-info">
                    <p className="servings">Serves: {recipe.RecipeServings}</p>
                  </div>
                  <div className="rating"></div>
                </div>
              </div>
              <div className="mainRecipe">
                <div className="ingredients bg-orange-100 w-1/3 shadow-md rounded-lg">
                  <div class="mb-4 rounded-md w-40 bg-orange-500 py-2 px-2 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2">
                    <h2 class=" text-xl font-semibold justify-center">
                      Ingredients
                    </h2>
                  </div>
                  <ul>
                    {recipe.Ingredients &&
                      recipe.Ingredients.map((ingredient, index) => (
                        <li className="ingredient ml-3">
                          {recipe.IngredientQuantities[index]} {ingredient}
                        </li>
                      ))}
                  </ul>
                </div>
                <div
                  className="method"
                  class=" mt-5 bg-orange-100  shadow-md rounded-lg"
                >
                  <div class="mb-4 rounded-md w-40 bg-orange-500 py-2 px-2 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2">
                    <h2 class="text-xl font-semibold">Method</h2>
                  </div>
                  <ol
                    type="1"
                    start="1"
                    class="ml-7"
                    style={{ listStyleType: "decimal" }}
                  >
                    {recipe.Instructions &&
                      recipe.Instructions.map((instruction, index) => (
                        <li key={index} className="instruction">
                          {instruction}
                        </li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return;
  }
};

export default RecipeDetail;
