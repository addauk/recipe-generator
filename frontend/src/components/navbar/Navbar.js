import React, { useState, useEffect } from "react";

const Navbar = ({ navigate }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("userData"));
    if (user) {
      setUser(user);
    }
    console.log(user);
  }, []);

  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  return (
    <div>
      {user !== null ? (
        <nav className="bg-red-500 flex justify-between">
          <div>
            <div
              className="p-3 text-lg cursor-pointer"
              data-cy="homeButton"
              onClick={() => navigate("/")}
            >
              Home
            </div>
            <div className="p-3 text-lg" data-cy="username">
              {user ? user.userName : ""}
            </div>
            <div
              className=""
              data-cy="my-profile"
              onClick={() => navigate(`/users/${user._id}`)}
            >
              Profile
            </div>
            <div
              className="p-3 text-lg cursor-pointer border rounded-t bg-yellow-300 hover:bg-yellow-600"
              data-cy="logoutButton"
              onClick={logout}
            >
              Log out
            </div>
          </div>
        </nav>
      ) : (
        <nav className="bg-red-500 flex justify-between">
          <div
            className="p-3 text-lg cursor-pointer"
            data-cy="homeButton"
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className="p-3 text-lg cursor-pointer border rounded-t bg-yellow-300 hover:bg-yellow-600"
            data-cy="loginButton"
            onClick={() => navigate("/login")}
          >
            Log in
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
