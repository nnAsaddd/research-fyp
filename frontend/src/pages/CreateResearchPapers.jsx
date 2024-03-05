import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateResearchPapers = () => {
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [physicalLocation, setPhysicalLocation] = useState("");
  const { collectionId } = useParams();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("pdf", file);
    data.append("name", name);
    data.append("physicalLocation", physicalLocation);
    data.append("collectionId", collectionId);

    try {
      await axios.post(
        "http://localhost:5000/researchPapers",
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Research Paper Created Successfully");
      return navigate(`/collections/${collectionId}`);
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

  return (
    <div className="create-collections">
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
          <form onSubmit={onSubmitHandler} className="login-form">
            <h3>Create Research Papers</h3>
            <div className="name-container">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="name-container" style={{ margin: "15px 0px" }}>
              <label htmlFor="physicalLocation">
                Physical Location (Optional)
              </label>
              <input
                type="text"
                id="physicalLocation"
                onChange={(e) => setPhysicalLocation(e.target.value)}
              />
            </div>
            <div className="name-container" style={{ marginBottom: "15px" }}>
              <label htmlFor="pdf">Upload File</label>
              <input
                type="file"
                id="pdf"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <button type="submit" className="btn">
              Create Research Paper
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateResearchPapers;
