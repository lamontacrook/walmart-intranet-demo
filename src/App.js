import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home, LayoutTwo } from "./components";
import { ErrorBoundary } from "react-error-boundary";

import "./App.css";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert" className="alert">
      <h1>Whoops!</h1>
      <pre>{error.message}</pre>
    </div>
  );
};

function App() {
  return (
    <React.Fragment>
      <BrowserRouter forceRefresh="true">
        <Switch>
          <Route exact={true} path={"/"}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Home />
            </ErrorBoundary>
          </Route>
          <Route exact={true} path={"/layout-two"}>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <LayoutTwo />
            </ErrorBoundary>
          </Route>
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
