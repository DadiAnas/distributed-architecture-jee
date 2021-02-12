import React from "react";
import { Switch, Route } from "react-router-dom";
import CategoryProductsPage from "./ClientsOperationsPage";
import CategoriesPage from "./ClientsPage";
import HomePage from "./HomePage";
import ProductsPage from "./OperationsPage";
import SettingsPage from "./SettingsPage";

function Routes() {
  return (
    <Switch>
      <Route exact path="/opertaions">
        <ProductsPage />
      </Route>
      <Route exact path="/clients">
        <CategoriesPage />
      </Route>
      <Route exact path="/clients/:clientId/operations">
        <CategoryProductsPage />
      </Route>
      <Route exact path="/settings">
        <SettingsPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  );
}

export default Routes;
