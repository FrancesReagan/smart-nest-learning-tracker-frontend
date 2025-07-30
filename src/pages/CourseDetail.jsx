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

const getSessions = async () => {
  try {
    const response = await axios.get(`/api/courses/${id}/sessions`)
    setSessions(response.data)
  } catch (error) {
    console.error("Error getting sessions:", error)
  }
  }

const addSession = async (e) => {
  e.preventDefault()
  try {
    
    const sessionData = {
      ...newSession,
      topicsLearned: newSession.topicsLearned.split(",").map(topic => topic.trim()).filter(topic => topic)
    }
   await axios.post(`/api/courses/${id}/sessions`, sessionData)

   setNewSession({ notes:"", topicsLearned:"" })
   setShowAddForm(false)
   getSessions()
  } catch (error) {
    console.error("Error adding session:", error)
  }
}

const deleteSession = async (sessionId) => {
  if (window.confirm("Do you want to Delete this session?")) {
    try {
      await axios.delete(`/api/sessions/${sessionId}`)
      getSessions()
    } catch (error) {
    console.error("Error deleting session:", error)
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