import Recipe from "../recipe/Recipe";
import React from "react";

const AllRecipes = (props) => {
  function extractTime(str) {
    const regex = /PT(?:(\d+)H)?(\d+)M/;
    const matches = str.match(regex);
    if (matches) {
      const hours = matches[1] ? parseInt(matches[1]) : 0;
      const minutes = parseInt(matches[2]);
      if (hours === 0) {
        return `${minutes} minutes`;
      } else if (minutes === 0) {
        return `${hours} hours`;
      } else {
        return `${hours} hours, ${minutes} minutes`;
      }
    }
    return "Unknown";
  }

  return (
    <div class="mt-4 grid grid-cols-6 gap-3 mr-2">
      {props.recipes.map((recipe, index) => (
        <Recipe
          key={index}
          src={recipe.ImageLinks[0]}
          title={recipe.Name}
          cookingTime={extractTime(recipe.CookTime)}
          calories={recipe.Calories}
          recipe={recipe}
        />
      ))}
    </div>
  );
};

export default AllRecipes;
