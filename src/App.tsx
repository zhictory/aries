import React from "react";
import "./App.less";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((route) => (
            <Route key={route["path"]} path={route["path"]} component={route["component"]}></Route>
          ))}
        </Switch>
        <Redirect from="/" to="/tool"></Redirect>
      </BrowserRouter>
    </div>
  );
}

export default App;
