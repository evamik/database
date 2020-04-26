import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { history } from "./redux/history";
import App from "./App";
import PageNotFound from "./components/PageNotFound";
import Contracts from "./components/Contracts";
import Contract from "./components/Contract";
import Clients from "./components/Clients";

export default (
  <Router history={history}>
    <App>
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path="/contracts" component={Contracts} />
            <Route path="/contracts/id=:id" component={Contract} />
            <Route path="/clients" component={Clients} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </App>
  </Router>
);
