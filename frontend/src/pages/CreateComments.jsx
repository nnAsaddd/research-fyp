import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Form,
  useParams,
  Link,
  redirect,
  useNavigation,
} from "react-router-dom";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  const { researchPaperId, collectionId } = credentials;
  const accessToken = localStorage.getItem("accessToken");

  try {
    await axios.post(
      `http://localhost:5000/comments`,
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
    toast.success("Comment Created Successfully");
    return redirect(
      `/collections/${collectionId}/researchPapers/${researchPaperId}`
    );
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const CreateComments = () => {
  const { collectionId, id } = useParams();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="create-collections">
      <div className="wrapper">
        <div className="create-collections-btn-wrapper">
          <Link
            to={`/collections/${collectionId}/researchPapers/${id}`}
            className="create-collections-btn"
          >
            Go back to Research Papers Page
          </Link>
        </div>
        <div className="wrapper create-collections-wrapper">
          <Form className="login-form" method="post">
            <h3>Create Comments</h3>
            <div className="name-container">
              <label htmlFor="name">Text</label>
              <input
                style={{ marginBottom: "2rem", wordWrap: "break-word" }}
                type="text"
                name="text"
                id="text"
                required
              />
            </div>
            <div className="name-container">
              <input type="hidden" name="collectionId" value={collectionId} />
            </div>
            <div className="name-container">
              <input type="hidden" name="researchPaperId" value={id} />
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? "Please wait..." : "Create Comment"}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateComments;
