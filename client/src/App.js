import React from "react";
import EditorPage from "./containers/EditorPage";
import { Route, BrowserRouter } from "react-router-dom";


function App() {
  return (
    <BrowserRouter >
      <Route path="/" exact={true} component={EditorPage} />
    </BrowserRouter>



  );
}

export default App;
