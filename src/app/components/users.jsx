import React from "react";
// import api from "../api";
// import SearchStatus from "./searchStatus";
import User from "./user";

const Users = (props) => {
  //   const [users, setUsers] = useState(api.users.fetchAll());

  //   const handleDelete = (userId) => {
  //     setUsers(users.filter((user) => user._id !== userId));
  //   };

  return (
    <>
      {/* <SearchStatus length={users.length} /> */}

      {props.length > 0 && (
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
            {props.users.map((user) => (
              <User {...user} onActiveDelete={props.onDelete} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Users;
