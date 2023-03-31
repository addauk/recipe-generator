import React, { useState, useEffect } from "react";
import UserProfile from "./Profile";
import { useParams } from "react-router";

const UserPage = ({}) => {
  const [user, setUser] = useState(null);
  const params = useParams();

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

  return <UserProfile user={user} />;
};

export default UserPage;
