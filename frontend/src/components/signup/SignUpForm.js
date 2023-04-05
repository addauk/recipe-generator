import React, { useState, useEffect } from "react";

const SignUpForm = ({ navigate }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== "undefined"
    ) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleBioChange();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password,
        bio: bio,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
        console.log("SUCCESSFUL SIGN UP FORM SUBMISSION");
      } else {
        navigate("/signup");
        setErrorMessage("Invalid form submission, please complete all fields");
        console.log("FAILED SIGN UP FORM SUBMISSION");
      }
    });
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div className="bg-cover bg-no-repeat min-h-screen bg-background-body p-8">
      <div className="bg-orange-200 w-1/2 mx-auto p-8 mt-12 rounded-lg shadow-xl">
        <div className="flex min-h-full pb-4">
          <h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-orange-600">
            Sign Up
          </h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div class="pb-4">
                <input
                  className="shadow appearance-none border rounded-lg w-full text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Username"
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div class="pb-4">
                <input
                  className="shadow appearance-none border rounded-lg w-full text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
            </div>
            <div class="pb-4">
              <input
                className="shadow appearance-none border rounded-lg w-full text-center py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="flex justify-center pt-4">
              <input
                class="w-full rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 eatgpt-2"
                id="submit"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
          {errorMessage && <p role="error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
