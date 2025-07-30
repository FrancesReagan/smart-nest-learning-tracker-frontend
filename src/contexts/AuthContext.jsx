// check issues here --fix try catch for specific error--more specific errors//

import { createContext, useContext, useState } from "react";
import axios from "axios";
import { set } from "mongoose";




// set up axios defaults//
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// create the context//
const AuthContext = createContext();

// custom hook to use the AuthContext//
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component(handles authentication only)
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authLoading, setAuthLoading] = useState(false);


  // login logic//
const login = async (credentials) => {
 try {
  setAuthLoading(true);
  const response = await axios.post("/api/users/login", credentials);

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
     const response = await axios.post("/api/users/register", userData );  

  if(!response.data) {
    throw new Error("Registration failed");
  }

  const { token, user: newUser } = response.data;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  setToken (token);

  return { token, user: newUser };
} catch (error) {
  // will add specific error here//
  throw error;
} finally {
  setAuthLoading(!false);
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
