import React from "react";
import axios from "axios";
import {
  CollectionsForm,
  ExploreSingleCollection,
  SingleCollection,
} from "../components";
import { Link, useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.get(
      `http://localhost:5000/collections`,
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

const ExploreCollections = () => {
  const { search } = useGlobalContext();

  const { collections } = useLoaderData();
  const userId = localStorage.getItem("userId");

  const filteredCollections = collections?.filter(
    (collection) =>
      collection.user._id !== userId &&
      (collection.name.toLowerCase().includes(search) ||
        collection.name.toUpperCase().includes(search))
  );

  return (
    <div className="collections wrapper">
      <h1>Explore Collections Page</h1>
      <CollectionsForm />
      <div className="collections-btns-container">
        <Link to="/" className="collections-btn">
          Go back to Collections
        </Link>
      </div>
      {filteredCollections?.length > 0 ? (
        <div className="collections-container">
          {filteredCollections.map((collection) => {
            const { _id, name, category } = collection;
            return (
              <ExploreSingleCollection
                key={_id}
                id={_id}
                name={name}
                category={category}
              />
            );
          })}
        </div>
      ) : (
        <h2 className="msg-h1">Sorry, there are no collections...</h2>
      )}
    </div>
  );
};
export default ExploreCollections;
