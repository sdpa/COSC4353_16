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
          <Route path="/" exact>
            <LogIn />
          </Route>
          <Route>
            <Registration />
          </Route>
          {/* <Route path="/register" exact component={Registration} /> */}
        </Switch>
      </div>
    </Router>
  );
  //return <div>test</div>;
}

export default App;
