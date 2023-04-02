import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import AddNewRecipe from "../addNewRecipe/addNewRecipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ingredient navigate={useNavigate()} />} />
      <Route path="/recipe/:id" element={<RecipeDetail navigate={useNavigate()} />} />
      <Route path="/recipe/new" element={<AddNewRecipe navigate={useNavigate()} />} />
    </Routes>
  );
}

export default App;
