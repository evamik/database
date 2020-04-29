import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./redux/history";
import App from "./App";
import PageNotFound from "./components/PageNotFound";
import Contracts from "./components/Contracts";
import Contract from "./components/Contract";
import Workers from "./components/Workers";
import Worker from "./components/Worker";

export default (
  <Router history={history}>
    <App>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/" component={Contracts} />
            <Route exact path="/contracts" component={Contracts} />
            <Route path="/contracts/id=:id" component={Contract} />
            <Route exact path="/workers" component={Workers} />
            <Route path="/workers/id=:id" component={Worker} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </App>
  </Router>
);
