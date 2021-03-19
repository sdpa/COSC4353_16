import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: 200,
  },
}));

export const DatePickers = (props) => {
  const classes = useStyles();

  return (
        <div>
            <form className={classes.container} noValidate>
            <TextField
                id="date"
                label="Delivery Date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                shrink: true,
                }}
                onChange={props.handleChange}
            />
            </form>
        </div>
  );
}