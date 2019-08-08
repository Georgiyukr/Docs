import React from "react";
import EditorPage from "./containers/EditorPage";
import Login from "./containers/Login";
import { Route, BrowserRouter } from "react-router-dom";
import Register from "./containers/Register";
import PortalPage from "./containers/PortalPage";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
      <Route path="/editorPage/:id" exact={true} component={EditorPage} />
      <Route path="/portalPage" exact={true} component={PortalPage} />
    </BrowserRouter>
  );
}

export default App;
