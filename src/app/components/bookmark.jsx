import React, { useState } from "react";

const BookMark = () => {
  const [status, setStatus] = useState(false);

  const handleMenuClick = () => {
    setStatus((prevState) => !prevState);
  };

  const renderArrow = () => {
    return status ? (
      <i className="bi bi-airplane-fill"></i>
    ) : (
      <i className="bi bi-airplane"></i>
    );
  };

  return <span onClick={handleMenuClick}>{renderArrow()}</span>;
};

export default BookMark;
