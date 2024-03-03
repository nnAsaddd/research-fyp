import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";

const SingleCollectionComponent = ({ id, name, category }) => {
  return (
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
        <Link to={`/deleteCollections/${id}`}>
          <span className="delete-btn">Delete</span>
        </Link>
      </div>
    </div>
  );
};

export default SingleCollectionComponent;
