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

  const handleNewRecipe = () => {
    navigate("/recipe/new");
  };

  return (
    <div>
      <Navbar navigate={navigate} />
      <div className="bg-cover bg-no-repeat min-h-screen bg-background-body p-8">
        <div
          className="user-profile"
          class="p-8 bg-orange-200 w-1/2 mx-auto mt-12 rounded-lg shadow-xl"
        >
          <div class="mt-2 text-center font-bold tracking-tight text-orange-600">
            <h1 class="text-3xl">{user.userName}</h1>
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
                    class="w-50 mb-5 ml-5 mr-5 rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2"
                    onClick={handleSave}
                  >
                    Save
                  </button>{" "}
                  <br></br>
                </div>
                <div className="cancel-btn" data-cy="cancel-btn">
                  <button
                    class="w-50 ml-5 mr-5 rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2"
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
                    class="w-50 ml-5 mr-5 rounded-md w-1/2 bg-orange-500 py-2 px-3 text-sm font-semibold text-white shadow-lg hover:bg-orange-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 eatgpt-2"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </div>
                <br></br>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
