import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "../login/Login";
import SignUpForm from "../signup/SignUpForm";
import UserPage from "../profile/UserPage";
import RecipeDetail from "../recipeDetail/RecipeDetail";
import AddNewRecipe from "../addNewRecipe/addNewRecipe";

function App() {
<<<<<<< HEAD
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Ingredient navigate={useNavigate()} />} />
           <Route path="/login" element={<LoginForm navigate={useNavigate()} setCurrentUser={setCurrentUser} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} setCurrentUser={setCurrentUser} />} />
=======
  return (
    <Routes>
      <Route path="/" element={<Ingredient navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
>>>>>>> f9d1dc03b400ea30e1e00fadea32ace356c0d2f9
      <Route
        path="/users/:id"
        element={<UserPage navigate={useNavigate()} />}
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
