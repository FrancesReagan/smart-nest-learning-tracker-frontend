

import { useAuth } from "./AuthContext";

import { createContext, useState, useEffect, useCallback} from "react";
import axios from "axios";





// create the context//
const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();

  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";


// wrapping getCurrentUser in useCalback//
// I used useCallback to memoize functions and prevent unnecessary re-renders. //
// This is important when passing functions to useEffect dependencies.//
const getCurrentUser = useCallback(async () => {
try {
   setLoading(true);
    const response = await axios.get(`${baseURL}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}`},
    });
    setCurrentUser(response.data);
  } catch (error) {
    console.error("Get current user error:", error);
    logout();
    setCurrentUser(null);
  } finally {
    setLoading(false);
  }
  }, [token,logout,baseURL]);

useEffect(() => {
  if (token) {
    getCurrentUser();
  } else {
    setCurrentUser(null);
    setLoading(false);
  }
},[token,getCurrentUser]);

const setUser = (userData) => {
  if (userData) {
    setCurrentUser(userData);
  } else{
    getCurrentUser();
  }
};

const clearUser = () => {
  setCurrentUser(null);
};

const value = {
  currentUser,
  loading,
  setUser,
  clearUser,
  getCurrentUser,
};

return (
  <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
);
};

export default UserContext;

