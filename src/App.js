import React from "react";
import "./App.css";
import Home from "./component/home";
import Record from "./component/record";
import Rank from "./component/rank";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/record">
            <Record />
          </Route>
          <Route path="/rank">
            <Rank />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
