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
import { set } from "mongoose";


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
  
  const getCurrentUser = async() => {

    try {
      const response = await axios.get("/api/users/me")
      setUser(response.data);
    } catch (error) {
      // token may be expired//
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  const login = async (email, password) => {
    const response = await axios.post("/api/users/login", { email, password })
    const { token, user: userData } = response.data

    localStorage.setItem("token", token)
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setUser(userData)

    return userData
  }

  


}

