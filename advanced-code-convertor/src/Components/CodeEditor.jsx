import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-mysql";
import "ace-builds/src-noconflict/mode-ruby";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools"; // Import language tools extension
import { langObj } from "../assets/langObj";

export const CodeEditor = ({
  defaultLang,
  editorText = "",
  handleChange,
  type,
  convertedText = "",
}) => {

  console.log({type, editorText, defaultLang,convertedText});
  let currVal = '';

  if(type != "source"){
    if( convertedText.length > 0 ){
      currVal = convertedText
    }else{
      currVal = langObj[defaultLang]
    }
  }else{
    if(editorText.length > 0){
      currVal = editorText
    }else{
      currVal = langObj[defaultLang]
    }
  }

  return (
    <>
      <div>
        <AceEditor
          mode={defaultLang}
          theme="monokai"
          width="100%"
          wrapEnabled={true}
          height="430px"
          value={currVal}
          onChange={(e) => handleChange(e, type)}
          name="code-editor"
          fontSize={18}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          editorProps={{ $blockScrolling: Infinity }}
          enableBasicAutocompletion={true}
          enableLiveAutocompletion={true}
          setOptions={{
            useWorker: false,
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
    </>
  );
};
