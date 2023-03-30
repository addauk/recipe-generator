import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "../login/Login";
import SignUpForm from "../signup/SignUpForm";
import UserProfile from "../profile/Profile";
import RecipeDetail from "../recipeDetail/RecipeDetail";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route
        path="/user/:_id"
        element={<UserProfile navigate={useNavigate()} />}
      />
      <Route path="/" element={<Ingredient navigate={useNavigate()} />} />
      <Route
        path="/recipe/:id"
        element={<RecipeDetail navigate={useNavigate()} />}
      />
    </Routes>
  );
}

export default App;
