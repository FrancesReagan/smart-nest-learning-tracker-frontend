import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";
import "./App.css"
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import CourseDetail from "./pages/CourseDetail";


function App() {
  const [user, setUser] = useState(null);

  // backend connection//
  axios.defaults.baseURL="http://localhost:3000";

  // check if user is already logged in//
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}` getCurrentUser();
    }
  },[])
  
}

