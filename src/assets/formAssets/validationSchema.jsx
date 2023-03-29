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
  aadhar: Yup.string()
  .when('admin', {
    is: 'admin',
    then: Yup.string()
      .required('Aadhaar number is required')
      .matches(/^[0-9]{12}$/, 'Aadhaar number must be a 12-digit number'),
    otherwise: Yup.string()
  }),
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
  image1: Yup.string()
    .required("Image link is required")
    .url("Please enter a valid URL"),
  image2:Yup.string()
    .required("Image link is required")
    .url("Please enter a valid URL"),
  image3:Yup.string()
    .required("Image link is required")
    .url("Please enter a valid URL"),
  image4:Yup.string()
    .required("Image link is required")
    .url("Please enter a valid URL")
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


export const person_campground_book_validation = Yup.object().shape({
  name:Yup.string().required().label("Name"),
  phoneNumber: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  age: Yup.number()
    .required('Age is required')
    .min(15, 'Age must be at least 15 years old'),
  govId: Yup.string()
    .required('Government ID is required')
    .matches(/^\d{12}$/, 'Government ID must be exactly 12 digits'),  
});


export const fakepaymentSchema = Yup.object().shape({
  owner: Yup.string().required("Owner name is required"),
  cardNumber: Yup.string()
    .matches(/^\d{4}-\d{4}-\d{4}-\d{4}$/, "Card number must be in the format of 'xxxx-xxxx-xxxx-xxxx'")
    .required("Card number is required"),
  cvv: Yup.string()
    .matches(/^\d{3}$/, "CVV must be a 3-digit number")
    .required("CVV is required"),
    expiry: Yup
    .string()
    .required('Expiry month is required')
});