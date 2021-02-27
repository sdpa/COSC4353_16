import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Profile from "./Profile/Profile";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "50ch",
    position: "fixed",
    top: "20%",
    left: "50%",
    textAlign: "center",
    transform: "translate(-50%, -50%)",
    marginTop: theme.spacing(2),
  },
  formTitle: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  signUp: {
    float: "left",
  },
}));

const Registration = ({ loggedIn, setLoggedIn }) => {
  const classes = useStyles();

  let history = useHistory();
  const location = useLocation();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [first, setFirst] = useState(true);

  const handleSignUp = () => {
    setFirst(false);
  };

  const handleSubmission = () => {
    setLoggedIn(true);
    history.push("/dashboard");
  };

  return (
    <>
      {first ? (
        <Grid container spacing={1} direction="column" className={classes.root}>
          <Typography className={classes.formTitle}>Sign Up</Typography>
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
          <Link to="/">
            <Typography className={classes.signUp}>Login</Typography>
          </Link>
          <Button
            onClick={handleSignUp}
            variant="contained"
            size="large"
            color="primary">
            Sign Up
          </Button>
        </Grid>
      ) : (
        <Profile handleSubmission={handleSubmission} />
      )}
    </>
  );
};

export default Registration;
