import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState} from "draft-js";
import Editors from './Editors'


function EditorPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  
  return (
    <div >
      <h1 className="text" style={textstyle}>Doc Page</h1>
      <Editors editorState={editorState} onChange={setEditorState} />
      
      
    </div>
  );
}

const textstyle = {
display: "flex",
justifyContent: "center",

}


export default EditorPage;
