import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Form,
  Link,
  useParams,
  redirect,
  useNavigation,
  useLoaderData,
} from "react-router-dom";

export const loader = async ({ params }) => {
  const { id } = params;
  const accessToken = localStorage.getItem("accessToken");
  try {
    const { data } = await axios.get(
      `http://localhost:5000/comments/${id}`,
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
  const { collectionId, researchPaperId, commentId, text } =
    Object.fromEntries(formData);
  const accessToken = localStorage.getItem("accessToken");

  try {
    await axios.patch(
      `http://localhost:5000/comments`,
      { text, commentId },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
      {
        withCredentials: true,
      }
    );
    toast.success("Comment Edited Successfully");
    return redirect(
      `/collections/${collectionId}/researchPapers/${researchPaperId}`
    );
  } catch (error) {
    toast.error(error?.response?.data?.message);
    return error;
  }
};

const EditComment = () => {
  const { collectionId, researchPaperId, id } = useParams();
  const { comment } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="edit-collections">
      <div className="wrapper">
        <div className="create-collections-btn-wrapper">
          <Link
            to="/collections/:collectionId/researchPapers/:id"
            className="create-collections-btn"
          >
            Go back to Comments Page
          </Link>
        </div>
        <div className="wrapper create-collections-wrapper">
          <Form className="login-form" method="post">
            <h3>Edit Comments</h3>
            <div className="password-container">
              <input type="hidden" name="collectionId" value={collectionId} />
            </div>
            <div className="password-container">
              <input
                type="hidden"
                name="researchPaperId"
                value={researchPaperId}
              />
            </div>
            <div className="password-container">
              <input type="hidden" name="commentId" value={id} />
            </div>
            <div className="name-container">
              <label htmlFor="text">Text</label>
              <input
                style={{ margin: "1rem 0 1.5rem 0" }}
                type="text"
                name="text"
                id="text"
                defaultValue={comment.text}
                required
              />
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Edit Comment"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
