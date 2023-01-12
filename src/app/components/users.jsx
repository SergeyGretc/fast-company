import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

import TextField from "./textField";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState(null);
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
  const [searchText, setSearchText] = useState("");
  const [enterSearchText, setEnterSearchText] = useState("");
  const pageSize = 8;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    if (selectedProf) {
      setSearchText("");
      setEnterSearchText("");
      setCurrentPage(1);
    }
  }, [selectedProf]);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
  };

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearchText = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  const handleEnterPress = (e) => {
    if (e.key === "Enter") {
      setEnterSearchText(searchText);
      setSelectedProf(null);
    }
  };

  const handleClearFilter = () => {
    setSelectedProf();
  };

  const filteredUsers = selectedProf
    ? users.filter(
        (user) =>
          JSON.stringify(user.profession) === JSON.stringify(selectedProf)
      )
    : users;

  const count = filteredUsers.length;

  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

  const usersCrop = enterSearchText
    ? paginate(sortedUsers, currentPage, pageSize).filter((obj) =>
        obj.name.toLowerCase().includes(enterSearchText.toLowerCase())
      )
    : paginate(sortedUsers, currentPage, pageSize);

  if (users.length) {
    return (
      <>
        <div className="d-flex">
          {professions && (
            <div className="d-flex flex-column flex-shrink-0 p-3">
              <GroupList
                selectedItem={selectedProf}
                items={professions}
                onItemSelect={handleProfessionSelect}
              />
              <button
                className="btn btn-secondary mt-2"
                onClick={handleClearFilter}
              >
                {" "}
                Очистить
              </button>
            </div>
          )}
          <div className="d-flex flex-column">
            <SearchStatus length={count} />
            <TextField
              label="Search..."
              name="search"
              type="text"
              value={searchText}
              onChange={handleSearchText}
              onKeyDown={handleEnterPress}
            />

            {count > 0 && (
              <UserTable
                users={usersCrop}
                onSort={handleSort}
                selectedSort={sortBy}
                onDelete={handleDelete}
                onToggleBookMark={handleToggleBookMark}
              />
            )}
            <div className="d-flex justify-content-center">
              <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
  return "loading...";
};
Users.propTypes = {
  users: PropTypes.array
};

export default Users;
