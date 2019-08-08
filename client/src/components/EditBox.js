import React, { useState } from "react";
import ReactDOM from "react-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  Modifier,
  convertToRaw
} from "draft-js";
import Toolbar from "./Toolbar";

function EditBox({ editorState, onChange }) {
  const editBoxStyle = {
    background: "#fff",
    border: "3px solid #ddd",
    fontFamily: "Georgia, serif",
    fontSize: "14px",
    padding: "15px"
  };
  // const inputBoxStyle = {
  //   borderTop: "1px solid #ddd",
  //   cursor: "text",
  //   fontSize: "16px",
  //   marginTop: "10px"
  // };

  // const editBoxStyle = {
  //   background: "#fff",
  //   border: "3px solid #ddd",
  //   // fontFamily: "Georgia",
  //   // fontSize: "50px",

  //   width: 550,
  //   height: 200,
  //   justifyContent:"center",
  //   padding: 40,
  //   margin: 10

  // };
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
    fetch("/:docID/saveDoc", {
      //will prob have to pass in actual docID to fetch here
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(convertToRaw(content))
    }).catch(err => console.log(err));
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
            onChange={() => {
              const contentState = editorState.getCurrentContent();
              // console.log("content state", convertToRaw(contentState));
              onChange(editorState);
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
