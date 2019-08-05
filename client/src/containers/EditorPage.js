import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import Toolbar from "../components/toolbar";

function EditorPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      <h1>Placeholder for editor page components.</h1>
      <Toolbar />
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default EditorPage;
