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
export const admin_all_camp_api = `${base_url}/api/v1/camps/admin-campground`;
export const update_campground_api = `${base_url}/api/v1/camps/campground`;
export const delete_campground_api = `${base_url}/api/v1/camps/campground`;
export const explore_campgrounds_api = `${base_url}/api/v1/utils/filters`;
export const send_booking_details_api = `${base_url}/api/v1/buySlots/addItem`;
export const fake_payment_api = `${base_url}/api/v1/paid/successfully`;
export const add_remove_wishlist_api = (campId)=> `${base_url}/api/v1/wishlist/${campId}`;
export const get_all_wishlist_api = `${base_url}/api/v1/wishlist`;
export const get_all_bokked_trips = `${base_url}/api/v1/paid/upcomingTrips`;
export const send_rating_api = (campId) => `${base_url}/api/v1/utils/rating/${campId}`;
export const can_add_rtaing_api = (campId) => `${base_url}/api/v1/utils/showRating/${campId}`;
export const map_api_key = "AIzaSyB2sic-kLLni4IQPUKQS4iimj0kK6XG3GE";
export const clientId = '532654142650-6ji64gcc9o6ubmgnv0ks66tvee0fp69r.apps.googleusercontent.com';
