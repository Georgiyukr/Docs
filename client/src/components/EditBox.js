import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import Toolbar from "./Toolbar";
import io from "socket.io-client";
const socket = io("http://localhost:4000");
let run = false;

function EditBox({ location, editorState, onChange, saveDocument, docContent }) {
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
    padding: "5px"
  };

  const whole = {
    display: "flex",
    justifyContent: "center",
    marginTop: 50,
    height: 300
  };



  useEffect(() => {
    if (!run) {
      let docID = location.pathname.split("/")[2];
      socket.emit("docID", docID);
      const specialSocket = io('http://localhost:4000/' + docID);
      specialSocket.emit("hi", "hi");
      run = true;
    }
    // console.log("rendering editbox!");
    if (docContent) {
      // console.log("we have doc content in editbox:", docContent);
      docContent = JSON.parse(docContent);
      // console.log("we have doc content in editbox:", docContent);
      let cookedContent = convertFromRaw(docContent);
      // console.log("cooked", cookedContent);
      onChange(EditorState.createWithContent(cookedContent));


    }
  }, [docContent && docContent.doc]);

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
            onChange={editorState => {
              onChange(editorState);
              const contentState = editorState.getCurrentContent();
              saveDocument(contentState);
            }}
            placeholder="Type below this line"
          />
        </div>
      </div>
    </div>
  );
}

export default EditBox;
