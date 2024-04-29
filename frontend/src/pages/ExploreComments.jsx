import React from "react";
import axios from "axios";
import { Link, useParams, useLoaderData } from "react-router-dom";
import { ExploreSingleComment } from "../components/";

export const loader = async ({ params }) => {
  const { id: researchPaperId } = params;
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.post(
      `http://localhost:5000/comments/researchPaperComments`,
      { researchPaperId },
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
    console.log(error);
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

const ExploreComments = () => {
  const { collectionId, id } = useParams();
  const { comments } = useLoaderData();
  return (
    <div className="single-comment wrapper">
      <h1 style={{ marginBottom: "1rem" }}>Explore Comments Page</h1>
      <div className="single-comment-btns-wrapper">
        <Link
          to={`/exploreCollections/${collectionId}`}
          className="collections-btn"
        >
          Go back to Explore Research Papers
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
            const { _id, text, timeStamp } = collection;
            return (
              <ExploreSingleComment
                key={_id}
                text={text}
                timeStamp={timeStamp}
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

export default ExploreComments;
