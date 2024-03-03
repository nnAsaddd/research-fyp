import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Link, redirect, useNavigation } from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const accessToken = localStorage.getItem("accessToken");

  try {
    await axios.post(
      "http://localhost:5000/collections",
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
    toast.success("Collection Created Successfully");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const CreateCollections = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const userId = localStorage.getItem("userId");

  return (
    <div className="create-collections">
      <div className="create-collections-btn-wrapper">
        <Link to="/" className="create-collections-btn">
          Go back to Collections Page
        </Link>
      </div>
      <div className="wrapper create-collections-wrapper">
        <Form className="login-form" method="post">
          <h3>Create Collections</h3>
          <div className="name-container">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" required />
          </div>
          <div className="name-container">
            <label htmlFor="category">Category</label>
            <input type="text" name="category" id="category" required />
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
            {isSubmitting ? "Please wait..." : "Create Collection"}
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CreateCollections;
