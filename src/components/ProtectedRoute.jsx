import { Navigate } from "react-router-dom";
import { useUser } from '@/hooks/useUser.js';






const ProtectedRoute = ({ children }) => {
  const { currentUser } = useUser();


  if (!currentUser) {
    // redirect to login if authenticated//
    return <Navigate to="/login" replace />
  }

  return children;
  
};

export default ProtectedRoute;