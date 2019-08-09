import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw
} from "draft-js";
import Toolbar from "./Toolbar";
import io from 'socket.io-client';
const socket = io('http://localhost:4000');

function EditBox({ editorState, onChange }) {
  const editBoxStyle = {
    background: "#fff",
    border: "3px solid #ddd",
    fontFamily: "Georgia, serif",
    fontSize: "14px",
    padding: "15px"
  };

  const inputBoxStyle = {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: "20px",
    marginTop: "10px",
    fontFamily: "Georgia",
    padding: "5px",
    marginTop: "10px"
  };

  const whole = {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
    height: 300
  };

  // useEffect(() => {
  //   fetch("localhost:3000/:docID/saveDoc", {
  //     method: "POST",
  //     credentials: "include",
  //     redirect: "follow",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ docID: params.docID })
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log("res from posting docID to server side", res);
  //     })
  //     .catch(err => {
  //       console.log("err in posting docID to server side", err);
  //     });
  // });

  const alignText = style => {
    let currentContent = editorState.getCurrentContent();
    let selection = editorState.getSelection();
    // let focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
    // let anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
    // let selectionIsBackward = selection.getIsBackward();

    // let changes = {
    //   anchorOffset: 0,
    //   focusOffset: focusBlock.getLength()
    // };

    // if (selectionIsBackward) {
    //   changes = {
    //     focusOffset: 0,
    //     anchorOffset: anchorBlock.getLength()
    //   };
    // }
    console.log("yeaaa");

    let nextContentState = Modifier.setBlockType(
      currentContent,
      selection,
      style
    );
    onChange(
      EditorState.push(editorState, nextContentState, "change-block-type")
    );
  };

  function myBlockStyleFn(contentBlock) {
    const type = contentBlock.getType();
    console.log(type);
    if (type === "LEFT") {
      return "left";
    }
    if (type === "CENTER") {
      return "center";
    }
    if (type === "RIGHT") {
      return "right";
    }
  }

  const _onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const _onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const _onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const _onBlockStyleChange = style => {
    onChange(RichUtils.toggleBlockType(editorState, style));
  };

  // const _onFontColorChange = (color) => {
  //   onChange(RichUtils.toggleBlockType(
  //     editorState
  //   ))

  // }
  const saveDocument = content => {
    // fetch("http://localhost:4000/db/:docID/saveDoc", {
    //   //will prob have to pass in actual docID to fetch here
    //   credentials: "include",
    //   redirect: "follow",
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(convertToRaw(content))
    // }).catch(err => console.log(err));
  };



  return (
    <div style={whole}>
      <div style={editBoxStyle}>
        <Toolbar
          alignText={alignText}
          onBoldClick={_onBoldClick}
          onItalicClick={_onItalicClick}
          onUnderlineClick={_onUnderlineClick}
          onBlockStyleChange={_onBlockStyleChange}
        />
        <div style={inputBoxStyle}>
          <Editor
            blockStyleFn={myBlockStyleFn}
            editorState={editorState}
            onChange={(editorState) => {
              // const contentState = editorState.getCurrentContent();
              // // console.log("content state", convertToRaw(contentState));
              // socket.on("change", (data) => {
              //   console.log(data)
              //   onChange(data);
              // })
              onChange(editorState);
              // saveDocument(contentState);
              socket.emit("message", editorState);
            }}
            placeholder="Type below this line"
          />
        </div>
      </div>
    </div>
  );
}

export default EditBox;
