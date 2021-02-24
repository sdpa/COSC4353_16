import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper } from "@material-ui/core";
import { Link } from "react-router-dom";
import SubmitButton from "./SubmitButton";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "50ch",
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  formTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  signUp: {
    float: "left",
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

  return (
    <Grid container spacing={1} direction="column" className={classes.root}>
      <Typography className={classes.formTitle}>Login</Typography>
      <Grid item xs={12}>
        <TextField
          label="Username"
          id="username"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          variant="outlined"
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Password"
          id="password"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          variant="outlined"
          style={{ width: "100%" }}
        />
      </Grid>
      <Link to="/register">
        <Typography className={classes.signUp}>Sign Up</Typography>
      </Link>
      <SubmitButton onClick={handleLogin}></SubmitButton>
    </Grid>
  );
};

export default LogIn;
