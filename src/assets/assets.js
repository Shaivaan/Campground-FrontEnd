import logo from "./campground-high-resolution-color-logo.png";
import logo_small from "./logo.png"
export  const logo_image = logo;
export const small_logo = logo_small;
export const snackMessagePosition = {
    vertical : "top",
    horizontal :"right"
}


// Api's
const base_url = "https://camp-ground-csyy.onrender.com";
export const login_api = `${base_url}/api/v1/login`;
export const register_api = `${base_url}/api/v1/register`;
export const google_auth = `${base_url}/auth/google`;
export const reset_password_api = `${base_url}/api/v1/resetpassword`;
export const send_opt_api = `${base_url}/api/v1/sendOtp`;
export const check_otp_api = `${base_url}/api/v1/checkOtp`;
export const get_user_api = `${base_url}/api/v1/user`;
export const get_state_api = `${base_url}/api/v1/stateCity/allStates`;
export const get_cities_api = `${base_url}/api/v1/stateCity/city`;
export const update_user_api = `${base_url}/api/v1/user`;