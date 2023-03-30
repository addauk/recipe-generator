import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import LoginForm from "../login/Login";
import SignUpForm from "../signup/SignUpForm";
import UserProfile from "../profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/login" element={<LoginForm navigate={useNavigate()} />} />
      <Route path="/signup" element={<SignUpForm navigate={useNavigate()} />} />
      <Route
        path="/user/:userId"
        element={<UserProfile navigate={useNavigate()} />}
      />
    </Routes>
  );
}

export default App;
