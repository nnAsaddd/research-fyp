import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/forgetPassword",
        {
          email,
        }
      );
      if (response.status === 200) {
        toast.success(`An Email have been sent to ${email}`);
      } else {
        toast.error("Email is incorrect");
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

export default ForgotPassword;
