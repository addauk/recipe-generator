import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "../login/Login";
import SignUpForm from "../signup/SignUpForm";

function App() {
  return <Routes>
    <Route path="/" element={<LoginForm navigate={useNavigate()} />} />
    <Route path="/login" element={
      <LoginForm navigate={useNavigate()} />
    }
    />
    <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
  </Routes>;
}

export default App;
