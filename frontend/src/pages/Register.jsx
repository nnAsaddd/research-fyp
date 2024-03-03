import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Link, redirect, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credientials = Object.fromEntries(formData);

  try {
    const {
      data: { user },
    } = await axios.post("http://localhost:5000/auth/register", credientials, {
      withCredentials: true,
    });
    toast.success("User Registered Successfully");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="login">
      <div className="wrapper login-wrapper">
        <Form className="login-form" method="post">
          <h3>Register</h3>
          <div className="name-container">
            <label htmlFor="Name">Name</label>
            <input type="name" name="name" id="name" required />
          </div>
          <div className="email-container">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" required />
          </div>
          <div className="password-container">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" required />
          </div>
          <button type="submit" className="btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <div className="register-login">
            <p>Already a member?</p>
            <Link to="/login" className="link-btn">
              Login
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
