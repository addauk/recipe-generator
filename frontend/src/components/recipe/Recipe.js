import React from "react";
import { useNavigate } from "react-router-dom";

const Recipe = (props) => {
  const navigate = useNavigate();

  const handlePress = () => {
    navigate("/recipes/" + props.recipe._id, { state: props });
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
        class="mt-3 border border-red-700 w-60 h-60"
      ></img>
      <h1
        class="mt-2 w-40 rounded-md  font-bold text-red-800 truncate"
        data-cy="foodName"
      >
        {props.title}
      </h1>
      <p class="font-bold text-red-800" data-cy="foodTime">
        Cooking Time: {props.cookingTime}
      </p>
      <p class="font-bold text-red-800" data-cy="rating">
        Calories: {props.calories}
      </p>
      <button
        type="press"
        class="mb-4 ml-10 mt-3 w-40 rounded-lg border border-pink-700 bg-orange-200 hover:bg-orange-600"
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
