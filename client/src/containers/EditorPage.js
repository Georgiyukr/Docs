import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";

import EditBox from "../components/EditBox";
import Headers from "../components/Headers";

function EditorPage() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    fetch("http:localhost:4000/db/editorPage/DOCIDHERE", {
      method: "GET",
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => console.log(res))
      .then(res => {
        console.log("res from getting clicked doc from server side", res);
      })
      .catch(err => {
        console.log("err in getting clicked doc from server side", err);
      });
  });
  return (
    <div className="pageContainer">
      <h1 className="text" style={textstyle}>
        Doc Page
      </h1>
      <Headers />
      <EditBox editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

const textstyle = {
  display: "flex",
  justifyContent: "center"
};

export default EditorPage;
