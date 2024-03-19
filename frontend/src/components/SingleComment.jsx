import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const SingleComment = ({
  id,
  text,
  timeStamp,
  collectionId,
  researchPaperId,
}) => {
  return (
    <div className="comment-card">
      <div className="comment-info-container">
        <p>
          <span>"{text}"</span>
          <span> -- {timeStamp}</span>
          <span>
            <Link
              to={`/collections/${collectionId}/researchPapers/${researchPaperId}/editComments/${id}`}
            >
              <FaEdit className="icon edit-icon" />
            </Link>
            <Link
              to={`/collections/${collectionId}/researchPapers/${researchPaperId}/deleteComments/${id}`}
            >
              <MdDelete className="icon delete-icon" />
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SingleComment;
