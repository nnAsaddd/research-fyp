import React from "react";
import { Link } from "react-router-dom";

const SingleResearchPaperComponent = ({
  id,
  fileName,
  filePath,
  physicalLocation,
  collectionId,
}) => {
  return (
    <Link className="link" to={`/collections/${id}`}>
      <div className="collection-card">
        <div className="info-container">
          <p>
            <strong>File Name:</strong> {fileName}
          </p>
          <p>
            <strong>File Path:</strong> {filePath}
          </p>
        </div>
        <div className="btns-container">
          <Link to={`/collections/${collectionId}/editResearchPapers/${id}`}>
            <span className="edit-btn">Edit</span>
          </Link>
          <Link to={`/collections/${collectionId}/deleteResearchPapers/${id}`}>
            <span className="delete-btn">Delete</span>
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default SingleResearchPaperComponent;
