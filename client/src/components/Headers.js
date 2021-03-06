import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docID: ""
    };
  }
  componentDidMount() {
    //console.log(this.props.location.pathname.split("/")[2])
    this.setState({
      docID: this.props.location.pathname.split("/")[2]
    });
  }
  render() {
    return (
      <div >
        <div>
          <button className="HeaderButton" type="submit">
            <Link to="/portalPage">Back to Documents Portal</Link>
          </button>
          <h1>Doc editor page</h1>
          <span>Shareable Document ID: {this.state.docID}</span>
          <br />
          <button
            className="HeaderButton"
            type="submit"
            onClick={docContent =>
              this.props.saveDocument(this.props.docContent)
            } //need to pass in content of editbox here for this to work
          >
            Save Changes
          </button>
          <div className="banner">
            {" "}
            <h3>{this.props.docTitle}</h3>
          </div>
        </div>
      </div>
    );
  }
}
const headers = {
  display: "flex",
  justifyContent: "center"
};

export default Headers;
