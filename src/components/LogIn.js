import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Box, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { DriveEtaTwoTone } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "40ch",
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    "& *": {
      paddingBottom: theme.spacing(0.5),
    },
  },
  formTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  signUp: {
    // textDecoration: "none",
  },
}));

const LogIn = (props) => {
  const classes = useStyles();

  const handleLogin = () => {
    console.log("Logged In");
    props.setLoggedIn(true);
  };

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  axios
    .get("http://localhost:9000")
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className={classes.root}>
      <Typography className={classes.formTitle}>Login</Typography>
      <TextField
        label="Username"
        id="username"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        variant="outlined"
        style={{ width: "100%" }}
      />
      <TextField
        label="Password"
        id="password"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
        variant="outlined"
        style={{ width: "100%" }}
      />
      <Link
        to={{
          pathname: "/register",
          // state: {
          //   test: "test",
          //   loggedIn: props.loggedIn,
          //   setLoggedIn: props.setLoggedIn,
          // },
        }}
        style={{ textDecoration: "none" }}>
        <Typography className={classes.signUp}>Sign Up</Typography>
      </Link>
      <Button
        onClick={handleLogin}
        variant="contained"
        size="large"
        color="primary">
        Submit
      </Button>
    </div>
  );
};

export default LogIn;
