

import { createContext, useContext, useState } from "react";
import axios from "axios";




// set up axios defaults//
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// create the context//
const AuthContext = createContext();

// custom hook to use the AuthContext//
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
  // will add specific error here//
  throw error;
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
