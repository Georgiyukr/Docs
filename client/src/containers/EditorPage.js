import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";

import EditBox from "../components/EditBox";
import Headers from "../components/Headers";
import { withRouter } from 'react-router-dom';



function EditorPage(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());


  return (
    <div className="pageContainer">
      <h1 className="text" style={textstyle}>
        Doc Page
      </h1>
      <Headers location={props.location} />
      <EditBox location={props.location} editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

const textstyle = {
  display: "flex",
  justifyContent: "center"
};

export default withRouter(EditorPage);
