import React from "react";
import EditorPage from "./containers/EditorPage";
import Login from "./containers/Login";
<<<<<<< HEAD
import Register from "./containers/Register";
=======
>>>>>>> 8a7d367f22790b85163d75c6fd50bdbe07b01109
import { Route, BrowserRouter } from "react-router-dom";
import Login from "./containers/Login";
import Register from "./containers/Register";

function App() {
  return (
<<<<<<< HEAD
    <BrowserRouter >
      <Route path="/" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
      <Route path="/editorPage" exact={true} component={EditorPage} />
      {/* <Route path="" /> */}
=======
    <BrowserRouter>
      <Route path="/" exact={true} component={Login} />
      <Route path="/register" exact={true} component={Register} />
      <Route path="/editorPage" exact={true} component={EditorPage} />
>>>>>>> 8a7d367f22790b85163d75c6fd50bdbe07b01109
    </BrowserRouter>
  );
}

export default App;
