import React, { useState } from "react";
import "./Navbar";
import "./Date";
import "./SubmitButton";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonAppBar from "./Navbar";
import DatePickers from "./Date";
import SubmitButton from "./SubmitButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
}));

const Registration = () => {
  const classes = useStyles();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <TextField
        label="Username"
        id="username"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <TextField
        label="Password"
        id="password"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
    </div>
  );
};

export default Registration;
