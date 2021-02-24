import React, { useState } from "react";
import "./Form";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FormPropsTextFields from "./Form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import Login from "./LogIn";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogin = () => {};

  const handleLogOut = (props) => {
    props.setLoggedIn(false);
  };

  return (
    <>
      {!props.loggedIn ? null : (
        <div className={classes.root}>
          <AppBar position="static">
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example">
                  <Tab label="Fuel Quote Form" {...a11yProps(0)} />
                  <Tab label="Fuel Quote History" {...a11yProps(1)} />
                </Tabs>
              </Grid>
              <Grid item style={{ marginRight: "10px" }}>
                <Button variant="contained" onClick={handleLogOut}>
                  Log out
                </Button>
              </Grid>
            </Grid>
          </AppBar>
          <TabPanel value={value} index={0}>
            <h3>Fuel Quote Form</h3>
            <FormPropsTextFields />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <h3>Fuel Quote History</h3>
          </TabPanel>
        </div>
      )}
    </>
  );
}
