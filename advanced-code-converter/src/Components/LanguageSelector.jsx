

import React from "react";

import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const LanguageSelector = ({
  selectedLanguage,
  onLanguageChange,
  languageOptions,
  text
}) => {
  const handleChange = (e) => {
    onLanguageChange(e.target.value); // Pass the selected language to the parent component
  };

  return (
    <div className="language-selector">
      <label style={{ fontSize: "20px", color:"grey" }}>{text} :</label>
      <br />
      <br />

      <div style={{}}>
        <FormControl
          sx={{
            m: 1,
            minWidth: 220,
            backgroundColor: "#E1F5FE",
            borderRadius: "5px",
          }}
        >
          <InputLabel>Select a Language</InputLabel>
          <Select onChange={handleChange}>
            <MenuItem value="none">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"python"}>Python</MenuItem>
            <MenuItem value={"javascript"}>Javascript</MenuItem>
            <MenuItem value={"golang"}>Golang</MenuItem>
            <MenuItem value={"java"}>Java</MenuItem>
          </Select>
        </FormControl>

        

        <br />
        <br />
      </div>
    </div>
  );
};

export default LanguageSelector;
