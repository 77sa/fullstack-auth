import React, { useState, useEffect } from "react";
import axios from "axios";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not logged in");
      }
    };

    fetchPrivateData();
  }, [history]);

  const logout = () => {
    localStorage.removeItem("authToken");
    history.push("/login");
  };
  return (
    <div>
      {error ? (
        <span>{error}</span>
      ) : (
        <>
          <div>{privateData}</div>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
};

export default PrivateScreen;
