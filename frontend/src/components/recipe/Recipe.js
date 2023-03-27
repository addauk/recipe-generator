import React, { useState, useEffect } from "react";

const Recipe = ({ navigate }) => {
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    fetchRecipe();
  }, []);

  async function fetchRecipe() {
    setRecipe({});
  }

  return (
    <div class="recipe">
      <div class="recipeHeader">
        <img class="recipeImage" src={recipe.image} alt={recipe.altText} />
        <h1 class="recipeTitle">{recipe.title}</h1>
        <h3 class="recipeSubtitle">{recipe.subtitle}</h3>
        <div class="dietTags">
          <ul>{recipe.tags && recipe.tags.map((diet) => <li>{diet}</li>)}</ul>
        </div>
        <div class="nutrition"></div>
        <div class="rating"></div>
      </div>
      <div class="mainRecipe">
        <div class="ingredients">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((ingredient) => (
                <li class="ingredient">{ingredient}</li>
              ))}
          </ul>
        </div>
        <div class="method">
          <h2>Method</h2>
          <ol>
            {recipe.method &&
              recipe.method.map((instruction) => (
                <li class="instruction">{instruction}</li>
              ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
