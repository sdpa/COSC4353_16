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
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
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
              fullWidth
            >
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
            <Button type="submit" color="primary" disabled={isSubmitting}>
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
    email,
    addressTwo,
    state,
    zipcode,
    city,
  }) => {
    return {
      name: name || "",
      addressOne: addressOne || "",
      addressTwo: addressTwo || "",
      email: email || "",
      state: state || "",
      city: city || "",
      zipcode: zipcode || "",
    };
  },

  validationSchema: yup.object().shape(validationsForm),

  handleSubmit: async (values, { setSubmitting }) => {
      // submit to the server
      debugger;

      alert(JSON.stringify(values, null, 2));
      localStorage.setItem("address", values.addressOne);
      await axios({
        method: "post",
        url: "http://localhost:3000/client",
        data: {
          values,
        },
      });
    setSubmitting(false);

  },
})(form);

export default withStyles(styles)(Form);
