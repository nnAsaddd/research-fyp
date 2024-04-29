import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Link, redirect, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const accessToken = localStorage.getItem("accessToken");
  console.log(credentials);

  try {
    await axios.post(
      "http://localhost:5000/query",
      credentials,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Query Submitted Successfully!!!");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const CreateQuery = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const userId = localStorage.getItem("userId");

  return (
    <div className="create-collections">
      <div className="wrapper">
        <div className="create-collections-btn-wrapper">
          <Link to="/" className="create-collections-btn">
            Go back to Collections Page
          </Link>
        </div>
        <div className="wrapper create-collections-wrapper">
          <Form className="login-form" method="post">
            <h3>Create Query</h3>
            <div className="name-container">
              <label htmlFor="text">Query:</label>
              <textarea rows="10" type="text" name="text" id="text" required />
            </div>
            <div className="password-container">
              <input
                type="hidden"
                name="userId"
                id="userId"
                value={userId}
                required
              />
            </div>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Create Query"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateQuery;
