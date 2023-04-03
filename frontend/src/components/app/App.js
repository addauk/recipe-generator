import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../login/Login";
import SignUpForm from "../signup/SignUpForm";
import UserPage from "../profile/UserPage";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import AddNewRecipe from "../addNewRecipe/addNewRecipe";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Ingredient navigate={useNavigate()} />} />
           <Route path="/login" element={<LoginForm navigate={useNavigate()} setCurrentUser={setCurrentUser} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} setCurrentUser={setCurrentUser} />} />
      <Route
        path="/users/:id"
        element={<UserPage navigate={useNavigate()} currentUser={currentUser} />}
      />
      <Route
        path="/recipe/:id"
        element={<RecipeDetail navigate={useNavigate()} />}
      />
      <Route path="/recipe/new" element={<AddNewRecipe navigate={useNavigate()} setCurrentUser={setCurrentUser}/>}/>
    </Routes>
  );
}

export default App;
