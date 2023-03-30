import React, { useState } from "react";

const UserProfile = ({ user }) => {
  const [bio, setBio] = useState(user.bio);
  const [editing, setEditing] = useState(false);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify({ bio }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
    <div className="user-profile">
      <h1>{user.userName}</h1>
      {editing ? (
        <>
          <textarea value={bio} onChange={handleBioChange} />
          <div className="buttons">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <p>{bio}</p>
          <button onClick={handleEdit}>Edit Bio</button>
        </>
      )}
      <ul>
        <li>
          <strong>Location:</strong> {user.location}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Website:</strong> {user.website}
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
