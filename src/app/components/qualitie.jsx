import React from "react";

const Quality = ({ color, ...rest }) => {
  return (
    <span className={"badge m-1 bg-" + color} key={rest._id}>
      {rest.name}
    </span>
  );
};

export default Quality;
