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
        //console.log("res from getting clicked doc from server side", resJSON);
        setCurrentDocState(resJSON);
        //console.log("current doc state", currentDocState);
      })
      .catch(err => {
        console.log("err in getting clicked doc from server side", err);
      });
  }, [currentDocState && currentDocState.doc]);

  const saveDocument = content => {
    fetch(`http://localhost:4000/db/${docID}/saveDoc`, {
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
    <div style={{ display: "grid" }}>
      <h1 className="text" >
        Doc Page
      </h1>
      <Headers
        location={props.location}
        docTitle={currentDocState && currentDocState.doc.title}
        saveDocument={saveDocument}
        docContent={
          currentDocState &&
          currentDocState.doc.content &&
          currentDocState.doc.content
        }
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



export default withRouter(EditorPage);
