import React, { useState } from "react";
import axios from "axios";
import { Link, useLoaderData } from "react-router-dom";
import { ReaserchPapersForm, SingleQuery } from "../components";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data: researchPapers } = await axios.get(
      `http://localhost:5000/query`,
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

const GetAllQueries = () => {
  const [search, setSearch] = useState("");
  const { queries } = useLoaderData();

  const filteredQueries = queries?.filter((query) => {
    return (
      query.text.toLowerCase().includes(search) ||
      query.text.toUpperCase().includes(search)
    );
  });

  return (
    <div className="single-collection wrapper">
      <h1>Queries Page</h1>
      <ReaserchPapersForm search={search} setSearch={setSearch} />
      <div className="single-collection-btns-wrapper">
        <Link to="/" className="collections-btn">
          Go back to Collections
        </Link>
      </div>
      {filteredQueries?.length > 0 ? (
        <div className="single-collection-container">
          {filteredQueries.map((query) => {
            const { _id, text, timeStamp, userId } = query;
            return (
              <SingleQuery
                key={_id}
                id={_id}
                text={text}
                timeStamp={timeStamp}
                email={userId.email}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="msg-h1">Sorry, there are no Queries...</h2>
      )}
    </div>
  );
};

export default GetAllQueries;
