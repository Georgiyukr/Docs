import React from "react";
import EditorPage from "./containers/EditorPage";
import Login from "./containers/Login";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Register from "./containers/Register";

function App() {
  return (
    // <BrowserRouter>
    //   <Route path="/" exact={true} component={Login} />
    //   <Route path="/register" exact={true} component={Register} />
    //   <Route path="/editorPage" exact={true} component={EditorPage} />
    // </BrowserRouter>
    <EditorPage />
  );
}

export default App;
