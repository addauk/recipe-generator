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
      console.log(data._id);
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
      <div className="log-in" class="p-8">
        <div class="pb-4">
          <label htmlFor="email"></label>
          <input
            class="border border-gray-300 rounded-md px-4 py-2 w-75"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div class="pb-4">
          <label htmlFor="password"></label>
          <input
            class="border border-gray-300 rounded-md px-4 py-2 w-75"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div class="pt-4">
          <input
            class="inline-flex rounded-lg justify-center px-4 py-1 w-20 h-8 border border-black font-semibold text-sm mb-8"
            role="submit-button"
            id="submit"
            type="submit"
            value="Log In"
          />
        </div>
        <div>
          <input
            class="inline-flex rounded-lg justify-center px-4 py-1 w-20 h-8 border border-black font-semibold text-sm mb-8"
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
