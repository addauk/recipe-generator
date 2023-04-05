import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "../login/Login";
import SignUpForm from "../signup/SignUpForm";
import UserPage from "../profile/UserPage";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import AddNewRecipe from "../addNewRecipe/addNewRecipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Ingredient navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route
        path="/users/:id"
        element={<UserPage navigate={useNavigate()} />}
      />
      <Route
        path="/recipe/:id"
        element={<RecipeDetail navigate={useNavigate()} />}
      />
      <Route path="/recipe/new" element={<AddNewRecipe navigate={useNavigate()}/>}/>
    </Routes>
  );
}

export default App;
