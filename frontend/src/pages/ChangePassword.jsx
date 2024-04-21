import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/changePassword",
        {
          email,
          password,
          newPassword,
        }
      );
      if (response.status === 200) {
        toast.success("Password reset successfully");
      } else {
        toast.error("Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password");
    }
  };

  return (
    <div className="reset-password-container">
      <form onSubmit={handleSubmit} className="reset-password-form">
        <label htmlFor="email" className="bold">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className="bold">
          Old Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="password" className="bold">
          New Password:
        </label>
        <input
          type="password"
          id="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Go to Login
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
