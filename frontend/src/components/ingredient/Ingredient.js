import React, { useState, useEffect } from "react";
import Recipe from "../recipe/Recipe";
import AllRecipes from "../allRecipes/AllRecipes";
import Spinner from "../spinner/spinner";
import IngredientList from "../ingredientList/IngredientList";
import Navbar from "../navbar/Navbar";
import Pagination from "../pagination/pagination";

const Ingredient = ({ navigate }) => {
  const [checked, setChecked] = useState([]);
  const [matchedRecipes, setMatchedRecipes] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unchecked, setUnchecked] = useState(true);
  const [pageAmount, setPageAmount] = useState();

  const getRecipes = async (skip) => {
    setLoading(true);
    try {
      const response = await fetch("/recipes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetIngredients: searchIngredients,
          skip: skip,
          limit: 10,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPageAmount(Math.ceil(data.totalMatches / 10));
      // if (!Array.isArray(data.result)) {
      //   throw new Error("Data is not an array");
      // }

      await setMatchedRecipes(data.recipes);
      console.log(matchedRecipes);
      setLoading(false);
      // setSearchIngredients([]);
      setChecked([]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
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
    setSearchIngredients([]);
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
      alert("No Items Checked");
    } else {
      getRecipes();

      setCollapse(true);
      setUnchecked(false);
    }
  };

  const onclick = () => {
    setCollapse(!collapse);
  };
  return (
    <div>
      <Navbar navigate={navigate} />
      <div className="recipe-generator bg-orange-600"></div>
      <div class="bg-orange-200">
        <div>
          <div className="ingredient-header">
            <h1 class="mb-4 flex justify-center text-2xl font-bold">
              Ingredients
            </h1>
          </div>

          <p
            class="ml-auto flex justify-center"
            style={{ cursor: "pointer" }}
            onClick={onclick}
          >
            {" "}
            {collapse ? "+" : "-"}{" "}
          </p>
        </div>
        <div
          className="list-container"
          style={{
            height: collapse ? "0px" : "500px",
            transition: "height 0.5s ease-in",
          }}
          class={
            collapse
              ? "flex grid grid-flow-row grid-cols-7 grid-rows-15 truncate pl-4"
              : "flex grid grid-flow-row grid-cols-7 grid-rows-15 pl-4"
          }
        >
          {IngredientList.map((item, index) => (
            <div key={index}>
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
        </div>
      </div>
      <div className="mt-5 mb-4 flex gap-5 justify-center">
        <div>
          <div>{`Items checked are: ${checkedItems}`}</div>

          <div className="flex justify-center p-3">
            <button
              type="button"
              class="w-40 rounded-lg border shadow-2xl bg-yellow-300 hover:bg-yellow-600 justify-center font-bold"
              onClick={handleUncheckAll}
            >
              Uncheck All
            </button>
            <button
              type="submit"
              class="w-40 rounded-lg border shadow-2xl bg-yellow-300 hover:bg-yellow-600 justify-center font-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <br></br>
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
                <Pagination
                  amount={pageAmount.toString()}
                  handleClick={getRecipes}
                ></Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredient;
