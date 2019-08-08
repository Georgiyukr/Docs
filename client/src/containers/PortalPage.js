import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

function PortalPage(props) {
  const [documentState, setDocumentState] = useState([]);
  const [newDoc, setNewDocState] = useState("");
  useEffect(() => {
    fetch("http://localhost:4000/db/userDocuments")
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        setDocumentState(responseJson);
      })
      .catch(err => {
        console.log("ERROR IS IN USE EFFECT", err);
      });
  }, []);

  function handleTyping(event) {
    setNewDocState(event.target.value);
  }

  function addDocument(event) {
    event.preventDefault();
    fetch("http://localhost:4000/db/createDocument", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ docName: newDoc })
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          setDocumentState(documentState.push(responseJson.data));
        }
      })
      .catch(err => {
        console.log("ERROR IS IN ADD DOC", err);
      });
    setNewDocState("");
  }

  return (
    <div>
      <h1>Document Portal</h1>
      <span>
        <input
          type="text"
          onChange={event => handleTyping(event)}
          placeholder="Type document name here"
        />
        <button onClick={event => addDocument(event)}>Create Document</button>
      </span>
      <div>
        <h4>Your documents</h4>
        {documentState.map(d => (
          <Link to={`/${d._id}`}>{d.name}</Link>
        ))}
      </div>
      <span>
        <input type="text" />
        <button onClick={addDocument}>Add Shared Document</button>
      </span>
    </div>
  );
}

export default PortalPage;
