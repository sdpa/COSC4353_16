import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { DatePickers } from "./Date";
import { SubmitButton } from "./SubmitButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
}));

export const Form = (props) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          required
          id="outlined-required"
          label="Gallons Requested"
          type="number"
          defaultValue=" "
          variant="outlined"
          onChange={props.handleChange1}
          error={props.errors.gallons != ""}
          helperText={props.errors.gallons}
        />
        <TextField
          id="outlined-read-only-input-address"
          label="Address"
          defaultValue=""
          value={props.address}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <TextField
          id="outlined-read-only-input-suggested-price"
          label="Suggested Price"
          defaultValue=" "
          value={`$${props.suggestedPrice}`}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <DatePickers handleChange={props.handleChange2} errors={props.errors} />
        <br />
        <br />
        <TextField
          id="outlined-read-only-input-amount-due"
          label="Amount Due"
          defaultValue=" "
          value={`$${props.amountDue}`}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
        <SubmitButton handleSubmit={props.handleSubmit} />
      </div>
    </form>
  );
};
