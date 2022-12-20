import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import _ from "lodash";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
const Users = () => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }
        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);
  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };
  const handleSort = (item) => {
    setSortBy(item);
  };
  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  if (users) {
    const filteredUsers = selectedProf
      ? users.filter((user) => user.profession._id === selectedProf._id)
      : users;
    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          {count > 0 && (
            <UserTable
              users={userCrop}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
              onSort={handleSort}
              selectedSort={sortBy}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading";
};

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Users;
