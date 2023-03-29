const Navbar = ({ navigate, userData, storeUserData }) => {
  const logout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userData");
    storeUserData("");
    navigate("/login");
  };

  return (
    <nav className="bg-red-500 flex justify-between">
      <div
        className="p-3 text-lg cursor-pointer"
        data-cy="homeButton"
        onClick={() => navigate("/")}
      >
        Home
      </div>
      <div className="p-3 text-lg" data-cy="username">
        {userData ? userData.username : ""}
      </div>
      <div
        className=""
        data-cy="my-profile"
        onClick={() => navigate("/profile")}
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
    </nav>
  );
};

export default Navbar;
