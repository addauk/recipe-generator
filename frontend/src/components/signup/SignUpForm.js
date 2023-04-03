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
      navigate("/signup");
      // This will need to change to navigate to the homepage when a token is present
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

  const handleBioChange = () => {
    setBio("Tell us about yourself!");
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
    <div class="p-8">
      <div>
        <div class="pb-4">
          <h2 class="text-2xl font-bold">Sign Up</h2>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <div class="pb-4">
                <input
                  class="border border-gray-300 rounded-md px-4 py-2 w-75"
                  placeholder="Username"
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={handleUserNameChange}
                />
              </div>
              <div class="pb-4">
                <input
                  class="border border-gray-300 rounded-md px-4 py-2 w-75"
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
                class="border border-gray-300 rounded-md px-4 py-2 w-75"
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <input
                class="inline-flex rounded-lg justify-center px-4 py-1 w-20 h-8 border border-black font-semibold text-sm mb-8"
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
