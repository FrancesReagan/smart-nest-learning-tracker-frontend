import axios from "axios";

export const backendClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});


// added to simple backendClient code---as I have big plans for SmartNest--//
// add request interceptor to include auth token//
// request interceptor--like a security gard that runs before every request is sent to the server-//
backendClient.interceptors.request.use(
  // this function will run on every successful request attempt//
  (config) => {
    // get user log in token from localStorage//
    const token = localStorage.getItem("token");
    // if a token was found (meaning user was logged in)
    if (token) {
      // add the token to the request headers//
      config.headers.Authorization = `Bearer ${token}`;
    }
    // return the configuration so the request can continue---proceed with your request//
    return config;
  },
  // this function will run if there is an error  before sending the request.//
  (error) => {
    // pass the error along ---as can not do much about pre-request errors.
    return Promise.reject(error);
  }
);

// add response interceptor for error handling//
// this runs after getting a response from the server---security guard checking all going out//
backendClient.interceptors.response.use(
  // this function funs when get a successful response(status 200,201,etc)
  (response) => response,
  // this function runs when get an error response(400,401,500, etc.)
  (error) => {
    // check if the error status is 401---log in token is invalid or expired//
    if (error.response?.status === 401) {
      // if token is bad--ned to log the user out//
      // token expired or invalid//
      // remove the bad token//
      localStorage.removeItem("token");
      // then redirect the user back to the login page//
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);