import axios from "axios";
import React, { useState, useEffect } from "react";

const Modal = ({ open, onClose, accessToken, repos, code }) => {
  const [formData, setFormData] = useState({
    accessToken: localStorage.getItem("token"),
    brandName: "",
    repo: "",
    owner: "",
    commitMessage: "",
    fileName: "",
    fileContent: "",
  });

  const [successMessage, setSuccessAlertOpen] = useState(false);
  const [errorMessage, setErrorAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [branches, setBranches] = useState([]);
  const [repoSelected, setRepoSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCloseAlert = ()=>{
    successMessage ? setSuccessAlertOpen(false) : setErrorAlertOpen(false)
  }

  const handleAlert = () => {
    return (
      <>
        <div class="info">
          <div class="info__icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              viewBox="0 0 24 24"
              height="24"
              fill="none"
            >
              <path
                fill="#393a37"
                d="m12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z"
              ></path>
            </svg>
          </div>
          <div class="info__title">{alertMessage}</div>
          <div class="info__close" >
            <svg
              height="20"
              viewBox="0 0 20 20"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
              onClick={()=>handleCloseAlert()}
            >
              <path
                d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
                fill="#393a37"
              ></path>
            </svg>
          </div>
        </div>
      </>
    );
  };

  const openSuccessAlert = (message) => {
    setAlertMessage(message);
    setSuccessAlertOpen(true);
  };

  const openErrorAlert = (message) => {
    setAlertMessage(message);
    setErrorAlertOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    if (name === "branch") {
      setFormData({ ...formData, brandName: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRepoChange = (e) => {
    const selectedRepo = e.target.value;
    setRepoSelected(selectedRepo);

    // Find the selected repository in the `repos` array
    const selectedRepoObject = repos.find((repo) => repo.name === selectedRepo);
    console.log({ selectedRepo, selectedRepoObject });

    // Fetch the branches for the selected repository
    axios
      .get(
        `https://api.github.com/repos/${formData.owner}/${selectedRepo}/branches`,
        {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log({ response: response.data });
        setBranches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  };

  // console.log("Branches", branches);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting");
    formData.accessToken = localStorage.getItem("token");
    formData.repo = repoSelected;
    formData.fileContent = code;
    console.log("Form Data", formData);
    setIsLoading(true);
    try {
      // Perform a POST request using Axios
      const response = await axios.post(
        "https://advance-code-converter-backend.onrender.com/push",
        formData
      );
      setIsLoading(false);
      openSuccessAlert("File pushed successfully!");

      // console.log("Data sent:", response.data);
    } catch (error) {
      console.error("Error:", error);
      openErrorAlert("File pushing failed. Please try again.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Set the owner based on the authenticated user (GitHub username)
    axios
      .get("https://api.github.com/user", {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      })
      .then((response) => {
        setFormData({ ...formData, owner: response.data.login });
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
      });
  }, [accessToken]);
  // console.log("formData", formData)

  const handleLoader = () => {
    return (
      <>
        <div class="newtons-cradle">
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
          <div class="newtons-cradle__dot"></div>
        </div>
      </>
    );
  };

  console.log({ successMessage, errorMessage });

  return (
    <div className={`modal ${open ? "active" : ""}`}>
      <div className="modal-content">
        <h2 className="glowing-text" style={{ fontSize: "20px" }}>
          Create File
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="repo">Repository </label>
            <select
              name="repo"
              id="repo"
              value={repoSelected}
              onChange={handleRepoChange}
            >
              <option value="">Select a Repo</option>
              {repos?.map((repo) => (
                <option key={repo.id} value={repo.name}>
                  {repo.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="branch">Branch </label>
            <select
              name="branch"
              id="branch"
              value={formData.name}
              onChange={handleChange}
            >
              <option value="">Select a Branch</option>
              {branches?.map((branch) => (
                <option key={branch.name} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="commitMessage">Commit Message </label>
            <input
              type="text"
              name="commitMessage"
              id="commitMessage"
              value={formData.commitMessage}
              onChange={handleChange}
              placeholder="Type a commit message"
              size={30}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fileName">File Name </label>
            <input
              type="text"
              name="fileName"
              id="fileName"
              placeholder="Enter file name with extension"
              value={formData.fileName}
              size={30}
              onChange={handleChange}
            />
          </div>
        </form>
        {successMessage && handleAlert()}
        {errorMessage && handleAlert()}
        <div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            {isLoading ? handleLoader() : "Submit"}
          </button>
          <button className="btn btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
