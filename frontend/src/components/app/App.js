import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";
import RecipeDetail from "../recipeDetail/RecipeDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ingredient navigate={useNavigate()} />} />
      <Route
        path="/recipe/:id"
        element={<RecipeDetail navigate={useNavigate()} />}
      />
    </Routes>
  );
}

export default App;
