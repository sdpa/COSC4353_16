import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardActions,
  TextField,
  MenuItem,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";
import validationsForm from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";
import { states } from "./states";
import axios from "axios";
import { getConfig } from "../../authConfig";
import { LocalTaxiSharp } from "@material-ui/icons";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 420,
    marginTop: 50,
  },
  container: {
    display: "Flex",
    justifyContent: "center",
  },
  actions: {
    float: "right",
  },
  formTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

const ProfileForm = (props) => {
  const classes = useStyles();

  let history = useHistory();

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.addressOne) {
      errors.addressOne = "Required";
    }
    if (!values.state) {
      errors.state = "Required";
    }
    if (!values.city) {
      errors.city = "Required";
    }
    if (!values.zipcode) {
      errors.zipcode = "Required";
    }
    return errors;
  };
  const profileForm = useFormik({
    initialValues: {
      name: "",
      addressOne: "",
      addressTwo: "",
      state: "",
      city: "",
      zipcode: "",
    },
    validate,
    onSubmit: (values) => {
      axios
        .post(
          "http://localhost:9000/profile",
          {
            user_id: localStorage.getItem("user_id"),
            full_name: values.name,
            address_one: values.addressOne,
            address_two: values.addressTwo,
            city: values.city,
            state: values.state,
            zip_code: values.zipcode,
          },
          getConfig()
        )
        .then((res) => {
          console.log(res);
          props.setLoggedIn(true);
          history.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <div className={classes.container}>
      <form>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.formTitle}>Profile Info</Typography>
            <TextField
              id="name"
              label="Full Name"
              name="name"
              value={profileForm.values.name}
              onChange={profileForm.handleChange}
              helperText={profileForm.errors.name}
              error={profileForm.errors.name ? true : false}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="addressOne"
              label="Address One"
              name="addressOne"
              value={profileForm.values.addressOne}
              onChange={profileForm.handleChange}
              helperText={profileForm.errors.addressOne}
              error={profileForm.errors.addressOne ? true : false}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="addressTwo"
              label="Address Two"
              name="addressTwo"
              value={profileForm.values.addressTwo}
              onChange={profileForm.handleChange}
              helperText={profileForm.errors.addressTwo}
              error={profileForm.errors.addressTwo ? true : false}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              select
              id="state"
              label="State"
              name="state"
              value={profileForm.values.state}
              onChange={profileForm.handleChange}
              helperText={profileForm.errors.state}
              error={profileForm.errors.state ? true : false}
              margin="dense"
              variant="outlined"
              fullWidth>
              {states.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="city"
              label="City"
              name="city"
              value={profileForm.values.city}
              onChange={profileForm.handleChange}
              helperText={profileForm.errors.city}
              error={profileForm.errors.city ? true : false}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="zipcode"
              label="zip code"
              name="zipcode"
              value={profileForm.values.zipcode}
              onChange={profileForm.handleChange}
              helperText={profileForm.errors.zipcode}
              error={profileForm.errors.zipcode ? true : false}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              type="submit"
              color="primary"
              onClick={profileForm.handleSubmit}>
              SUBMIT
            </Button>
            <Button color="secondary" onClick={profileForm.handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

export default ProfileForm;
