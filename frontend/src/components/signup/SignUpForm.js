import React, { useState, useEffect } from "react";


const SignUpForm = ({ navigate }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (
      window.localStorage.getItem("token") &&
      window.localStorage.getItem("token") !== "undefined"
    ) {
      navigate("/signup");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch("/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.status === 201) {
        navigate("/login");
      } else {
        navigate("/signup");
      }
    });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
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
              placeholder="First Name"
              id="firstName"
              type="text"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
        </div>
        <div>
          <div>
            <input
              placeholder="Last Name"
              id="lastName"
              type="text"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
        </div>
        <div>
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
    </div>
  </div>
</div>



  );
};

export default SignUpForm;
