import React, { useState, useEffect } from "react";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   if (
  //     window.localStorage.getItem("token") &&
  //     window.localStorage.getItem("token") !== "undefined"
  //   ) {
  //     const data = JSON.parse(window.localStorage.getItem("userData"));
  //     console.log(data);
  //     navigate(`/user/${getUserId(data)}`);
  //   } else {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const getUserId = async (data) => {
    let userResponse = await fetch(`/users/${data._id}`); // replace `/users/${data.userId}` with the actual endpoint to fetch user data
    let userData = await userResponse.json();
    let userId = userData._id;
    return userId;
  };

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
      console.log("Successful login");
      const data = await response.json();
      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("userData", JSON.stringify(data.user));
      // navigate to user profile page with user ID
      navigate(`/user/${getUserId(data.user)}`);
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
