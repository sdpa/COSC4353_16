import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "./components/Registration";
import LogIn from "./components/LogIn";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        <Switch>
          <Route
            path="/"
            exact
            component={<LogIn setLoggedIn={setLoggedIn} />}
          />
          <Route path="/register" exact component={Registration} />
          {/* <Route path="/login" exact component={LogIn} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
