import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ label, name, onSearch, searchText }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={name}> {label} </label>
      <input type={name} name={name} value={searchText} onChange={onSearch} />

      <button type="submit">Найти</button>
    </form>
  );
};

export default SearchField;
