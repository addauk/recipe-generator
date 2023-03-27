import "./App.css";
import Ingredient from "../ingredient/Ingredient";
import { useNavigate, Routes, Route } from "react-router-dom";

function App() {
  return <Routes>
    <Route path="/" element={<Ingredient navigate={useNavigate()} />}>

    </Route>

  </Routes>;
}

export default App;
