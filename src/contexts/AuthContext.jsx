// context/authcontext//
//  User state management (user, setUser)
// Authentication logic (login, register, logout)
// Token management (localStorage, axios headers)
// Auto-login on app start (getCurrentUser)
// Navigation after logout

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


// set up axios defaults//
axios.defaults.baseURL = "http://localhost:3000";

// create the context//
const AuthContext = createContext();

// custom hook to use the AuthContext//
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component//
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

// check if user is already logged in on app's start//
useEffect(() => {
  const storedToken = localStorage.getItem("token");
  if (storedToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    getCurrentUser();
  }
},[]);

const getCurrentUser = async () => {
  try {
    const response = await axios.get("/api/users/me");
    setUser(response.data);
  } catch (error) {
    console.error(error);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
  }
};


  

  // login logic//
const login = async (credentials) => {
  
    const response = await axios.post("/api/users/login", credentials );

    if(!response.data) {
      throw new Error("Login Failed");
    }

    const { token, user: userData } = response.data;
    localStorage.setItem("token", token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setToken(token);
    setUser(userData);
    return userData;
  };

// register logic//
const register = async (userData) => {
  const response = await axios.post("/api/users/register", userData );  

  if(!response.data) {
    throw new Error("Registration failed");
  }

  const { token, user: newUser } = response.data;
  localStorage.setItem("token", token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  setToken (token);
  setUser(newUser);
  return newUser;
};

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setToken(null);
    setUser(null);
  };

 const value = {
  user,
  token,
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
