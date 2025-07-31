import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser needs to be used inside a UserProvider wrapper");
  }
  return context;
};