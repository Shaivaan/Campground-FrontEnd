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


export const user_validation_schema = Yup.object().shape({
  phone_number: Yup.number()
    .typeError("Phone number must be a number")
    .required("Phone number is required"),
  admin: Yup.string().required(),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  pincode: Yup.string().notRequired()
  .test("pincode", "Pincode should be of 6 digits", function(value) {
    return !value || (value && value.length === 6);
  }),  
},);

export const add_campground_validation_schema = Yup.object().shape({
  name: Yup.string().required("Campground Name is required"),
  description: Yup.string().required("Campground description is required"),
  price: Yup.number()
  .required("Price is required")
  .min(1000, "Price must be at least 1000")
  .max(15000, "Price must be at most 15000"),
  city: Yup.string().required("Campground city is required"),
  address: Yup.string().required("Campground address is required"),
  state: Yup.string().required("Campground state is required"),
  pincode:  Yup.string().required("Pincode is required")
  .test("pincode", "Pincode should be of 6 digits", function(value) {
    return !value || (value && value.length === 6);
  }),
  
  // highlight: [],
  // coordinates: [
  //     19.976527363752915,
  //     73.24924504337929
  // ], // latitude then longitude order is importent
  image1: Yup.mixed()
  .notOneOf([null], "Image 1 is required")
  .test("is-correct-file", "Uploaded file is not valid. Only JPEG, PNG files are allowed.", checkIfFilesAreCorrectType),
  image2:Yup.mixed()
  .notOneOf([null], "Image 2 is required")
  .test("is-correct-file", "Uploaded file is not valid. Only JPEG, PNG files are allowed.", checkIfFilesAreCorrectType),
  image3:Yup.mixed()
  .notOneOf([null], "Image 3 is required")
  .test("is-correct-file", "Uploaded file is not valid. Only JPEG, PNG files are allowed.", checkIfFilesAreCorrectType),
  image4:Yup.mixed()
  .notOneOf([null], "Image 4 is required")
  .test("is-correct-file", "Uploaded file is not valid. Only JPEG, PNG files are allowed.", checkIfFilesAreCorrectType)
},)



function checkIfFilesAreCorrectType(files){
  let valid = true
  if (files) {
    if (!['image/jpeg', 'image/png'].includes(files.type)) {
      valid = false
    }
  }
  return valid;
}