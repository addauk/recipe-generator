import React, { useState, useEffect } from "react";
import Recipe from "../recipe/Recipe";
import AllRecipes from "../allRecipes/AllRecipes";
import Spinner from "../spinner/spinner";
import IngredientList from "../ingredientList/IngredientList";

const Ingredient = ({ navigate }) => {
  const [checked, setChecked] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unchecked, setUnchecked] = useState(true);

  const FetchData = () => {
    setLoading(true);
    fetch(
      "https://westeurope.azure.data.mongodb-api.com/app/recipe_api-eixns/endpoint/recipes"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const result = JSON.parse(JSON.stringify(data));
        setChecked(
          checked.map((str) => {
            return str.toLowerCase();
          })
        );
        const rec = result.filter((recipe) => {
          return searchIngredients.every((ingredient) =>
            recipe.Ingredients.includes(ingredient)
          );
        });
        setLoading(false);
        setMatchedRecipes(rec);
        setSearchIngredients([]);
        setChecked([]);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const handleCheck = (event) => {
    let updatedList = [...checked];
    let lowerCaseList = [...searchIngredients];

    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
      lowerCaseList = [...searchIngredients, event.target.value.toLowerCase()];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
    setSearchIngredients(lowerCaseList);
  };

  const handleUncheckAll = () => {
    setChecked([]);
    setCollapse(false);
    setUnchecked(true);
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
      FetchData();

      setCollapse(true);
      setUnchecked(false);
    }
  };

  const onclick = () => {
    setCollapse(!collapse);
  };
  return (
    <div class="bg-orange-200">
      <div className="recipe-generator"></div>
      <div
        className="ingredient-header"
        class="mt-16 mb-8 flex justify-center text-2xl font-bold"
      >
        <h1 class="mx-auto">Ingredients</h1>
        <p class="ml-auto" style={{ cursor: "pointer" }} onClick={onclick}>
          {" "}
          {collapse ? "+" : "-"}{" "}
        </p>
      </div>
      <div
        className="list-container"
        style={{
          height: collapse ? "0px" : "200px",
          transition: "height 0.5s ease-in",
        }}
        class={
          collapse
            ? "flex grid grid-flow-col grid-rows-5 gap-4 truncate pl-4"
            : "flex grid grid-flow-col grid-rows-5 gap-4 pl-4"
        }
      >
        {IngredientList.map((item, index) => (
          <div key={index} className="flex items-center">
            <input
              value={item}
              type="checkbox"
              onChange={handleCheck}
              checked={checked.includes(item)}
              class="mr-2"
            />
            <span className={isChecked(item)}>{item}</span>
          </div>
        ))}

        <div />
      </div>
      <div className="mt-5 mb-4 flex gap-10">
        <div>
          <div>{`Items checked are: ${checkedItems}`}</div>
        </div>
      </div>
      <div>
        <button
          type="button"
          class="mr-5 w-40 rounded-lg border border-pink-700 bg-orange-200 hover:bg-orange-600 "
          onClick={handleUncheckAll}
        >
          Uncheck All
        </button>
        <button
          type="submit"
          class="w-40 rounded-lg border border-pink-700 bg-orange-200 hover:bg-orange-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        {loading === true && <Spinner></Spinner>}
      </div>

      <div>
        {matchedRecipes.length > 0 && unchecked === false && (
          <div
            className="matched-recipes"
            data-cy="matched-recipes"
            class=" grid-auto-rows mt-4 grid"
          >
            <h2 className="flex justify-center text-2xl font-bold">
              Matched Recipes
            </h2>
            <AllRecipes recipes={matchedRecipes} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Ingredient;
