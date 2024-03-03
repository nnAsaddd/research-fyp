import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Link, redirect, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credientials = Object.fromEntries(formData);

  try {
    const {
      data: { user, accessToken },
    } = await axios.post("http://localhost:5000/auth/login", credientials, {
      withCredentials: true,
    });
    toast.success("User Logged in Successfully");
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("accessToken", accessToken);

    return redirect("/");
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="login">
      <div className="wrapper login-wrapper">
        <Form className="login-form" method="post">
          <h3>Login</h3>
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
            <p>Not a member?</p>
            <Link to="/register" className="link-btn">
              Register
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
