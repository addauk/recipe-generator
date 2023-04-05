import React, { useState, useEffect } from "react";

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      <div className="bg-cover bg-no-repeat min-h-screen bg-background-body p-8">
        <div className="bg-orange-200 w-1/2 mx-auto p-8 mt-12 rounded-lg shadow-xl">
          <div className="eatgpt-1" class="pb-4">
            <label
              className="block text-gray-700 font-bold eatgpt-1"
              htmlFor="email"
            ></label>
            <input
              className="shadow appearance-none border rounded-lg w-full text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="eatgpt-2 pb-4">
            <label htmlFor="password"></label>
            <input
              class="shadow appearance-none border text-center rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="flex justify-center pt-4">
            <input
              class="w-full rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 eatgpt-2"
              role="submit-button"
              id="submit"
              type="submit"
              value="Log In"
            />
          </div>
          <div className="flex justify-center pt-4">
            <input
              class="w-full rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 eatgpt-2"
              role="signup-button"
              id="signup"
              type="button"
              value="Sign Up"
              onClick={handleSignUp}
            />
          </div>
          {errorMessage && <p role="error">{errorMessage}</p>}
        </div>
      </div>
    </form>
  );
};

export default LogInForm;
