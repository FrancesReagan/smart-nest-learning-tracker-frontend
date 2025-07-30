
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import "./App.css"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";



function AppRoutes() {
  const { user } = useAuth();
 
  return (    
     <Router>
        <div className="App">
         { user && <NavBar/>}

         <Routes>
          <Route path= "/" element={user? <Navigate to="/dashboard" /> : <LandingPage />}/>
          <Route path="login" element={user? <Navigate to="/dashboard" /> : <LoginPage /> } />
          <Route path="/register" element={user? <Navigate to="/dashboard" /> : <RegisterPage />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
             <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/courses/:id" element={
            <ProtectedRoute>
              <CourseDetail />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" />}/>
         </Routes>
        </div>
     </Router>
  
  );
}

// main app component//
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
} 

export default App;

