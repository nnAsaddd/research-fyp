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
      `http://localhost:5000/researchPapers/getSingleResearchPaper/${params.id}`,
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
      `http://localhost:5000/researchPapers/${credentials.id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Research Paper Deleted Successfully");
    return redirect(`/collections/${credentials.collectionId}`);
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const DeleteResearchPapers = () => {
  const { researchPaper } = useLoaderData();
  const { _id, name, physicalLocation, collectionId } = researchPaper;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="edit-collections">
      <div className="wrapper">
        <div className="create-collections-btn-wrapper">
          <Link
            to={`/collections/${collectionId}`}
            className="create-collections-btn"
          >
            Go back to Research Papers Page
          </Link>
        </div>
        <div className="wrapper create-collections-wrapper">
          <Form className="login-form" method="post">
            <h3>Are you sure you want to delete this Research Paper?</h3>
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
            <div className="password-container">
              <input
                type="hidden"
                name="collectionId"
                id="collectionId"
                value={collectionId}
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
              <label htmlFor="category">Physical Location</label>
              <input
                type="text"
                name="physicalLocation"
                id="physicalLocation"
                value={physicalLocation}
                readOnly
                required
              />
            </div>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Deleting..." : "Delete Research Paper"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DeleteResearchPapers;
