import React from "react";
import axios from "axios";
import { CollectionsForm, SingleCollection } from "../components";
import { Link, useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import { FaUser } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const isAdmin = email?.includes("admin") || false;
  if (isAdmin) {
    return null;
  }
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
    toast.error(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

const Collections = () => {
  const email = localStorage.getItem("email");
  const isAdmin = email?.includes("admin") || false;
  const { search } = useGlobalContext();
  const { collections } = !isAdmin && useLoaderData();
  const filteredCollections =
    !isAdmin &&
    collections?.filter((collection) => {
      return (
        collection.name.toLowerCase().includes(search) ||
        collection.name.toUpperCase().includes(search)
      );
    });

  return (
    <div className="collections wrapper">
      <h1 style={{ marginBottom: "1rem" }}>
        {!isAdmin ? "Collections Page" : "Welcome to Admin Page"}
      </h1>
      {!isAdmin && <CollectionsForm />}
      {!isAdmin ? (
        <div className="collections-btns-container">
          <Link to="/createCollections" className="collections-btn">
            Add Collections <FaPlus />
          </Link>
          <Link to="/exploreCollections" className="collections-btn">
            Explore Collections <FaSearch />
          </Link>
          <Link to="/createQuery" className="collections-btn">
            Contact Admin <FaUser /> <FaAddressBook />
          </Link>{" "}
        </div>
      ) : (
        <div className="collections-btns-container">
          {" "}
          <Link to="/getAllUsers" className="collections-btn">
            Get All Users
          </Link>
          <Link to="/getAllQueries" className="collections-btn">
            Get All Queries
          </Link>{" "}
        </div>
      )}

      {isAdmin ? (
        ""
      ) : filteredCollections?.length > 0 ? (
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
