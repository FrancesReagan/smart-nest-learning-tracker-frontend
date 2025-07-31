
// need to figure out either setCurrentUser or getCurrent User---//
import { createContext, useState, useEffect, useContext, useCallback} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";



// create the context//
const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, logout } = useAuth();


// wrapping getCurrentUser in useCalback//
const getCurrentUser = useCallback(async () => {
try {
    const response = await axios.get("/api/users/me");
    setCurrentUser(response.data);
  } catch (error) {
    console.error("Get current user error:", error);
    logout();
    setCurrentUser(null);
  } finally {
    setLoading(false);
  }
  }, [logout]);

  

useEffect(() => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    getCurrentUser();
  } else {
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

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser has to be inside a UserProvider wrapper");
  }
  return context;
};


