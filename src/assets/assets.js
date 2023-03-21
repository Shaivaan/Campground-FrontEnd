import logo_small from "./logo.png"
export const logo = logo_small;
export const snackMessagePosition = {
    vertical : "top",
    horizontal :"right"
}


// Api's
const base_url = "https://camp-ground-csyy.onrender.com";
// const base_url = "http://localhost:3000"
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
export const get_pincode_lat_lon_api = (pincode) => `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${pincode}`;
export const add_campground_api = `${base_url}/api/v1/camps/newCampGround`;