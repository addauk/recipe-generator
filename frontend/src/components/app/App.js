import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../login/Login";
import SignUpForm from "../signup/SignUpForm";
import UserPage from "../profile/UserPage";
import RecipeDetail from "../recipeDetail/RecipeDetail";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState(
    JSON.parse(window.localStorage.getItem("userData"))
  );

  console.log(currentUser);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Ingredient navigate={useNavigate()} currentUser={currentUser} />
        }
      />
      <Route
        path="/login"
        element={
          <LoginForm navigate={useNavigate()} setCurrentUser={setCurrentUser} />
        }
      />
      <Route
        path="/signup"
        element={
          <SignUpForm
            navigate={useNavigate()}
            setCurrentUser={setCurrentUser}
          />
        }
      />
      <Route
        path="/users/:id"
        element={<UserPage navigate={useNavigate()} userData={userData} />}
      />
      <Route
        path="/recipe/:id"
        element={<RecipeDetail navigate={useNavigate()} />}
      />
    </Routes>
  );
}

export default App;
