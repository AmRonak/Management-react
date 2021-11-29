import React, { useContext } from "react";
import Main from "./Main";
import Login from "./components/Login";
import { Redirect, Route, Switch } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import AuthContext from "./contexts/AuthContext";

function App() {
  const AuthCtx = useContext(AuthContext);

  return (
    <Switch>
      <Route exact path="/">
        {AuthCtx.loggedIn !== "" ? (
          <Redirect to="/student-details" />
        ) : (
          <Login />
        )}
      </Route>

      <Route exact path="/student-details">
        {AuthCtx.loggedIn === "" ? <Redirect to="/" /> : <Main />}
      </Route>

      <Route exact path="/forgot-password">
        {AuthCtx.loggedIn !== "" ? (
          <Redirect to="/student-details" />
        ) : (
          <ForgotPassword />
        )}
      </Route>

      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
}

export default App;
