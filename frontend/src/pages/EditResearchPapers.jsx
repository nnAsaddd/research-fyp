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
    console.log(error?.response?.data?.message);
    return error?.response?.data?.message;
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const accessToken = localStorage.getItem("accessToken");

  try {
    await axios.patch(
      "http://localhost:5000/researchPapers",
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
    toast.success("Collection Edited Successfully");
    return redirect(`/collections/${credentials.collectionId}`);
  } catch (error) {
    console.log(error?.response?.data?.message);
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditResearchPapers = () => {
  const { researchPaper } = useLoaderData();
  const { _id, name, physicalLocation, collectionId } = researchPaper;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="edit-researchPapers/">
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
            <h3>Edit Collections</h3>
            <div className="password-container">
              <input type="hidden" name="id" id="id" value={_id} />
            </div>
            <div className="password-container">
              <input
                type="hidden"
                name="collectionId"
                id="collectionId"
                value={collectionId}
              />
            </div>
            <div className="name-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                defaultValue={name}
                required
              />
            </div>
            <div className="name-container" style={{ margin: "2rem 0" }}>
              <label htmlFor="category">Physical Location</label>
              <input
                type="text"
                name="physicalLocation"
                id="physicalLocation"
                defaultValue={physicalLocation}
              />
            </div>
            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Edit Collection"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditResearchPapers;
