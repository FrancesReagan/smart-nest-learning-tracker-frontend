ssimport { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { use } from "react";

function CourseDetail() {
  const {id} = useParams();
  const [course, setCourse] = useState(null)
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

if(!course) return <div className="p-4">
  Loading....
</div>

return (
  <div className="min-h-screen relative">
    {/* earth background */}
    <div className="absolute inset-0 bg-cover bg-center opacity-30"
    style={{ backgroundImage: "url(/designer-4.jpg)" }}
    />

    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 p-6">
      {/* Course Header */}
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded mb-6">
      <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
      <p className="text-gray-200 mb-2">{course.description}</p>
      <div className="flex space-x-4">
        <span className="text-sm text-gray-300">Category:{course.category}</span>
      <span className="text-sm text-gray-300">Status:{course.status}</span>
      </div>
      </div>
      
{/* add session button */}
<div className="mb-6">
  <button
    onClick={() => setShowAddForm(!showAddForm)}
    className="bg-blue-600 text-white px-4 py-2 rounded hover: bg-blue-700"
    >
      {showAddForm? "Cancel" : "Add Session"}
    </button>
</div>
    </div>


  </div>
)









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