import React, { useState } from "react";
import axios from "axios";
import { Link, useParams, useLoaderData } from "react-router-dom";
import { ReaserchPapersForm, SingleResearchPaper } from "../components";

export const loader = async ({ params }) => {
  const { collectionId } = params;
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data: researchPapers } = await axios.post(
      `http://localhost:5000/researchPapers/collectionResearchPapers`,
      { collectionId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    return researchPapers;
  } catch (error) {
    return error?.response?.data?.message;
  }
};

const ResearchPapers = () => {
  const { collectionId } = useParams();
  const [search, setSearch] = useState("");
  const { researchPapers } = useLoaderData();

  const filteredResearchPapers = researchPapers?.filter((researchPaper) => {
    return (
      researchPaper.name.toLowerCase().includes(search) ||
      researchPaper.name.toUpperCase().includes(search)
    );
  });

  return (
    <div className="single-collection wrapper">
      <h1>Research Papers Page</h1>
      <ReaserchPapersForm search={search} setSearch={setSearch} />
      <div className="single-collection-btns-wrapper">
        <Link to="/" className="collections-btn">
          Go back to Collections
        </Link>
        <Link
          to={`/collections/${collectionId}/createResearchPapers`}
          className="single-collection-btn"
        >
          Add Research Papers
        </Link>
      </div>
      {filteredResearchPapers?.length > 0 ? (
        <div className="single-collection-container">
          {filteredResearchPapers.map((collection) => {
            const { _id, fileName, filePath, collectionId, physicalLocation } =
              collection;
            return (
              <SingleResearchPaper
                key={_id}
                id={_id}
                fileName={fileName}
                filePath={filePath}
                collectionId={collectionId}
                physicalLocation={physicalLocation}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="msg-h1">Sorry, there are no Research Papers...</h2>
      )}
    </div>
  );
};

export default ResearchPapers;
