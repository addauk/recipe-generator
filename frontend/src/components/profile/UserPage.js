import React, { useState, useEffect } from "react";
import UserProfile from "./Profile";
import { useParams, useNavigate } from "react-router-dom";

const UserPage = ({}) => {
  const [user, setUser] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  async function fetchUser() {
    const response = await fetch(`/users/${params.id}`);
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    fetchUser();
  }, []);

  while (!user) {
    return <div>Loading...</div>;
  }

  return <UserProfile user={user} navigate={navigate} />;
};

export default UserPage;
