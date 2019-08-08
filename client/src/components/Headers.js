import React from "react";
import "../App.css";
import { Link } from "react-router-dom";


class Headers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      docID: ""
    }
  }
  componentDidMount() {
    //console.log(this.props.location.pathname.split("/")[2])
    this.setState({
      docID: this.props.location.pathname.split("/")[2]
    })
  }
  render() {
    return (
      <div style={headers}>
        <div>
          <button className="HeaderButton" type="submit">
            <Link to="/portalPage">Back to Documents Portal</Link>
          </button>
          <h1>Doc editor page</h1>
          <span>Shareable Document ID: {this.state.docID}</span>
          <br />
          <button className="HeaderButton" type="submit">
            Save Changes
        </button>
          <div className="banner"> Sample Document </div>
        </div>
      </div>
    );
  }
}
const headers = {
  display: "flex",
  justifyContent: "center"
}

export default Headers;
