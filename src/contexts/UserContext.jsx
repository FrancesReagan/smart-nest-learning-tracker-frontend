
// need to figure out either setCurrentUser or getCurrent User---//
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";



// create the context//
const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();


// check if user is already logged in on app's start----if I add getCurrentUser in dependencies---need to use useCallback and wrap it//
useEffect(() => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getCurrentUser();
  } else {
    setLoading(false);
  }
},[token]);


const getCurrentUser = async() => {
  try {
    const response = await axios.get("/api/users/me");
    setCurrentUser(response.data);
  } catch (error) {
    console.error("Get current user error:", error);
    // if getting the user fails, logout to clear invalid tokens//
    logout();
    setCurrentUser(null);
  } finally {
    setLoading(false);
  }
  };

  // update user after login/register//
  const setUser = (userData) => {
    if (userData) {
      setCurrentUser(userData);
    } else {
      getCurrentUser();
    }
    };
   

  // clear user on logout//
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
     { children }
    </UserContext.Provider>  

  );
};

// issues here---forgot to define//
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser has to be inside a UserProvider wrapper");
  }
  return context;
};