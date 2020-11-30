import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PrivateRoute from "./components/Route/PrivateRoute";

function AppRouter() {
  return (
    <Router>
      <div>
        <Route path='/auth' component={Auth} />
        <PrivateRoute exact path='/todos' component={Home} />
      </div>
    </Router>
  );
}

export default AppRouter;
