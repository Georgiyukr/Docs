import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import EditBox from "../components/EditBox";
import Headers from "../components/Headers";

function EditorPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());



  return (
    <div>
      <Headers />

      <EditBox editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default EditorPage;
