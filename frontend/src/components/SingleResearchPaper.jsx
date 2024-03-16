import React, { useState } from "react";
import { FaFileAlt, FaEdit, FaDownload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const SingleResearchPaperComponent = ({
  id,
  name,
  fileName,
  filePath,
  collectionId,
}) => {
  const pdfURL = `http://localhost:5000/files/${filePath}`;

  return (
    <div className="single-research-paper">
      <div className="single-research-paper-card-container">
        <div className="single-research-paper-card-left">
          <FaFileAlt className="icon pdf-icon" />
          <h4>{name}</h4>
        </div>
        <div className="single-research-paper-card-right">
          <a href={pdfURL}>
            <FaDownload className="icon download-icon" />
          </a>
          <Link to={`/collections/${collectionId}/editResearchPapers/${id}`}>
            <FaEdit className="icon edit-icon" />
          </Link>
          <Link to={`/collections/${collectionId}/deleteResearchPapers/${id}`}>
            <MdDelete className="icon delete-icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleResearchPaperComponent;
