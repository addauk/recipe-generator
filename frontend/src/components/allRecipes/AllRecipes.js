import Recipe from "../recipe/Recipe";
import React from "react";

const AllRecipes = (props) => {
  return (
    <div class="mt-4 grid grid-cols-4 gap-4">
      {props.recipes.map((recipe, index) => (
        <Recipe
          key={index}
          src={recipe.image}
          title={recipe.title}
          cookingTime={recipe.cookingTime}
          rating={recipe.rating}
          image={"2"}
        />
      ))}
    </div>
  );
};

export default AllRecipes;
