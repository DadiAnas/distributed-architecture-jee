import React from "react";
import { Switch, Route } from "react-router-dom";
import ClientOperationsPage from "./ClientsOperationsPage";
import ClientsPage from "./ClientsPage";
import HomePage from "./HomePage";
import OperationsPage from "./OperationsPage";
import SettingsPage from "./SettingsPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/operations">
        <OperationsPage />
      </Route>
      <Route exact path="/comptes">
        <ClientsPage />
      </Route>
      <Route exact path="/compte/:compteId/operations">
        <ClientOperationsPage />
      </Route>
      <Route exact path="/clients">
        <SettingsPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default Routes;
