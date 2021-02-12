import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
}));

const LogIn = () => {
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

export default LogIn;
