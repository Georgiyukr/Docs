'use strict';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Editor, EditorState } from "draft-js";
import App from "../App.css"



class Editors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }; 
  }

  onChange = (editorState) => {
    this.setState({
      editorState
    })
  }
  

  render() {
    return (
      <div style={whole}>
      <div className="editorContainer" style={editBoxStyle}>
       <div className="editors" style={inputBoxStyle}>
       
        <Editor placeholder="Start..." 
          editorState={this.state.editorState}
          onChange={this.onChange.bind(this)}
        />
        </div>
      </div>
      </div>
    )
  }
}

const editBoxStyle = {
  
  background: "#fff",
  border: "3px solid #ddd",
  fontFamily: "Georgia",
  fontSize: "30px",
  padding: "1 5px",
  width: 550,
  height: 200,
  
  padding: 40,

  
};
const inputBoxStyle = {
  borderTop: "1px solid #ddd",
  cursor: "text",
  fontSize: "20px",
  marginTop: "10px",
  fontFamily: "Georgia",
};

const whole ={
  display: "flex",
  justifyContent:"center"
}



export default Editors