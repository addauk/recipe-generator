import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState();
  const params = useParams();
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

  if (recipe) {
    return (
      <>
        <div className="recipe-container" class="flex p-12">
          <div>
            <div className="recipeHeader" class="flex mt-8 mb-8 ">
              <div>
                <h1 className="recipeTitle" class="flex text-4xl font-bold">
                  {recipe.Name}
                </h1>
              </div>
              <div className="recipe-image" class=" flex mt-16 ">
                {Array.isArray(recipe.ImageLinks) &&
                recipe.ImageLinks[0] !== "" ? (
                  <img
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
            </div>
            <div>
              <h3
                className="recipeSubtitle"
                class="flex mb-4 text-xl font-semibold"
              >
                {recipe.RecipeCategory}
              </h3>
            </div>
            <div>
              <p className="recipeDescription" class="flex mb-4 text-justify">
                {recipe.Description}
              </p>
            </div>
            <div className="recipe-info">
              <p className="servings">Serves: {recipe.RecipeServings}</p>
              <div className="dietTags">
                <ul>
                  {recipe.Tags && recipe.Tags.map((tag) => <li>{tag}</li>)}
                </ul>
              </div>
              <div className="nutrition" class="">
                <div>
                  <table class="mb-8 rounded-lg border-separate border-spacing-2 border border-slate-500 ...">
                    <thead>
                      <tr>
                        <th class="border bg-slate-200 border-slate-600 ...">
                          kcal
                        </th>
                        <th class="border rounded -full border-slate-600 ...">
                          fat
                        </th>
                        <th class="border border-slate-600 ...">saturates</th>
                        <th class="border border-slate-600 ...">cholesterol</th>
                        <th class="border border-slate-600 ...">salt</th>
                        <th class="border border-slate-600 ...">carbs</th>
                        <th class="border border-slate-600 ...">fibre</th>
                        <th class="border border-slate-600 ...">sugar</th>
                        <th class="border border-slate-600 ...">protein</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="border border-slate-700 ...">
                          {recipe.Calories}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.FatContent}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.SaturatedFatContent}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.CholesterolContent}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.SodiumContent}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.CarbohydrateContent}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.FiberContent}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.SugarContent}
                        </td>

                        <td class="border border-slate-700 ...">
                          {recipe.ProteinContent}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="rating"></div>
              </div>
            </div>
            <div className="mainRecipe">
              <div className="ingredients">
                <h2 class="flex mb-4 text-xl font-semibold">Ingredients</h2>
                <ul>
                  {recipe.Ingredients &&
                    recipe.Ingredients.map((ingredient, index) => (
                      <li className="ingredient">
                        {recipe.IngredientQuantities[index]} {ingredient}
                      </li>
                    ))}
                </ul>
              </div>
              <div className="method">
                <h2 class="flex mt-4 mb-4 text-xl font-semibold">Method</h2>
                <ol type="1" start="1" style={{ listStyleType: "decimal" }}>
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
      </>
    );
  } else {
    return;
  }
};

export default RecipeDetail;
