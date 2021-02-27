import React from "react";
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

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="outlined-required"
            label="Gallons Requested"
            type="number"
            defaultValue=" "
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input-address"
            label="Address"
            defaultValue=" "
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          <TextField
            id="outlined-read-only-input-suggested-price"
            label="Suggested Price"
            defaultValue=" "
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          <DatePickers />
          <br />
          <br />
          <TextField
            id="outlined-read-only-input-amount-due"
            label="Amount Due"
            defaultValue=" "
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
