import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Form,
  Link,
  redirect,
  useNavigation,
  useLoaderData,
} from "react-router-dom";
export const loader = async ({ params }) => {
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.get(
      `http://localhost:5000/collections/getSingleCollection/${params.id}`,
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

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const accessToken = localStorage.getItem("accessToken");

  try {
    await axios.delete(
      `http://localhost:5000/collections/${credentials.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Collection Deleted Successfully");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const DeleteCollections = () => {
  const { collection } = useLoaderData();
  const { _id, name, category } = collection;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="edit-collections">
      <div className="wrapper">
        <div className="create-collections-btn-wrapper">
          <Link to="/" className="create-collections-btn">
            Go back to Collections Page
          </Link>
        </div>
        <div className="wrapper create-collections-wrapper">
          <Form className="login-form" method="post">
            <h3>Are you sure you want to delete this collection?</h3>
            <div className="password-container">
              <input
                type="hidden"
                name="id"
                id="id"
                value={_id}
                readOnly
                required
              />
            </div>
            <div className="name-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                readOnly
                required
              />
            </div>
            <div className="name-container" style={{ margin: "2rem 0" }}>
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                id="category"
                value={category}
                readOnly
                required
              />
            </div>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete Collection"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DeleteCollections;
