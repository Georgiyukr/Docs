import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState, RichUtils } from "draft-js";
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
    justifyContent: "center"
  };

  const _onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(
      editorState, "BOLD"
    ));
  };

  const _onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(
      editorState, "ITALIC"
    ));

  };

  const _onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(
      editorState, "UNDERLINE"
    ));

  };

  const _onBlockStyleChange = (style) => {
    onChange(RichUtils.toggleBlockType(
      editorState, style
    ));

  }



  // const _onFontColorChange = (color) => {
  //   onChange(RichUtils.toggleBlockType(
  //     editorState
  //   ))

  // }

  return (
    <div style={whole}>
     
    <div style={editBoxStyle}>
      <Toolbar onBoldClick={_onBoldClick} onItalicClick={_onItalicClick}
        onUnderlineClick={_onUnderlineClick} onBlockStyleChange={_onBlockStyleChange} />
      <div style={inputBoxStyle}>
      
        <Editor
          editorState={editorState}
          onChange={onChange}
          placeholder="Type below this line"
        />
      </div>
    </div>
    </div>
  );
}

export default EditBox;
