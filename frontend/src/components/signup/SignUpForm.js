import React, { useState, useEffect } from "react";

const SignUpForm = ({ navigate }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
        console.log("SUCCESSFUL SIGN UP FORM SUBMISSION")
      } else {
        navigate("/signup");
        setErrorMessage("Invalid form submission, please complete all fields");
        console.log("FAILED SIGN UP FORM SUBMISSION")
      }
    });
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
    <div>
  <div>
    <div>
      <h2>Sign Up</h2>
    </div>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              placeholder="Username"
              id="userName"
              type="text"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <div>
            <input
              placeholder="Email"
              id="email"
              type="text"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        <div>
          <input
            placeholder="Password"
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <input id="submit" type="submit" value="Submit" />
        </div>
      </form>
      {errorMessage && <p role="error">{errorMessage}</p>}
    </div>
  </div>
</div>



  );
};

export default SignUpForm;
