import React, { useState, useEffect } from "react";

const UserProfile = ({ user, navigate }) => {
  const [bio, setBio] = useState(user.bio);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);

  // useEffect(() => {
  //   if (!window.localStorage.getItem("token")) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    console.log("USER INFO ENTERING PUT REQUEST: " + user);
    fetch(`/users/${user._id}`, {
      method: "PUT",
      body: JSON.stringify({ bio }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log("AFTER PUT REQUEST: " + data));
    setEditing(false);
  };

  const handleCancel = () => {
    setBio(user.bio);
    setEditing(false);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleLogout = () => {
    console.log("LOGGING OUT");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userData");
    setCurrentUser(null);
    navigate("/login");
    console.log("Successful logout");
  };

  return (
    <div className="user-profile" class="p-8">
      <h1>{user.userName}</h1>
      <br></br>
      {editing ? (
        <>
          <div>
            <textarea
              class="border border-black"
              value={bio}
              onChange={handleBioChange}
            />
          </div>
          <div className="save-btn" data-cy="save-btn">
            <button
              class="inline-flex rounded-lg justify-center px-4 py-1 w-20 h-8 border border-black font-semibold text-sm mb-8"
              onClick={handleSave}
            >
              Save
            </button>{" "}
            <br></br>
          </div>
          <div className="cancel-btn" data-cy="cancel-btn">
            <button
              class="inline-flex rounded-lg justify-center px-4 py-1 w-20 h-8 border border-black font-semibold text-sm"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>{bio}</p>
            <br></br>
          </div>
          <div className="edit-button" data-cy="edit-button">
            <button
              class="inline-flex rounded-lg justify-center px-4 py-1 w-20 h-8 border border-black font-semibold text-sm"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
          <br></br>
          <div className="logout-btn" data-cy="logout-btn">
            <button
              class="inline-flex rounded-lg justify-center px-4 py-1 w-20 h-8 border border-black font-semibold text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
