import React from "react";
import Quality from "./qualitie";
import BookMark from "./bookmark";

const User = ({ onActiveDelete, ...rest }) => {
  return (
    <tr key={rest._id}>
      <td>{rest.name}</td>
      <td>
        {rest.qualities.map((item) => (
          <Quality {...item} />
        ))}
      </td>
      <td>{rest.profession.name}</td>
      <td>{rest.completedMeetings}</td>
      <td>{rest.rate} /5</td>
      <td>
        <BookMark />
      </td>
      <td>
        <button
          onClick={() => onActiveDelete(rest._id)}
          className="btn btn-danger"
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
