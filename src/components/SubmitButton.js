import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export const SubmitButton = (props) => {
  const classes = useStyles();

  return (
    <div>
        <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={props.handleSubmit}>
            Submit
        </Button>
    </div>
  );
}