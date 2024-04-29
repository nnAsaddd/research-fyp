import React from "react";

const SingleUser = ({ name, email }) => {
  return (
    <div className="collection-card">
      <div className="user-info-container">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
      </div>
    </div>
  );
};

export default SingleUser;
