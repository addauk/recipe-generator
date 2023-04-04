import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ user }) => {
  const navigate = useNavigate();
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
    <div className="user-profile">
      <h1>{user.userName}</h1>
      <br></br>
      {editing ? (
        <>
          <textarea
            data-cy="handle-bio"
            value={bio}
            onChange={handleBioChange}
          />
          <div className="buttons">
            <button data-cy="save-btn" onClick={handleSave}>
              Save
            </button>{" "}
            <br></br>
            <button data-cy="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p>{bio}</p>
          <br></br>
          <button data-cy="edit-bio" onClick={handleEdit}>
            Edit Bio
          </button>
          <br></br>
          <button data-cy="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default UserProfile;
