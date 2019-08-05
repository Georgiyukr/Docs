import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import EditBox from "../components/EditBox";

function EditorPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <div>
      <h1>Doc editor page</h1>
      <div className="banner"> Sample Document </div>
      <EditBox editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default EditorPage;
