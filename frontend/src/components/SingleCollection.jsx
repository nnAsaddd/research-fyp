import React from "react";
import { Link } from "react-router-dom";

const SingleCollectionComponent = ({ id, name, category }) => {
  return (
    <div className="collection-card">
      <div className="info-container">
        <p>
          <Link className="link" to={`/collections/${id}`}>
            <strong>Name:</strong> {name}
          </Link>
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
      </div>
      <div className="btns-container">
        <Link to={`/editCollections/${id}`}>
          <span className="edit-btn">Edit</span>
        </Link>
        <Link className="delete-btn" to={`/deleteCollections/${id}`}>
          <span>Delete</span>
        </Link>
      </div>
    </div>
  );
};

export default SingleCollectionComponent;
