import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: 200,
  },
}));

export const DatePickers = (props) => {
  const classes = useStyles();
  console.log("props", props);

  let date = new Date();
  var d = date.getDate();
  var m = date.getMonth() + 1;
  var y = date.getFullYear();

  var dateString =
    y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  console.log(dateString);
  // console.log(date_formatted);

  return (
    <div>
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label="Delivery Date"
          type="date"
          required
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
          error={props.errors.date != ""}
          helperText={props.errors.date}
          inputProps={{
            min: dateString,
          }}
          onChange={props.handleChange}
        />
      </form>
    </div>
  );
};
