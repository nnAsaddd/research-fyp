import React from "react";
import axios from "axios";
import { CollectionsForm, SingleCollection, SingleUser } from "../components";
import { Link, useLoaderData } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalProvider";
import { toast } from "react-toastify";

export const loader = async () => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.get(
      `http://localhost:5000/auth/users`,
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

const GetAllUsers = () => {
  const { search } = useGlobalContext();
  const { users } = useLoaderData();
  const filteredUsers = users?.filter((user) => {
    return (
      user.name.toLowerCase().includes(search) ||
      user.name.toUpperCase().includes(search)
    );
  });

  return (
    <div className="collections wrapper">
      <h1>All Users Page</h1>
      <CollectionsForm />
      <div className="collections-btns-container">
        <Link to="/" className="collections-btn">
          Go back to Collections
        </Link>
      </div>
      {filteredUsers?.length > 0 ? (
        <div className="collections-container">
          {filteredUsers.map((user) => {
            const { _id, name, email } = user;
            return <SingleUser key={_id} id={_id} name={name} email={email} />;
          })}
        </div>
      ) : (
        <h2 className="msg-h1">Sorry, there are no collections...</h2>
      )}
    </div>
  );
};

export default GetAllUsers;
