import React from "react";
import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdFormatSize,
  MdFormatColorFill,
  MdFormatUnderlined,
  MdFormatItalic,
  MdFormatBold
} from "react-icons/md";
import { GoListOrdered, GoListUnordered } from "react-icons/go";
import "../App.css";

class Toolbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="doc">
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatBold />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatItalic />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatUnderlined />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatColorFill />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatSize />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatAlignLeft />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatAlignCenter />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <MdFormatAlignRight />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <GoListUnordered />
          </h2>
        </button>
        <button className="tb-btn">
          <h2 className="icon">
            <GoListOrdered />
          </h2>
        </button>
      </div>
    );
  }
}

export default Toolbar;
