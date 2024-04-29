import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const ExploreSingleComment = ({ text, timeStamp }) => {
  return (
    <div className="comment-card">
      <div className="comment-info-container">
        <p>
          <span>"{text}"</span>
          <span> -- {timeStamp}</span>
          <span>
            <FaEdit
              className="icon edit-icon"
              onClick={() =>
                toast.error("Do not have the permission to perform this action")
              }
            />
            <MdDelete
              className="icon delete-icon"
              onClick={() =>
                toast.error("Do not have the permission to perform this action")
              }
            />
          </span>
        </p>
      </div>
    </div>
  );
};

export default ExploreSingleComment;
