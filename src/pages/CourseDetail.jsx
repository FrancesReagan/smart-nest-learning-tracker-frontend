import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { use } from "react";

function CourseDetail() {
  const {id} = useParams();
  const [couse, setCouse] = useState(null)
  const [sessions, setSessions] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newSession, setNewSession] = useState({
    notes:"",
    topicsLearned:""
  })

useEffect(() => {
  getCourses()
  getSessions()
},[id])

const getGourse = async () => {
  try {
    const response = await axios.get(`/api/courses/${id}`)
    setCourse(response.data)
  } catch (error) {
    console.error("Error retrieving course for you:", error)
  }
}



}







// This CourseDetail page:
// •	Shows course info at the top
// •	Has earth background (designer-4.jpg) with transparency
// •	Simple "Add Session" button that shows/hides form
// •	Form to add notes and topics (converts comma-separated topics to array)
// •	Lists all sessions with dates and delete buttons
// •	Shows topics as little blue badges
// Uses exact API endpoints:
// •	GET /api/courses/:id
// •	GET /api/courses/:courseId/sessions
// •	POST /api/courses/:courseId/sessions
// •	DELETE /api/sessions/:id