import React from "react";
import "../App.css"

class Headers extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <button className="HeaderButton" type="submit" >Back to Documents Portal</button>
                <h1>Doc editor page</h1>
                <span>Shareable Document ID: (id here)</span><br></br>
                <button className="HeaderButton" type="submit" >Save Changes</button>
                <div className="banner"> Sample Document </div>
            </div>

        )
    }
}

export default Headers