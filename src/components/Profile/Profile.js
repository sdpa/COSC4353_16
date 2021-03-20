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
} from "@material-ui/core";
import validationsForm from "./validationSchema";
import { withFormik } from "formik";
import * as yup from "yup";
import { states } from "./states";
import axios from "axios";
import { getConfig } from "../../authConfig";

const styles = () => ({
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

const form = (props) => {
  const {
    classes,
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.formTitle}>Profile Info</Typography>
            <TextField
              id="name"
              label="Full Name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.name ? errors.name : ""}
              error={touched.name && Boolean(errors.name)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="addressOne"
              label="Address One"
              value={values.addressOne}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.addressOne ? errors.addressOne : ""}
              error={touched.addressOne && Boolean(errors.addressOne)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="addressTwo"
              label="Address Two"
              value={values.addressTwo}
              onChange={handleChange}
              onBlur={handleBlur}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              select
              id="state"
              label="State"
              value={values.state}
              onChange={handleChange("state")}
              helperText={touched.state ? errors.state : ""}
              error={touched.state && Boolean(errors.state)}
              margin="dense"
              variant="outlined"
              fullWidth>
              {states.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="city"
              label="City"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.city ? errors.city : ""}
              error={touched.city && Boolean(errors.city)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="zipcode"
              label="zip code"
              value={values.zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.zipcode ? errors.zipcode : ""}
              error={touched.zipcode && Boolean(errors.zipcode)}
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </CardContent>
          <CardActions className={classes.actions}>
            <Button type="submit" color="primary">
              SUBMIT
            </Button>
            <Button color="secondary" onClick={handleReset}>
              CLEAR
            </Button>
          </CardActions>
        </Card>
      </form>
    </div>
  );
};

const Form = withFormik({
  mapPropsToValues: ({
    name,
    addressOne,
    addressTwo,
    state,
    zipcode,
    city,
  }) => {
    return {
      name: name || "",
      addressOne: addressOne || "",
      addressTwo: addressTwo || "",
      state: state || "",
      city: city || "",
      zipcode: zipcode || "",
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: (values) => {
    console.log(values);
    console.log("submitting");
    axios
      .post("http://localhost:9000/profile", getConfig(), {
        full_name: values.name,
        address_one: values.addressOne,
        address_two: values.addressTwo,
        city: values.cty,
        state: values.state,
        zipcode: values.zipcode,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // setTimeout(() => {
    //   // submit to the server
    //   alert(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    //   localStorage.setItem("address", values.addressOne);
    //   window.location.replace("http://localhost:3000/");
    // }, 1000);
  },
})(form);

export default withStyles(styles)(Form);
