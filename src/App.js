import "./App.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Registration from "./components/Registration";
import LogIn from "./components/LogIn";
import Profile from "./components/Profile/Profile";
import FuelQuoteForm from "./components/FuelQuoteForm";
import Home from "./components/Home";

const useStyles = makeStyles((theme) => ({
  // app: {
  //   testAlign: "center",
  // },
}));

function App() {
  const classes = useStyles();

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <div className={classes.app}>
          <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn}></Navbar>
          <Switch>
            <Route path="/" exact>
              <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Route>
            <Route path="/register" exact>
              <Registration loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Route>
            <Route path="/profile" exact>
              <Profile loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Route>
            <Route path="/dashboard" exact>
              <Home loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            </Route>
            {/* <Route path="/register" exact component={Registration} /> */}
          </Switch>
        </div>
      </Router>
    </>
  );
  //return <div>test</div>;
}

export default App;
