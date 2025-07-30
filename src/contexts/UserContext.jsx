import { createContext, useContext, useState, useEffect } from "react";
import axios from axios;
import { useAuth } from "./AuthContext";
import { set } from "mongoose";

// create the context//
const UserContext = createContext();

// custom hook to use the UserContext//
export const useUser = () => {
  return useContext(UserContext);
};

// UserProvider component -- handles user data only-- may remove this into its own component folder//
export const UserProvider = ({ childeren }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();
}

// check if user is already logged in on app's start//
useEffect(() => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getCurrentUser();
  } else {
    setLoading(false);
  }
},[token]);

// is it getCurrentUser or setCurrentUser?//
const getCurrentUser = async() => {
  try {
    const response = await axios.get("/api/users/me");
    getCurrentUser(response.data);
  } catch (error) {
    console.error("Get current user error:", error);
    // if getting the user fails, logout to clear invalid tokens//
    logout();
    getCurrentUser(null);
  } finally {
    setLoading(false);
  }
  };
