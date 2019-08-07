import React from "react";
import EditorPage from "./containers/EditorPage";
import Login from "./containers/Login";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
    </BrowserRouter>
  );
}

export default App;
