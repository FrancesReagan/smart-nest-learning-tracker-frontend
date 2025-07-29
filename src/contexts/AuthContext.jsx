// context/authcontext//
import { set } from "mongoose";
import { createContext, useContext, useState } from "react";

// create the context//
const AuthContext = createContext();

// custom hook to use the AuthContext//
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// AuthProvider component//
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (credientals) => {
    // login logic //
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };


  
}

export default AuthContext;
