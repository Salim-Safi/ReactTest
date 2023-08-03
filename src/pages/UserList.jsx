import React, { useCallback, useEffect, useState } from "react";
import UserProfile from "../components/UserProfile";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [criteria, setCriteria] = useState("");
  const [newUser, setNewUser] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then((res) => res.json)
    //   .then((result) => setUsers(result));

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((result) => setUsers(result.data));
  }, []);

  const handleSearch = useCallback((event) => {
    setCriteria(event.target.value);
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(criteria.toLowerCase())
      )
    );
  }, [criteria, users]);

  const handleAddUser = () => {
    if (newUser.trim() !== "") {
      setUsers([...users, newUser]);
      setNewUser("");
    }
  };

  const deleteUser = useCallback(
    (userId) => {
      setUsers(users.filter((user) => user.id !== userId));
    },
    [users]
  );

  const navigate = useNavigate();
  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-2">
            <input
              className="form-control "
              type="text"
              placeholder="Recherche"
              value={criteria}
              onChange={handleSearch}
            />
          </div>

          <div className="col-md-6">
            <div className="row">
              <div className="col-sm-9 col-xs-3 mt-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nouvel utilisateur"
                  value={newUser}
                  onChange={(event) => setNewUser(event.target.value)}
                />
              </div>
              <div className="col-sm-3 mt-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  onClick={handleAddUser}
                >
                  Créer
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {users.length ? (
            filteredUsers.map((user, i) => (
              <div
                key={i}
                className="col-lg-3 col-md-4 col-xs-6 mb-1"
                onClick={() => navigate("/users/" + user.id)}
                style={{ cursor: "pointer" }}
              >
                <UserProfile user={user} deleteUser={deleteUser} />
              </div>
            ))
          ) : (
            <div className="d-flex col-3 mb-3 justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
