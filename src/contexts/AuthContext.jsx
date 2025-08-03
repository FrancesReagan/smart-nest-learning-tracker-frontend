// check issues here --fix try catch for specific error--more specific errors//

import { createContext, useContext, useState } from "react";
import axios from "axios";





// set up axios defaults//
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// create the context//
const AuthContext = createContext();

// custom hook to use the AuthContext//
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
 const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// AuthProvider component(handles authentication only)
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authLoading, setAuthLoading] = useState(false);


  // login logic//
const login = async (credentials) => {
 try {
  setAuthLoading(true);
  const response = await axios.post(`${baseURL}/api/users/login`, credentials);

  if(!response.data) {
    throw new Error("Login Failed");
  }
  const { token, user: userData } = response.data;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  setToken(token);

  return { token, user: userData };

 } catch (error) {
 //clear any existing auth data on error//
 localStorage.removeItem("token");
 delete axios.defaults.headers.common["Authorization"];
 setToken(null);

//  specific messages for different types of errors//
if (error.response?.status===400 || error.response?.status===401) {
  throw new Error("Invalid email or password");
 } else if (error.response?.status===500){
  throw new Error("Server error. Try again...");
 } else if (!error.response) {
  throw new Error("Problem with your connection....Network Error.");
 } else {
  throw new Error(error.response?.data?.message || "Login failed. Try again.");
 }
 } finally {
  setAuthLoading(false);
 }
};


// register logic//
const register = async (userData) => {
  try {
     setAuthLoading(true); 
     const response = await axios.post(`${baseURL}/api/users/register`, userData);  

  if(!response.data) {
    throw new Error("Registration failed");
  }

  const { token, user: newUser } = response.data;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  setToken (token);

  return { token, user: newUser };

 } catch (error) {
 // clear any existing auth data on error//
 localStorage.removeItem("token");
 delete axios.defaults.headers.common["Authorization"];
 setToken (null);

// specific error messages//
if (error.response?.status === 400) {
  if (error.response.data?.message?.includes("email")) {
    throw new Error("This email already exists. Use a different email.");
   } else if (error.response.data?.message?.includes("username")){
    throw new Error("Username is already taken. Choose a different username");
   } else {
    throw new Error("Invalid registration data. Check that your information is correct.");
   }
   } else if (error.response?.status===500){
    throw new Error("Server error. Please try again...");
   } else if (!error.response){
    throw new Error("Problem with your connection....Network Error.");
   } else {
    throw new Error(error.response?.data?.message || "Registration failed. Please try again.");
   }
 } finally {
  setAuthLoading(false);
 }
};


  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
  };

 const value = {
  token,
  authLoading,
  login,
  register,
  logout,
 };

 return (
  <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
 );

};

export default AuthContext;
