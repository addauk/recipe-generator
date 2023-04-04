import React, { useState, useEffect } from "react";

const Navbar = ({ navigate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));
    if (user) {
      setUser(user);
    }
  }, []);

  const logout = () => {
    console.log("LOGGING OUT");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
    console.log("Successful logout");
  };

  return (
    <div className="pb-20 flex bg-orange-200 font-bold">
      <nav className="z-50 fixed top-0 left-0 right-0 h-16 p2 pt-9 pb-9 mx-auto place-content-between  px-5 bg-amber-600 flex items-center">
        {user !== null ? (
          <div className="bg-amber-600 flex">
            <div
              className="p-3 text-lg cursor-pointer justify-left border rounded-lg bg-yellow-300 hover:bg-yellow-600"
              data-cy="homeButton"
              onClick={() => navigate("/")}
            >
              Home
            </div>
            <div className="p-3 text-lg absolute right-60" data-cy="username">
              {user ? user.userName : ""}
            </div>
            <div
              className="p-3 text-lg cursor-pointer absolute right-40 border rounded-lg bg-yellow-300 hover:bg-yellow-600"
              data-cy="my-profile"
              onClick={() => navigate(`/users/${user._id}`)}
            >
              Profile
            </div>
            <div
              className="p-3 text-lg cursor-pointer absolute right-5 border rounded-lg bg-yellow-300 hover:bg-yellow-600"
              data-cy="logoutButton"
              onClick={logout}
            >
              Log out
            </div>
          </div>
        ) : (
          <div className="bg-yellow-200 flex justify-right p-3 text-lg cursor-pointer rounded-lg">
            <div data-cy="homeButton" onClick={() => navigate("/")}>
              Home
            </div>
            <div
              className="p-3 text-lg cursor-pointer absolute right-5 top-2 border rounded-lg bg-yellow-200 hover:bg-yellow-600"
              data-cy="loginButton"
              onClick={() => navigate("/login")}
            >
              Log in
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
