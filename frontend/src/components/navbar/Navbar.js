import React, { useState, useEffect } from "react";
// import img from "../../eatGPT.png";
import Logo from "../logo/Logo";

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
    <div className="flex font-bold">
      <nav className="z-50 fixed top-0 left-0 right-0 h-16 p2 pt-9 pb-9 mx-auto place-content-between  px-5 bg-white-100 flex items-center">
        {user !== null ? (
          <div>
            <Logo onClick={() => navigate("/")} />
            <div
              className="p-3 text-lg absolute right-44 top-2"
              data-cy="username"
            >
              {user ? user.userName : ""}
            </div>
            <div
              className="p-3 text-lg cursor-pointer absolute right-24 text-white top-2 border rounded-lg bg-orange-500 hover:bg-orange-600 scale-75"
              data-cy="my-profile"
              onClick={() => navigate(`/users/${user._id}`)}
            >
              Profile
            </div>
            <div
              className="p-3 text-lg cursor-pointer text-white absolute right-4 top-2 border rounded-lg bg-orange-500 hover:bg-orange-600 scale-75"
              data-cy="logoutButton"
              onClick={logout}
            >
              Log out
            </div>
          </div>
        ) : (
          <div>
            <Logo onClick={() => navigate("/")} />
            <div
              className="p-3 text-lg cursor-pointer text-white absolute right-4 top-2 border rounded-lg bg-orange-500 hover:bg-orange-600 scale-75"
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
