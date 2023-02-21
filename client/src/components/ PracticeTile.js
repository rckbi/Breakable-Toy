import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PracticeTile = ({ id, name, userId }) => {
  const [userName, setUserName] = useState("");

  const getUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}`);
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const parsedUser = await response.json();
      setUserName(parsedUser.user.userName);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h3>
        <Link to={`/practices/${id}`}>{name}</Link>
      </h3>
    </div>
  );
};

export default PracticeTile;
