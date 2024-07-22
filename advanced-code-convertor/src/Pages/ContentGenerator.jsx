import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { toast } from "sonner";

export const ContentGenerator = () => {
  const [userInput, setUserInput] = useState("");
  const [wordLimits] = useState([
    { value: 50, label: "50 Words" },
    { value: 100, label: "100 Words" },
    { value: 200, label: "200 Words" },
    { value: 300, label: "300 Words" },
    { value: 500, label: "500 Words" },
  ]);
  const [selectedWordLimit, setSelectedWordLimit] = useState(wordLimits[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generatedContent, setGeneratedContent] = useState("");

  console.log({ userInput, selectedWordLimit });

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleWordLimitChange = (event) => {
    setSelectedWordLimit(
      wordLimits.find((limit) => limit.value === Number(event.target.value))
    );
  };

  const handleSubmit = async () => {
    if (!userInput) {
      setError("Please enter some text to generate content.");
      toast('Please enter some text to generate content.')
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Generate content on the given below topic

      Topic - ${userInput}

      Word Limit - ${selectedWordLimit.label}
      `;

      const result = await model.generateContent(prompt);
      const response = result.response;
      let text = response.text();

      setGeneratedContent(text);
    } catch (error) {
      console.error("Error generating content:", error);
      setError("An error occurred. Please try again.");
      toast('An error occurred. Please try again.')
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setUserInput("");
    setSelectedWordLimit(wordLimits[0]);
    setGeneratedContent("");
    setError(null);
  };

  console.log({error});

  return (
    <div className="gemini-container">
      <h1 className="glowing-text" style={{marginTop:"10px"}}>Content Generator</h1>
      <div className="input-container">
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Enter your topic here"
        />
        <select
          value={selectedWordLimit.value}
          onChange={handleWordLimitChange}
        >
          {wordLimits.map((limit) => (
            <option key={limit.value} value={limit.value}>
              {limit.label}
            </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <section class="dots-container">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
              </section>
            </>
          ) : (
            "Generate Content"
          )}
        </button>
        <button onClick={handleClear} disabled={!userInput}>
          Clear
        </button>
      </div>
      {generatedContent && (
        <div className="output-container">
          <h2
            className="glowing-text"
            style={{ fontSize: "24px", padding: "0px" }}
          >
            Generated Content
          </h2>
          <textarea value={generatedContent} rows="10" disabled />
        </div>
      )}
    </div>
  );
};
