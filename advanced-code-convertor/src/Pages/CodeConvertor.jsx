import { useEffect, useState } from "react";
import { CodeEditor } from "../Components/CodeEditor";
import AllButtons from "../Components/AllButtons";
import { langObj } from "../assets/langObj";
import axios from "axios";
import { toast } from "sonner";

export const CodeConvertor = () => {
  const [sourceLang, setSourceLang] = useState("javascript");
  const [targetLang, setTargetLang] = useState("python");
  const [editorText, setEditorText] = useState(langObj[sourceLang]);
  const [convertedText, setConvertedText] = useState(langObj[targetLang]);
  const accessToken = localStorage.getItem("token");
  const [repos, setRepos] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState({
    convert: false,
    debug: false,
    checkQuality: false,
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchRepos = async () => {
      // console.log("access token", accessToken);
      try {
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `token ${accessToken}`,
          },
        });
        console.log("repos", response.data);
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


  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const handleChange = (e, type) => {
    // Update the state with the new code
    if (type === "target") {
      return;
    }
    setEditorText(e);
  };

  const handleConvert = () => {
    if (editorText.trim() === "") {
      toast('Current codes are just boiler plates. Please enter some code first!')
      return;
    }
    convertCode();
  };

  async function convertCode() {
    setIsLoading((prev)=>{
      return {...prev, convert: true };
    });
    try {
      if (!process.env.REACT_APP_API_KEY) {
        throw new Error("Missing API_KEY environment variable");
      }
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Covert the below given code from ${sourceLang} into ${targetLang}-
      ### Code -
      ${editorText}

      Important Note :
      1. No need to write any code explantion.Just convert the code and give the converted code as response.
      2.This output needa to be shown in a code editor so you should format the generated code in that way with comments if needed.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = response.text();

      text = text.split("\n");
      text.shift(0);
      text.pop();
      text = text.join("\n");

      setConvertedText(text);
      setIsLoading((prev)=>{
        return {...prev, convert: false };
      });
    } catch (error) {
      console.error("Error converting code:", error);
      toast('An error occurred while converting code. Please try again later.')
      setIsLoading((prev)=>{
        return {...prev, convert: false };
      });
    }
  }

  const handleDebug = () => {
    if (editorText.trim() === "") {
      toast('Current codes are just boiler plates. Please enter some code first!')
      return;
    }
    debugCode();
  };

  async function debugCode() {
    setIsLoading((prev)=>{
      return {...prev, debug: true };
    });
    try {
      if (!process.env.REACT_APP_API_KEY) {
        throw new Error("Missing API_KEY environment variable");
      }
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Debug the following code : \n${editorText}.\n
            Also provide an explanation of the errors/edge cases and provide the updated code as well.
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = response.text();

      text = text.split("\n");
      text.shift(0);
      text.pop();
      text = text.join("\n");

      setConvertedText(text);
      setIsLoading((prev)=>{
        return {...prev, debug: false };
      })
    } catch (error) {
      console.error("Error converting code:", error);
      toast("An error occurred while converting code. Please try again later.");
      setIsLoading((prev)=>{
        return {...prev, debug: false };
      })
    }
  }

  const handleCheckQuality = ()=>{
    if (editorText.trim() === "") {
      toast("Current codes are just boilerplates. Please enter some code first!")
      return;
    }
    checkCodeQuality();
  }

  const handleClear = ()=>{
    setSourceLang('javascript');
    setTargetLang('python');
  }

  async function checkCodeQuality() {
    setIsLoading((prev)=>{
      return {...prev, checkQuality: true };
    })
  try {
    if (!process.env.REACT_APP_API_KEY) {
      throw new Error("Missing API_KEY environment variable");
    }
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Check the quality of the following code : \n ${editorText}.\n
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
            `;
    const result = await model.generateContent(prompt);
    const response = result.response;
    let text = response.text();

    text = text.split("\n");
    text.shift(0);
    text.pop();
    text = text.join("\n");

    setConvertedText(text);
    setIsLoading((prev)=>{
      return {...prev, checkQuality: false };
    })
  } catch (error) {
    console.error("Error converting code:", error);
    toast("An error occurred while converting code. Please try again later.");

    setIsLoading((prev)=>{
      return {...prev, checkQuality: false };
    });
  }
  }



  return (
    <>
      <div>
        <div className="editor-container">
          <div className="editor-1">
            <div className="editor-1-1">
              <label>Source Language </label>
              <select
                value={sourceLang}
                onChange={(e) => setSourceLang(e.target.value)}
              >
                <option value={"javascript"}>Javascript</option>
                <option value={"python"}>Python</option>
                <option value={"java"}>Java</option>
                <option value={"ruby"}>Ruby</option>
                <option value={"golang"}>GoLang</option>
                <option value={"mysql"}>MySql</option>
                <option value={"kotlin"}>Kotlin</option>
                <option value={"html"}>HTML</option>
                <option value={"csharp"}>C-Sharp</option>
              </select>
            </div>
            <CodeEditor
              defaultLang={sourceLang}
              editorText={editorText}
              handleChange={handleChange}
              type={"source"}
            />
          </div>

          <div className="editor-2">
            <div className="editor-2-1">
              <label>Target Language </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
              >
                <option value={"javascript"}>Javascript</option>
                <option value={"python"}>Python</option>
                <option value={"java"}>Java</option>
                <option value={"ruby"}>Ruby</option>
                <option value={"golang"}>GoLang</option>
                <option value={"mysql"}>MySql</option>
                <option value={"kotlin"}>Kotlin</option>
                <option value={"html"}>HTML</option>
                <option value={"csharp"}>C-Sharp</option>
              </select>
            </div>
            <CodeEditor
              defaultLang={targetLang}
              handleChange={handleChange}
              type={"target"}
              convertedText={convertedText}
            />
          </div>
        </div>
        <div className="button-container">
          <AllButtons isConvertLoading={isLoading.convert} isDebugLoading={isLoading.debug} isCheckQualityLoading={isLoading.checkQuality} handleConvert={handleConvert} handleDebug={handleDebug} handleCheckQuality={handleCheckQuality} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} modalOpen={modalOpen} repos={repos} convertedText={convertedText} handleClear={handleClear}/>
        </div>
      </div>
    </>
  );
};
