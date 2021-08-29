import React from "react";
import "./style/App.less";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} component={route.component}></Route>
          ))}
          <Redirect from="/tool" to="/tool/home"></Redirect>
          <Redirect from="/" to="/tool/home"></Redirect>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
