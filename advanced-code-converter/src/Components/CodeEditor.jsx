import React from "react";
import AceEditor from "react-ace";

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools'; // Import language tools extension



function CodeEditor({ code, onChange, lang }) {
   
  return (
    <div
      style={{
        paddingTop: "30px",
      }}
    >
      <AceEditor
        mode={lang}
        theme="monokai"
        width="100%"
        wrapEnabled={true}
        height="400px"
        value={code}
        onChange={onChange}
        name="code-editor"
        editorProps={{ $blockScrolling: Infinity }}
        enableBasicAutocompletion={true}
        enableLiveAutocompletion={true}
        setOptions={{
          useWorker: false, // Disable worker to make autocomplete work
        }}
      />
    </div>
  );
}

export default CodeEditor;
