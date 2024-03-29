import React from "react";
import axios from "axios";
import { Link, useParams, useLoaderData } from "react-router-dom";
import { SingleComment } from "../components";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.get(
      `http://localhost:5000/comments`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    return error?.response?.data?.message;
  }
};

const Comments = () => {
  const { collectionId, id } = useParams();
  const { comments } = useLoaderData();
  return (
    <div className="single-comment wrapper">
      <h1 style={{ marginBottom: "1rem" }}>Comments Page</h1>
      <div className="single-comment-btns-wrapper">
        <Link to={`/collections/${collectionId}`} className="collections-btn">
          Go back to Research Papers
        </Link>
        <Link
          to={`/collections/${collectionId}/researchPapers/${id}/createComments`}
          className="single-collection-btn"
        >
          Add Comments
        </Link>
      </div>
      {comments?.length > 0 ? (
        <div className="comment-container">
          {comments.map((collection) => {
            const { _id, text, timeStamp, researchPaperId } = collection;
            return (
              <SingleComment
                key={_id}
                id={_id}
                text={text}
                timeStamp={timeStamp}
                collectionId={collectionId}
                researchPaperId={researchPaperId}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="msg-h1">Sorry, there are no comments...</h2>
      )}
    </div>
  );
};

export default Comments;
