import { useContext } from "react";
import UserContext from "../context/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser has to be inside a UserProvider wrapper");
  }
  return context;
};