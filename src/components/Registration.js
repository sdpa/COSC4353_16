import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography, Paper, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import Profile from "./Profile/Profile";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { useFormik } from "formik";
import {
  ErrorOutlineSharp,
  SettingsInputAntennaTwoTone,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    width: "50ch",
    position: "fixed",
    top: "25%",
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

const Registration = (props) => {
  const classes = useStyles();

  let history = useHistory();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    } else if (values.email.length > 25) {
      errors.email = "Max 25 characters";
    }
    if (values.password.length < 4) {
      errors.password = "Minimum 4 characters";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      handleSignUp(values);
    },
  });

  const handleSignUp = (values) => {
    console.log("Clicked signup");
    axios
      .post("http://localhost:9000/signUp/", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log(res);
        // props.setLoggedIn(true);
        history.push("/profile");
      })
      .catch((err) => {
        console.log("Errors: ", err.response.data);
        let errors_response = err.response.data.errors;
        let new_errors = { email: "", password: "" };
        if (Array.isArray(errors_response)) {
          errors_response.forEach((error) => {
            new_errors[error.param] = error.msg;
          });
        }
        setErrors(new_errors);
      });
  };

  return (
    <>
      <Grid container spacing={1} direction="column" className={classes.root}>
        <Typography className={classes.formTitle}>Create an account</Typography>
        <Grid item xs={12}>
          <TextField
            label="Username"
            id="email"
            onChange={formik.handleChange}
            name="email"
            variant="outlined"
            style={{ width: "100%" }}
            error={errors.email || formik.errors.email}
            helperText={
              errors.email != ""
                ? errors.email
                : formik.errors.email != ""
                ? formik.errors.email
                : ""
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            variant="outlined"
            style={{ width: "100%" }}
            error={errors.password || formik.errors.password}
            helperText={
              errors.password != ""
                ? errors.password
                : formik.errors.password != ""
                ? formik.errors.password
                : ""
            }
          />
        </Grid>
        <Link to="/">
          <Typography className={classes.signUp}>Login</Typography>
        </Link>
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          size="large"
          color="primary">
          Sign Up
        </Button>
      </Grid>
    </>
  );
};

export default Registration;
