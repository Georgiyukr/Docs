import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

function PortalPage(props) {
  const [documentState, setDocumentState] = useState([]);
  const [newDoc, setNewDocState] = useState("");

  const updateDocuments = () => {
    fetch("http://localhost:4000/db/userDocuments", { credentials: "include" })
      .then(response => {
        return response.json();
      })
      .then(responseJson => {
        setDocumentState(responseJson.docArr);
        setNewDocState("");
        console.log(documentState);
      })
      .catch(err => {
        console.log("ERROR IS IN USE EFFECT", err);
      });
  };

  useEffect(() => {
    updateDocuments();
  }, []);

  function handleTyping(event) {
    setNewDocState(event.target.value);
  }

  function addDocument(event, newDoc) {
    //console.log(JSON.stringify({ docName: newDoc }));
    event.preventDefault();

    fetch("http://localhost:4000/db/createDocument", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ docName: newDoc })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);

        documentState.push(responseJson);
        updateDocuments();
      })
      .catch(err => {
        console.log("ERROR IS IN ADD DOC", err);
      });
  }

  return (
    <div>
      <h1>Document Portal</h1>
      <span>
        <input
          type="text"
          onChange={event => handleTyping(event)}
          value={newDoc}
        />
        <button
          onClick={event => {
            console.log(newDoc);
            addDocument(event, newDoc);
          }}
        >
          Create Document
        </button>
      </span>
      <ul>
        {documentState.map(d => (
          <li>
            <Link to={`/editorPage/${d._id}`}>{d.title}</Link>
          </li>
        ))}
      </ul>

      <span>
        <input type="text" />
        <button onClick={addDocument}>Add Shared Document</button>
      </span>
    </div>
  );
}

export default PortalPage;
