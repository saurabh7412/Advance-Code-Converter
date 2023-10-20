import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from "@mui/material";
import axios from "axios";

function ModalForm({ open, onClose, accessToken, repos, code }) {
  const [formData, setFormData] = useState({
    accessToken: localStorage.getItem("token"),
    brandName: "",
    repo: "",
    owner: "",
    commitMessage: "",
    fileName: "",
    fileContent: "",
  });

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const openSuccessAlert = (message) => {
    setAlertMessage(message);
    setSuccessAlertOpen(true);
  };

  const closeSuccessAlert = () => {
    setSuccessAlertOpen(false);
  };


  const openErrorAlert = (message) => {
    setAlertMessage(message);
    setErrorAlertOpen(true);
  };

  const closeErrorAlert = () => {
    setErrorAlertOpen(false);
  };

  const [branches, setBranches] = useState([]);
  const [repoSelected, setRepoSelected] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRepoChange = (e) => {
    const selectedRepo = e.target.value;
    setRepoSelected(selectedRepo);

    // Find the selected repository in the `repos` array
    const selectedRepoObject = repos.find((repo) => repo.name === selectedRepo);

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
        setBranches(response.data);
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
      });
  };

  // console.log("Branches", branches);

  const handleSubmit = async () => {
    formData.accessToken = localStorage.getItem("token");
    formData.repo = repoSelected;
    formData.fileContent = code;
    // console.log("Form Data", formData);
    try {
      // Perform a POST request using Axios
      const response = await axios.post("https://advance-code-converter-backend.onrender.com/push", formData);
      openSuccessAlert("File pushed successfully!");
      // console.log("Data sent:", response.data);
    } catch (error) {
      console.error("Error:", error);
      openErrorAlert("File pushing failed. Please try again."); 
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

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Create File</h2>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Repository</InputLabel>
          <Select name="repo" value={repoSelected} onChange={handleRepoChange}>
            {repos.map((repo) => (
              <MenuItem key={repo.id} value={repo.name}>
                {repo.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Branch</InputLabel>
          <Select
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
          >
            {branches.map((branch) => (
              <MenuItem key={branch.name} value={branch.name}>
                {branch.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="commitMessage"
          label="Commit Message"
          value={formData.commitMessage}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          name="fileName"
          label="File Name"
          value={formData.fileName}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ mb: 2 }}
        >
          Submit
        </Button>


        {successAlertOpen && (
          <Alert
            severity="success"
            sx={{ mt: 2 }}
            onClose={closeSuccessAlert}
          >
            {alertMessage}
          </Alert>
        )}
        {errorAlertOpen && (
          <Alert
            severity="error"
            sx={{ mt: 2 }}
            onClose={closeErrorAlert}
          >
            {alertMessage}
          </Alert>
        )}
      </Box>

     
      
    </Modal>
  );
}

export default ModalForm;
