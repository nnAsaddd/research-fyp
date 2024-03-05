import React from "react";
import { Link } from "react-router-dom";

const SingleCollectionComponent = ({ id, name, category }) => {
  return (
    <Link className="link" to={`/collections/${id}`}>
      <div className="collection-card">
        <div className="info-container">
          <p>
            <strong>Name:</strong> {name}
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
    </Link>
  );
};

export default SingleCollectionComponent;
