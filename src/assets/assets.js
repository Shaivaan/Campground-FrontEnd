import logo from "./campground-high-resolution-color-logo.png";
import logo_small from "./logo.png"
export  const logo_image = logo;
export const small_logo = logo_small;
export const snackMessagePosition = {
    vertical : "top",
    horizontal :"right"
}


// Api's
const base_url = "http://localhost:3000";
export const login_api = `${base_url}/api/v1/login`;
export const register_api = `${base_url}/api/v1/register`;
export const google_auth = `${base_url}/auth/google`;