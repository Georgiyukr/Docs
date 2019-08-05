import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import Toolbar from "./Toolbar";

function EditBox({ editorState, onChange }) {
  const editBoxStyle = {
    background: "#fff",
    border: "3px solid #ddd",
    fontFamily: "Georgia, serif",
    fontSize: "14px",
    padding: "15px"
  };
  const inputBoxStyle = {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: "16px",
    marginTop: "10px"
  };

  return (
    <div style={editBoxStyle}>
      <Toolbar />
      <div style={inputBoxStyle}>
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="Tell a story..."
        />
      </div>
    </div>
  );
}

export default EditBox;
