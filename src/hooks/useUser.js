import { useContext } from "react";
import UserContext from "../contexts/UserContext.jsx";


export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser has to be inside a UserProvider wrapper");
  }
  return context;
};