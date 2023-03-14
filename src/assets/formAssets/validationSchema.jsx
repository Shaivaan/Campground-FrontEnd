import * as Yup from "yup";
export const register_validation_schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    )
    .required("Password is required"),
  phone_number: Yup.number()
    .typeError("Phone number must be a number")
    .required("Phone number is required"),
  admin: Yup.string().required(),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
});

export const login_validation_schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const forgot_password_schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export const otp_schema = Yup.object().shape({
  otp: Yup.string()
  .matches(/^\d{6}$/, 'OTP must be 6 digits')
  .required('OTP is required'),
});


export const password_schema = Yup.object().shape({
  password: Yup.string()
  .min(8, "Password must be at least 8 characters long")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
    "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
  )
  .required("Password is required"),
});