import { useEffect, useState } from "react";

import "./App.css";
import CodeEditor from "./Components/CodeEditor";
import LanguageSelector from "./Components/LanguageSelector";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import CircularProgress from "@mui/material/CircularProgress";

import axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import ModalForm from "./Components/ModalForm";

function App() {
  let accessToken = localStorage.getItem("token");

  const [code, setCode] = useState("");

  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const [selectedLanguage2, setSelectedLanguage2] = useState(null);

  const [convertedCode, setConvertedCode] = useState("");

  const [spin, setSpin] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [repos, setRepos] = useState([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("Params", searchParams.get("code"));

    getAccessToken(searchParams.get("code"));

    function getAccessToken(currCode) {
      axios
        .get(`https://advance-code-converter-backend.onrender.com/getToken?code=${currCode}`)
        .then((res) => {
          // console.log("Access Token", res.data.access_token);
          localStorage.setItem("token", res.data.access_token);
          accessToken = res.data.access_token;
        })
        .catch((err) => {
          console.log(err.message());
        });
    }
  }, []);

  useEffect(() => {
    const fetchRepos = async () => {
      // console.log("access token", accessToken);
      try {
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });

        setRepos(response.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    setTimeout(() => {
      if (accessToken) {
        fetchRepos();
      }
    }, 3000);
  }, [accessToken]);

  const languageOptions = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "Javascript" },
    { value: "golang", label: "Golang" },
    { value: "java", label: "Java" },
    // Add more language options as needed
  ];

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption);
  };

  const handleLanguageChange2 = (selectedOption) => {
    setSelectedLanguage2(selectedOption);
  };

  const convertCode = () => {
    setSpin(true);

    if (
      !code ||
      !selectedLanguage ||
      selectedLanguage == "none" ||
      !selectedLanguage2 ||
      selectedLanguage2 == "none"
    ) {
      alert("Please enter code and select both source and target language.");
      setSpin(false);
      return;
    } else {
      axios
        .post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Convert the following ${selectedLanguage} code to ${selectedLanguage2}: \n${code}.`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_key}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data.choices[0].message.content);
          setConvertedCode(res.data.choices[0].message.content);

          setSpin(false);
        })
        .catch((err) => {
          console.log(err);
          setSpin(false);
        });
    }
  };

  const debugCode = () => {
    setSpin(true);

    if (!code) {
      alert("Please enter code first.");
      return;
    } else {
      axios
        .post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Debug the following code : \n${code}.\n
            Also provide an explanation of the errors/edge cases and provide the updated code as well.`,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_key}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data.choices[0].message.content);
          setConvertedCode(res.data.choices[0].message.content);
          setSpin(false);
        })
        .catch((err) => {
          console.log(err);
          setSpin(false);
        });
    }
  };

  const checkQuality = () => {
    setSpin(true);

    if (!code) {
      alert("Please enter code first.");
      return;
    } else {
      axios
        .post(
          `https://api.openai.com/v1/chat/completions`,
          {
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: `Check the quality of the following code : \n${code}.\n
            Also provide the quality percentages based on these parameters - \n
            1.Code Consistency\n
            2.Code Performance\n
            3.Code Documentation\n
            4.Error Handling\n
            5.Code Testability\n
            6.Code Modularity\n
            7.Code Complexity\n
            8.Code Duplication\n
            9.Code Readability\n
            Also provide detailed explanation of each parameter.
            `,
              },
            ],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_key}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data.choices[0].message.content);
          setConvertedCode(res.data.choices[0].message.content);
          setSpin(false);
        })
        .catch((err) => {
          console.log(err);
          setSpin(false);
        });
    }
  };

  const handleClear = () => {
    setCode("");
    setConvertedCode("");
  };

  // console.log(selectedLanguage, selectedLanguage2);

  // console.log("repos", repos);

  return (
    <>
      <div className="App">
        <h1 style={{
          color:"grey"
        }}>Advance Code Converter App</h1>

        <div
          style={{
            display: "flex",
            margin: "auto",
            justifyContent: "space-around",
          }}
        >
          <div>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
              languageOptions={languageOptions}
              text={"Select Source Language"}

            />
          </div>
          <div>
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange2}
              languageOptions={languageOptions}
              text={"Select Target Language"}
            />
          </div>
        </div>
      </div>

      <div>{spin && <CircularProgress color="primary" />}</div>

      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "50%",
          }}
        >
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            lang={selectedLanguage}
          />
        </div>

        <div
          style={{
            width: "50%",
            paddingLeft: "20px",
          }}
        >
          <CodeEditor code={convertedCode} lang={selectedLanguage2} />
        </div>
      </div>

      <br />

      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "space-around",
        }}
      >
        <Stack spacing={8} direction="row">
          <Button
            className="responsive-button-container"
            variant="contained"
            onClick={convertCode}
            color='warning'
          >
            Convert
          </Button>
          <Button
            className="responsive-button-container"
            variant="contained"
            onClick={debugCode}
            color='warning'
          >
            Debug
          </Button>
          <Button
            className="responsive-button-container"
            variant="contained"
            onClick={checkQuality}
            color='warning'
          >
            Check Quality
          </Button>


          <Button variant="contained" color='warning' onClick={handleOpenModal}>
            Push Code to Github
          </Button>
          <ModalForm
            open={modalOpen}
            onClose={handleCloseModal}
            accessToken={accessToken}
            repos={repos}
            code = {convertedCode}
          />



          <Button
            className="responsive-button-container"
            variant="contained"
            onClick={handleClear}
            color='warning'
          >
            Clear
          </Button>
        </Stack>
      </div>

      <div
        style={{
          textAlign: "left",
          paddingTop: "20px",
        }}
      >
        <p style={{color:"grey"}}>Created By @Saurabh</p>
      </div>
    </>
  );
}

export default App;





