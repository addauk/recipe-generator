import React, { useState } from "react";
import Navbar from "../navbar/Navbar";

const UserProfile = ({ user, navigate }) => {
  const [bio, setBio] = useState(user.bio);
  const [editing, setEditing] = useState(false);

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

  return (
    <div>
      <Navbar navigate={navigate} />
      <div className="user-profile">
        <h1>{user.userName}</h1>
        <br></br>
        {editing ? (
          <>
            <textarea value={bio} onChange={handleBioChange} />
            <div className="buttons">
              <button onClick={handleSave}>Save</button> <br></br>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </>
        ) : (
          <>
            <p>{bio}</p>
            <br></br>
            <button onClick={handleEdit}>Edit Bio</button>
            <br></br>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
