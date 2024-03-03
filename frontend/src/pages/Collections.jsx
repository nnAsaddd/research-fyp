import React from "react";
import axios from "axios";
import { CollectionsForm, SingleCollection } from "../components";
import { Link, useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  try {
    const { data } = await axios.post(
      `http://localhost:5000/collections/userCollections`,
      { userId },
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

const Collections = () => {
  const { search } = useGlobalContext();
  const { collections } = useLoaderData();

  const filteredCollections = collections.filter((collection) => {
    return (
      collection.name.toLowerCase().includes(search) ||
      collection.name.toUpperCase().includes(search)
    );
  });

  return (
    <div className="collections wrapper">
      <h1>Collections Page</h1>
      <CollectionsForm />
      <Link to="/createCollections" className="collections-btn">
        Add Collections
      </Link>
      {filteredCollections.length > 0 ? (
        <div className="collections-container">
          {filteredCollections.map((collection) => {
            const { _id, name, category } = collection;
            return (
              <SingleCollection
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

export default Collections;
