import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import Recipe from "../recipe/Recipe";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Recipe navigate={useNavigate()} />} />
    </Routes>
  );
}

export default App;
