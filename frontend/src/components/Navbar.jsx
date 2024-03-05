import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const handleLogout = async () => {
    localStorage.clear();
    try {
      toast.success("User Logged out Successfully!!!");
      navigate("/login");
      return response.data;
    } catch (error) {
      navigate("/login");
      toast.error(error?.response?.data?.message);
      return error?.response?.data?.msg;
    }
  };

  return (
    <nav className="navbar">
      <div className="wrapper navbar-wrapper">
        <div className="navbar-logo">
          <h1>
            <span>Database</span>
            <span>Manager</span>
          </h1>
        </div>
        {accessToken && (
          <div className="links">
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
