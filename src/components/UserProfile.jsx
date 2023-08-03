import React, { useCallback } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const UserProfile = (props) => {
  const handleClick = useCallback(
    (event) => {
      event.stopPropagation();
      axios.delete(
        "https://jsonplaceholder.typicode.com/users/" + props.user.id
      );
      props.deleteUser(props.user.id);
    },
    [props]
  );
  return (
    <div className="card mt-3">
      <img
        src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
        className="card-img-top"
        alt="logo-youtube"
        onClick={props.goUser}
      />
      <div className="card-body">
        <h5 className="card-title">{props.user.name}</h5>
        <div>email : {props.user.email}</div>
        {props.complete && (
          <div>
            <div>
              adresse : {props.user.address?.suite} {props.user.address?.street}{" "}
              {props.user.address?.city}
            </div>
            <div>Téléphone : {props.user.phone}</div>
            <div>Site web : {props.user.website}</div>
            <div>Entreprise : {props.user.company?.name}</div>
          </div>
        )}
        {props.deleteUser && (
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleClick}>
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object.isRequired,
  deleteUser: PropTypes.func,
  complete: PropTypes.bool,
};

export default UserProfile;
