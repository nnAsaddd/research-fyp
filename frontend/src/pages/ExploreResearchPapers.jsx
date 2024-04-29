import React, { useState } from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { ExploreSingleResearchPaper, ReaserchPapersForm } from "../components";

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
    console.log(researchPapers);
    return researchPapers;
  } catch (error) {
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

const ExploreResearchPapers = () => {
  const [search, setSearch] = useState("");
  const { researchPapers } = useLoaderData();

  const filteredResearchPapers = researchPapers?.filter((researchPaper) => {
    return (
      researchPaper.name.toLowerCase().includes(search) ||
      researchPaper.name.toUpperCase().includes(search)
    );
  });
  console.log(filteredResearchPapers);

  return (
    <div className="single-collection wrapper">
      <h1>Explore Research Papers Page</h1>
      <ReaserchPapersForm search={search} setSearch={setSearch} />
      <div className="single-collection-btns-wrapper">
        <Link to="/exploreCollections" className="collections-btn">
          Go back to Explore Collections
        </Link>
      </div>
      {filteredResearchPapers?.length > 0 ? (
        <div className="single-collection-container">
          {filteredResearchPapers.map((collection) => {
            const {
              _id,
              name,
              fileName,
              filePath,
              collectionId,
              physicalLocation,
            } = collection;
            return (
              <ExploreSingleResearchPaper
                key={_id}
                id={_id}
                name={name}
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

export default ExploreResearchPapers;
