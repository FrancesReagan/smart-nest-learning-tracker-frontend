import { createContext, useContext, useState, useEffect } from "react";
import axios from axios;
import { useAuth } from "./AuthContext";

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