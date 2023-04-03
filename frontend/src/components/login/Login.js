import React, { useState, useEffect } from "react";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== "undefined"
    ) {
      const data = JSON.parse(window.localStorage.getItem("userData"));
      navigate(`/users/${data._id}`);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch("/tokens", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.status !== 201) {
      navigate("/login");
      setErrorMessage("Invalid username or password");
    } else {
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userData", JSON.stringify(data.user));
      console.log(window.localStorage.getItem("userData"));
      await setCurrentUser(data.user);
      navigate(`/users/${data.user._id}`);
      console.log("Successful login");
    }
  };

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <label htmlFor="email"></label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password"></label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <input
            role="submit-button"
            id="submit"
            type="submit"
            value="Log In"
          />
        </div>
        <div>
          <input
            role="signup-button"
            id="signup"
            type="button"
            value="Sign Up"
            onClick={handleSignUp}
          />
        </div>
        {errorMessage && <p role="error">{errorMessage}</p>}
      </div>
    </form>
  );
};

export default LogInForm;
