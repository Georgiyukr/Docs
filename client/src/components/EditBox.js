import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, Modifier } from "draft-js";
import Toolbar from "./toolbar";

function EditBox({ editorState, onChange }) {
  // const editBoxStyle = {
  //   background: "#fff",
  //   border: "3px solid #ddd",
  //   fontFamily: "Georgia, serif",
  //   fontSize: "14px",
  //   padding: "15px"
  // };
  // const inputBoxStyle = {
  //   borderTop: "1px solid #ddd",
  //   cursor: "text",
  //   fontSize: "16px",
  //   marginTop: "10px"
  // };

  const editBoxStyle = {
    background: "#fff",
    border: "3px solid #ddd",
    fontFamily: "Georgia",
    fontSize: "30px",
    padding: "1 5px",
    width: 550,
    height: 200,

    padding: 40
  };
  const inputBoxStyle = {
    borderTop: "1px solid #ddd",
    cursor: "text",
    fontSize: "20px",
    marginTop: "10px",
    fontFamily: "Georgia"
  };

  const whole = {
    display: "flex",
    justifyContent: "center"
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

  return (
    <div style={editBoxStyle}>
      <Toolbar alignText={alignText} />
      <div style={inputBoxStyle}>
        <Editor
          blockStyleFn={myBlockStyleFn}
          editorState={editorState}
          onChange={onChange}
          placeholder="Type below this line"
        />
      </div>
    </div>
  );
}

export default EditBox;
