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
  const [search, setSearch] = useState();

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
          limit: 12,
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
      setLoading(false);
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
      const index = updatedList.indexOf(event.target.value);
      if (index !== -1) {
        updatedList.splice(index, 1);
      }
      const lowerCaseIndex = lowerCaseList.indexOf(
        event.target.value.toLowerCase()
      );
      if (lowerCaseIndex !== -1) {
        lowerCaseList.splice(lowerCaseIndex, 1);
      }
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
    setSearchIngredients([]);
  };
  return (
    <div>
      <Navbar navigate={navigate} />
      <div className="bg-cover bg-repeat h-screen bg-background-body pt-16">
        <div className="sticky top-16 bg-orange-200 mx-auto mt-4 ml-10 mr-10 rounded-lg shadow-xl">
          <div className="recipe-generator"></div>
          <div
            className="ingredient-header"
            class="mb-8 flex justify-center text-3xl font-[5000]-cursive"
          >
            <div className="mt-5 ml-5">
              <h1 class="text-orange-600">What's in your Fridge?</h1>
            </div>
            <p class="ml-auto" style={{ cursor: "pointer" }} onClick={onclick}>
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
                ? "flex grid grid-flow-row grid-cols-7 grid-rows-15 truncate pl-4 font-bold"
                : "flex grid grid-flow-row grid-cols-7 grid-rows-15 pl-4 font-bold"
            }
          >
            {IngredientList.map((item, index) => (
              <div key={index} className="flex items-center">
                <input
                  value={item}
                  type="checkbox"
                  onChange={handleCheck}
                  checked={checked.includes(item)}
                  class="ml-10 mr-2"
                />
                <span className={isChecked(item)}>{item}</span>
              </div>
            ))}

            <div />
          </div>
          <div className="mt-5 mb-4 flex gap-10">
            <div>
              <div className="bg-orange-500 text-white rounded-lg shadow-lg py-2 px-2 ml-5 w-auto text-sm font-semibold">{`Items checked: ${checkedItems}`}</div>
            </div>
          </div>
          <div>
            <button
              type="button"
              class="w-40 ml-5 mb-5 mr-5 rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2"
              onClick={handleUncheckAll}
            >
              Uncheck All
            </button>
            <button
              type="submit"
              class="w-40 mb-5 rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2"
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
                <div class="mx-auto w-30 mb-5 rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2">
                  <h2 className="flex justify-center text-2xl font-[5000]-cursive">
                    Matched Recipes
                  </h2>
                </div>
                <AllRecipes recipes={matchedRecipes} />
                <div class="mx-auto">
                  <Pagination
                    amount={pageAmount.toString()}
                    handleClick={getRecipes}
                  ></Pagination>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Ingredient;
