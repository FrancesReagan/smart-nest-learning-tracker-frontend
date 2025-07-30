import{ useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import CourseCard from "../components/CourseCard";
import { set } from "mongoose";


function Dashboard() {
  const [courses, setCourse] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCourse,setEditingCourse] = useState(null); 
  const [error,setError] = useState("");
  const [success,setSuccess] = useState("");
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "Other",
    url: "",
    status:"On the horizon"
})

const { currentUser } = useUser()
const { token } = useAuth()

useEffect(() => {
  if (currentUser && token) {
  getCourses()
}
},[currentUser,token])

const getCourses = async () => {

  try {
    const response =await axios.get("/api/courses", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  setCourse(response.data)
  } catch (error) {
    console.error("Error retrieving your courses:", error)
  } if (error.response?.status===401){
    setError("Session expired. Login again...")
  } else if (error.response?.status===500){
    setError("Server Error. Try again...")
  } else {
    setError("Failed to load your courses...Refresh the page.")

   }
  }
 }

 const addCourses = async (e) => {
  e.preventDefault()
  setError("")
  setSuccess("")
  
  try {
    await axios.post("/api/courses", courseForm,{
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setCourseForm({ title:"", description:"", category:"Other", url:"", status: "On the horizon"})
    setShowAddForm(false)
    setSuccess("Course added successfully.")
    getCourses()

    // clear success message after 3 seconds//
    setTimeout(()=>setSuccess(""), 3000)
  } catch (error) {
    console.error("Error happened adding your course:", error)
    if (error.response?.status===400) {
      setError("Please check your course information and try again.")
    } else if (error.response?.status===401) {
      setError("Session expired. Log in again...")
    } else {
      setError("Failed to add your course...please try again.")
    }
  }
 }

 const updateCourse = async (e) => {
  e.preventDefault ()
  setError("")
  setSuccess ("")

  try {
    await axios.put(`/api/courses/${editingCourse,._id}`,courseForm, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setCourseForm({ })
  } catch (error) {
    
  }
 }














// DASHBOARD for logged in Users
// Dashboard.jsx This is where users will:
// •	See all their courses in a grid
// •	Add new courses
// •	Navigate to course details
// This Dashboard:
// •	Has earth background (inside the app)
// •	Shows all user's courses in a grid using CourseCard
// •	Simple form to add new courses (all backend fields)
// •	Edit existing courses (reuses same form)
// •	Delete courses (handled by CourseCard)
// Uses all course API endpoints:
// •	GET /api/courses
// •	POST /api/courses
// •	PUT /api/courses/:id
// •	DELETE /api/courses/:id
