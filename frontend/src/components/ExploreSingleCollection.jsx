import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ExploreSingleCollectionComponent = ({ id, name, category }) => {
  return (
    <div className="collection-card">
      <div className="info-container">
        <p>
          <Link className="link" to={`/exploreCollections/${id}`}>
            <strong>Name:</strong> {name}
          </Link>
        </p>
        <p>
          <strong>Category:</strong> {category}
        </p>
      </div>
      <div className="btns-container">
        <button
          className="edit-btn"
          onClick={() => toast.error("You are in explore mood")}
        >
          Edit
        </button>
        <button
          className="delete-btn "
          onClick={() => toast.error("You are in explore mood")}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ExploreSingleCollectionComponent;
