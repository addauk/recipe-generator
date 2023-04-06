import React from "react";
import { useNavigate } from "react-router-dom";

const Recipe = (props) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate("/recipe/" + props.recipe._id);
  };
  return (
    <div class="ml-4 py-1">
      <img
        src={props.src}
        onError={(event) => {
          event.target.onerror = null;
          event.target.src =
            "https://img.freepik.com/premium-vector/404-error-design-with-donut_76243-30.jpg";
        }}
        alt="Error"
        class="mt-3 border w-60 h-60"
      ></img>
      <div class="ml-3">
        <h1
          class="mt-2 w-40 rounded-md font-bold text-orange-600 truncate"
          data-cy="foodName"
        >
          {props.title}
        </h1>
        <p class=" text-orange-600 truncate" data-cy="foodTime">
          Cooking Time: {props.cookingTime}
        </p>
        <p class="text-orange-600" data-cy="rating">
          Calories: {props.calories}
        </p>
      </div>
      <button
        type="press"
        class="w-40 mt-5 ml-5 mb-5 mr-5 rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2 "
        data-cy="press"
        onClick={handlePress}
      >
        View Recipe
      </button>
    </div>
  );
};
export default Recipe;

// Navigate View recipe to recipe detail
// Fetch from backend by feeding the recipe ID
// Return recipe detail components
