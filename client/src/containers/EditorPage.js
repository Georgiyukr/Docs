import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, convertToRaw } from "draft-js";

import EditBox from "../components/EditBox";
import Headers from "../components/Headers";
import { withRouter } from "react-router-dom";

function EditorPage(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [currentDocState, setCurrentDocState] = useState(null);
  const docID = props.location.pathname.split("/")[2];
  useEffect(() => {
    // console.log("location", props.location.pathname);

    fetch(`http://localhost:4000/db/editorPage/${docID}`, {
      method: "GET",
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(resJSON => {
        console.log("res from getting clicked doc from server side", resJSON);
        setCurrentDocState(resJSON);
        console.log("current doc state", currentDocState);
      })
      .catch(err => {
        console.log("err in getting clicked doc from server side", err);
      });
  }, []);

  const saveDocument = content => {
    fetch(`http://localhost:4000/db/${docID}/saveDoc`, {
      //will prob have to pass in actual docID to fetch here
      credentials: "include",
      redirect: "follow",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: JSON.stringify(convertToRaw(content)) })
    })
      .then(res => {
        if (res.success) {
          console.log("updated doc!");
        }
        if (!res.success) {
          console.log(res.error);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="pageContainer">
      <h1 className="text" style={textstyle}>
        Doc Page
      </h1>
      <Headers
        location={props.location}
        docTitle={currentDocState && currentDocState.doc.title}
        saveDocument={saveDocument}
      />
      <EditBox
        location={props.location}
        editorState={editorState}
        onChange={setEditorState}
        docContent={
          currentDocState &&
          currentDocState.doc.content &&
          currentDocState.doc.content
        }
        saveDocument={saveDocument}
      />
    </div>
  );
}

const textstyle = {
  display: "flex",
  justifyContent: "center"
};

export default withRouter(EditorPage);
