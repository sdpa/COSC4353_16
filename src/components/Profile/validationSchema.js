import * as yup from "yup";

const validationsForm = {
  name: yup.string().required("Required").max(50),
  addressOne: yup.string().required("Required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  state: yup.string().required("Select your state"),
  city: yup
    .string()
    .required("Enter your city"),
  zipcode: yup
    .string()
    .min(5)
    .max(9)
    .required("Enter your zipcode"),
};

export default validationsForm;
