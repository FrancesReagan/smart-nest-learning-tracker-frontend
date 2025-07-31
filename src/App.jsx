

// fix loading and useUser call//
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import "./App.css"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";

// may or may not use this spinner while loading//
function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
}

function AppRoutes() {
 const { currentUser, loading } =useUser();
 
  return (    
     <Router>
        <div className="App">
         { currentUser && <NavBar/>}

         <Routes>
          <Route path= "/" element={currentUser? <Navigate to="/dashboard" /> : <LandingPage />}/>
          <Route path="login" element={currentUser? <Navigate to="/dashboard" /> : <LoginPage /> } />
          <Route path="/register" element={currentUser? <Navigate to="/dashboard" /> : <RegisterPage />} />
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
      <UserProvider>
          <AppRoutes />
      </UserProvider>
    </AuthProvider>
  );
} 

export default App;

