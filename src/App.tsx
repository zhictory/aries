import React from 'react';
import './App.css';
import Home from './component/home';
import Record from './component/record';
import Rank from './component/rank';
import Language from './component/language';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/tool/language">
            <Language />
          </Route>
          <Route path="/tool/record">
            <Record />
          </Route>
          <Route path="/tool/rank">
            <Rank />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
