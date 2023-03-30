import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import RecipeDetail from "../recipeDetail/RecipeDetail";

function App() {
  return (
    <Routes>
      <Route
        path="/recipe/:id"
        element={<RecipeDetail navigate={useNavigate()} />}
      />
    </Routes>
  );
}

export default App;
