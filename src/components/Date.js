import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
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
            />
            </form>
        </div>
  );
}