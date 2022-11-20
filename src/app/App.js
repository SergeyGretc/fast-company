import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import api from "./api";
import User from "./components/user";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };
  const handleToggBookMark = (id) => {};
  return (
    <>
      <SearchStatus length={users.length} />
      {/* 
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User onDelete={handleDelete} {...user} />
            ))}
          </tbody>
        </table>
      )} */}

      <Users users={users} length={users.length} onDelete={handleDelete} />
    </>
  );
}

export default App;
