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
import DropdownButton from "popper.js";
//import { Dropdown } from "popper.js";

class Toolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="doc">
                <button className="tb-btn" onClick={() => { this.props.onBoldClick(); }}>
                    <h2 className="icon">
                        <MdFormatBold />
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onItalicClick(); }}>
                    <h2 className="icon">
                        <MdFormatItalic />
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onUnderlineClick(); }}>
                    <h2 className="icon">
                        <MdFormatUnderlined />
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("header-one") }}>
                    <h2 className="icon">
                        H1
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("header-two") }}>
                    <h2 className="icon">
                        H2
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("header-three") }}>
                    <h2 className="icon">
                        H3
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("header-four") }}>
                    <h2 className="icon">
                        H4
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("header-five") }}>
                    <h2 className="icon">
                        H5
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("header-six") }}>
                    <h2 className="icon">
                        H6
                    </h2>
                </button>
                <button className="tb-btn" >
                    <h2 className="icon"><MdFormatColorFill /></h2>
                    {/* <input className="tb-input" placeholder="font-color" /> */}
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
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("unordered-list-item") }}>
                    <h2 className="icon">
                        <GoListUnordered />
                    </h2>
                </button>
                <button className="tb-btn" onClick={() => { this.props.onBlockStyleChange("ordered-list-item") }}>
                    <h2 className="icon">
                        <GoListOrdered />
                    </h2>
                </button>
            </div>
        );
    }
}

export default Toolbar;
