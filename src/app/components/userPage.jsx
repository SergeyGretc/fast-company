import api from "../api";
import React, { useState, useEffect } from "react";
const UserPage = ({ match, history }) => {
  const userId = match.params.userId;

  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  });

  const handleSave = () => {
    history.replace("/users");
  };

  if (user && user._id === userId) {
    return (
      user && (
        <>
          <h1>{user.name}</h1>
          <h2>{"Профессия: " + `${user.profession.name}`}</h2>
          <span>
            {user.qualities.map((quality) => (
              <span
                key={user._id}
                className={"badge m-1 bg-" + `${quality.color}`}
              >
                {quality.name}
              </span>
            ))}
          </span>
          <p>{"completedMeetings: " + `${user.completedMeetings}`}</p>
          <h1>{"Rate: " + `${user.rate}`}</h1>
          <button
            onClick={() => {
              handleSave();
            }}
          >
            {"Все пользователи"}
          </button>
        </>
      )
    );
  }
  return <h1>{"Loading"}</h1>;
};

export default UserPage;
