const Recipe = (props) => {
  return (
    <div class="ml-4 py-1">
      <img
        src={props.src}
        alt="food"
        class="mt-3 w-60 border border-red-700"
      ></img>
      <h1
        class="mt-2 w-40 rounded-md  font-bold text-red-800"
        data-cy="foodName"
      >
        {props.title}
      </h1>
      <p class="font-bold text-red-800" data-cy="foodTime">
        Cooking Time: {props.cookingTime} Minutes
      </p>
      <p class="font-bold text-red-800" data-cy="rating">
        Rating: {props.rating}
      </p>
      <button
        type="submit"
        class="mb-4 ml-10 mt-3 w-40 rounded-lg border border-pink-700 bg-orange-200 hover:bg-orange-600"
        data-cy="submit"
      >
        View Recipe
      </button>
    </div>
  );
};
export default Recipe;
