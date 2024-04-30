import axios from "axios";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleQuery = ({ id: queryId, text, email }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const handleResolve = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:5000/query/${queryId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success("Query Resolved Successfully");
      return navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
      return error?.response?.data?.message;
    }
  };

  return (
    <div className="single-research-paper">
      <div className="query-container">
        <p>"{text}"</p>
        <h3>--{email}</h3>
        <form onSubmit={handleResolve}>
          <button type="submit" className="delete-btn">
            Resolve
          </button>
        </form>
      </div>
    </div>
  );
};

export default SingleQuery;
