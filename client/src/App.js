import React from "react";
import EditorPage from "./containers/EditorPage";
import Login from "./containers/Login";
import Register from "./containers/Register";
import { Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter >
      <Route path="/" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
      <Route path="/editorPage" exact={true} component={EditorPage} />
      {/* <Route path="" /> */}
    </BrowserRouter>



  );
}

export default App;
