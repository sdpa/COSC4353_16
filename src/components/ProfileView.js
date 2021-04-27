import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  List,
  ListItem,
  Divider,
  ListItemIcon,
  Typography,
  Grid,
  Chip,
  ListItemText,
  LinearProgress,
  Dialog,
  Paper,
  Modal,
  TextField,
  CardContent,
  Card,
  MenuItem,
  makeStyles,
  CardActions,
} from "@material-ui/core";
import { states } from "./Profile/states";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import { getConfig } from "../authConfig";
import { useFormik } from "formik";

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

const ProfileView = () => {
  const [quotes, setQuotes] = useState([]);

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [fullAddress, setFullAddress] = useState("");

  const [editFields, setEditFields] = useState(false);

  const getProfile = () => {
    axios
      .get("http://localhost:9000/profile", getConfig())
      .then((res) => {
        console.log(res);
        let full_address = "";
        if (res.data.address_two) {
          full_address = `${res.data.address_one}, ${res.data.address_two}, ${res.data.city}, ${res.data.state}, ${res.data.zip_code}`;
        } else {
          full_address = `${res.data.address_one}, ${res.data.city}, ${res.data.state}, ${res.data.zip_code}`;
        }
        setFullAddress(full_address);
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

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

  const updateForm = useFormik({
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
        .put(
          "http://localhost:9000/profile/",
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
          //   setProfile(res.data);
          setEditFields(false);
          getProfile();
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  useEffect(() => {
    updateForm.values.name = profile.full_name;
    updateForm.values.addressOne = profile.address_one;
    updateForm.values.addressTwo = profile.address_two;
    updateForm.values.city = profile.city;
    updateForm.values.state = profile.state;
    updateForm.values.zipcode = profile.zip_code;
  }, [profile]);

  const classes = useStyles();

  return (
    <>
      {loading ? null : (
        <>
          <div className={classes.container}>
            {editFields ? (
              <form>
                <Card className={classes.card}>
                  <CardContent>
                    <Typography className={classes.formTitle}>
                      Profile Info
                    </Typography>
                    <TextField
                      id="name"
                      label="Full Name"
                      name="name"
                      value={updateForm.values.name}
                      onChange={updateForm.handleChange}
                      helperText={updateForm.errors.name}
                      error={updateForm.errors.name ? true : false}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      id="addressOne"
                      label="Address One"
                      name="addressOne"
                      value={updateForm.values.addressOne}
                      onChange={updateForm.handleChange}
                      helperText={updateForm.errors.addressOne}
                      error={updateForm.errors.addressOne ? true : false}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      id="addressTwo"
                      label="Address Two"
                      name="addressTwo"
                      value={updateForm.values.addressTwo}
                      onChange={updateForm.handleChange}
                      helperText={updateForm.errors.addressTwo}
                      error={updateForm.errors.addressTwo ? true : false}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      select
                      id="state"
                      label="State"
                      name="state"
                      value={updateForm.values.state}
                      onChange={updateForm.handleChange}
                      helperText={updateForm.errors.state}
                      error={updateForm.errors.state ? true : false}
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
                      value={updateForm.values.city}
                      onChange={updateForm.handleChange}
                      helperText={updateForm.errors.city}
                      error={updateForm.errors.city ? true : false}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      id="zipcode"
                      label="zip code"
                      name="zipcode"
                      value={updateForm.values.zipcode}
                      onChange={updateForm.handleChange}
                      helperText={updateForm.errors.zipcode}
                      error={updateForm.errors.zipcode ? true : false}
                      margin="dense"
                      variant="outlined"
                      fullWidth
                    />
                  </CardContent>
                  <CardActions className={classes.actions}>
                    <Button
                      type="submit"
                      color="primary"
                      onClick={updateForm.handleSubmit}>
                      SUBMIT
                    </Button>
                    <Button
                      color="secondary"
                      onClick={() => {
                        updateForm.handleReset();
                        setEditFields(false);
                      }}>
                      CANCEL
                    </Button>
                  </CardActions>
                </Card>
              </form>
            ) : (
              <Card className={classes.card}>
                <CardContent>
                  <Typography className={classes.formTitle}>
                    Profile Info
                  </Typography>
                  <Typography>Name: {profile.full_name}</Typography>
                  <Typography>
                    Address:
                    {fullAddress}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    color="primary"
                    onClick={() => {
                      setEditFields(true);
                    }}>
                    EDIT PROFILE
                  </Button>
                </CardActions>
              </Card>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ProfileView;
