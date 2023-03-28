import React, { useState, useEffect } from "react";
import Recipe from "../recipe/Recipe";
import AllRecipes from "../allRecipes/AllRecipes";

const Ingredient = ({ navigate }) => {
  const ingredientList = [
    "Chicken",
    "Turkey",
    "Bacon",
    "Pepper",
    "Potato",
    "Milk",
    "Cheese",
    "Beef",
    "Pork",
    "Fish",
    "Shrimp",
    "Rice",
    "Pasta",
    "Carrot",
    "Mushroom",
    "Onion",
  ];
  const recipeList = [
    {
      image:
        "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/39/picM9Mhnw.jpg",
      title: "Chicken Casserole",
      cookingTime: "60",
      rating: "3",
      ingredients: [
        "Chicken",
        "Carrot",
        "Mushroom",
        "Flour",
        "Garlic",
        "Celery",
        "Onion",
      ],
      instructions:
        "Heat a knob of butter and ½ tbsp rapeseed or olive oil in a large frying pan.",
    },
    {
      image:
        "https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/47/picfnmxck.jpg",
      title: "Beef lasagne",
      cookingTime: "90",
      rating: "4",
      ingredients: [
        "Beef",
        "Onion",
        "Tomato",
        "Celery",
        "Stock",
        "Pasta",
        "Milk",
        "Cheese",
      ],
      instructions:
        "To make the Bolognese, heat the oil in a large heavy based saucepan over medium heat.",
    },
  ];

  const [checked, setChecked] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);

  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const handleUncheckAll = () => {
    setChecked([]);
  };

  const findRecipe = () => {
    const selectedIngredients = new Set(checked);
    const matchedRecipes = recipeList.filter((recipe) => {
      const recipeIngredients = new Set(recipe.ingredients);
      for (const ingredient of selectedIngredients) {
        if (!recipeIngredients.has(ingredient)) {
          return false;
        }
      }
      return true;
    });
    return matchedRecipes;
  };

  let checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  let isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const handleSubmit = (event) => {
    event.preventDefault();
    if (checked.length === 0) {
      throw "No Items Checked";
    } else {
      const matchedRecipes = findRecipe();
      setMatchedRecipes(matchedRecipes);
    }
  };

  return (
    <>
      <div className="recipe-generator"></div>
      <div className="ingredient-header"></div>
      <div className="list-container">
        <h2>Ingredients</h2>

        {ingredientList.map((item, index) => (
          <div key={index}>
            <input
              value={item}
              type="checkbox"
              onChange={handleCheck}
              checked={checked.includes(item)}
            />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}
        <div>{`Items checked are: ${checkedItems}`}</div>
        <button type="button" onClick={handleUncheckAll}>
          Uncheck All
        </button>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
        {matchedRecipes.length > 0 && (
          <div className="matched-recipes">
            <h2>Matched Recipes</h2>
            <AllRecipes recipes={matchedRecipes} />
          </div>
        )}
      </div>
    </>
  );
};

export default Ingredient;

// {matchedRecipes.map((recipe, index) => (
//   <div key={index}>
//     <h3>{recipe.title}</h3>
//   <ul>{recipe.ingredients.join(", ")}</ul>
//   <p>{recipe.instructions}</p>
//   </div>
// })
