import backgroundImage1 from '../assets/designer-4.jpg';
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '@/hooks/useUser.js';
import { useAuth } from "../contexts/AuthContext";



function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
 const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newSession, setNewSession] = useState({ notes:"", topicsLearned:"" });
  const [editedCourse, setEditedCourse] = useState(null);
  const { currentUser } = useUser();
  const { token } = useAuth();
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

 
  //  GET ALL COURSES---GET//
  // wrap getCourses in a useCallback//
  const getCourses = useCallback(async() => {
    try {
      const response = await axios.get(`${baseURL}/api/courses`,{
        headers: { Authorization: `Bearer ${token}`},
      });
      setCourses(response.data);
      // initialize with current course data//
      console.log("All courses:", response.data);
    } catch (error) {
      console.error("Error in retrieving all courses:", error);
      if (error.response?.status === 404) setError("Your courses could not found.");
       else if (error.response?.status===401) setError("Session expired. You need to log in once more.");
       else if (error.response?.status===403) setError("To view courses you need to have the correct permissions.");
       else setError("Courses failed to load...please try again.");
    }
  },[id,token,baseURL]); 

  // GET COURSE BY ID---GET//
  const getCourse = useCallback(async() => {
    try {
      const response = await axios.get(`${baseURL}/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourse(response.data);
      setEditedCourse({...response.data});
     } catch (error) {
      console.error("Error retrieving course:", error);
      if (error.response?.status === 404) setError("Course not found.");
      else if (error.response?.status === 401) setError("Session expired. Log in again.");
      else if (error.response?.status === 403) setError("To view this course you need to have the correct permissions.");
      else setError("Course failed to load...please try again.");
    }
  }, [id, token, baseURL]);

  

  // Update a course -- PUT//
const updateCourse = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  try {
    const response = await axios.put(`${baseURL}/api/courses/${id}`, editedCourse, {
      headers: {Authorization: `Bearer ${token}`},
    });
   setCourses(response.data);
    setSuccess("Course updated.");
    setShowEditForm(false);
    getCourse();
    setTimeout(() => setSuccess(""), 3000);
  } catch (error) {
     console.error("Error updating course:", error);
      if (error.response?.status === 401) setError("Session expired. Log in again.");
      else if (error.response?.status === 403) setError("Insufficient permissions.");
      else setError("Could not update course. Try again...");
    }
  };


  // Delete Course--DELETE//
const deleteCourse = async () => {
  if(window.confirm("This is a permanent decision--you want to delete this course?")) {
    setError("");
    setSuccess("");
    try {
        const response = await axios.delete(`${baseURL}/api/courses/${id}`, {
        headers: {Authorization:`Bearer ${token}`,},
      });
      setCourses(response.data);
      setSuccess("Course has been deleted.");
      setTimeout(() => navigate("/courses"), 2000);
          } catch (error) {
        console.error("Error deleting course:", error);
        if (error.response?.status === 401) 
          setError("Session expired. Try to log in again...");
         else if (error.response?.status === 403) 
          setError("You do not have permission to delete this course.");
         else if (error.response?.status === 404) 
          setError("Course not found.");
         else setError("Could not delete course. Try again...");
      }
    }
  };

// Add Session--POST//
const addSession = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");

  try {
    const sessionData = {
      ...newSession,
      topicsLearned: newSession.topicsLearned
      .split(",")
      .map((topic) => topic.trim())
      .filter((topic) => topic),
    };

      const response = await axios.post(`${baseURL}/api/courses/${id}/sessions`, sessionData, {
      headers: {Authorization:`Bearer ${token}`},
    });
     setSessions(response.data);
    setNewSession({ notes:"", topicsLearned:""});
    setShowAddForm(false);
    setSuccess("Session added successfully");
    getSessions();
    setTimeout(() => setSuccess(""), 3000);

  } catch (error) {
    console.error("Error adding session:", error);
    if(error.response?.status === 404) 
      setError("Check your session information and try again.");
     else if (error.response?.status===401)
      setError("Session expired. Please log in again.");
    else if (error.response?.status===403)
      setError("You need permission to add sessions to this course.");
     else setError("Failed to load session. Try again...");
  }
};

// GET SESSIONS---GET//
  // wrap getSessions in a useCallback//
  const getSessions = useCallback(async () => {
    try {
      const response = await axios.get(`${baseURL}/api/courses/${id}/sessions`, {
        headers: { Authorization:`Bearer ${token}`},
      });
      setSessions(response.data);
    } catch (error) {
      console.error("Error getting sessions:", error);
      if (error.response?.status === 404) 
        setError("Session has expired. Please log in again.");
       else if (error.response?.status===401) 
        setError("Session expired. You need to log in once more.");
       else if (error.response?.status===403) 
        setError("You do not have the right permissions to view these sessions.")
      else setError("Sessions failed to load. Refresh the page.");
      }
    },[id,token,baseURL]);

// UPDATE SESSION----PUT//
const updateSession = async (sessionId, updatedSession) => {
  setError("");
  setSuccess("");
  try {
    const sessionData = {
      ...updatedSession,
      topicsLearned: updatedSession.topicsLearned
        .split(",")
        .map(topic => topic.trim())
        .filter((topic) => topic),
    };
    // ${baseURL}/api/courses/${courseId}/sessions/${sessionId}
    const response = await axios.put(`${baseURL}/api/courses/${id}/sessions/${sessionId}`, sessionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
     setSessions(response.data);
    setSuccess("Session updated succesffuly.");
    getSessions();
    setTimeout(() => setSuccess(""), 3000);
  } catch (error) {
    console.error("Error updating session:", error);
      if (error.response?.status === 401) setError("Session expired. Log in again...");
      else if (error.response?.status === 403) setError("Insufficient permissions.");
      else setError("Could not update session. Try again...");
    }
  };


// Delete Sessions---DELETE//
const deleteSession = async (sessionId) => {
  if (window.confirm("Do you want to Delete this session?")) {
    setError("");
    setSuccess("");

    try {
        const response = await axios.delete(`${baseURL}/api/courses/${id}/sessions/${sessionId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });
       setSessions(response.data);
      setSuccess("Session deleted successfully.");
      getSessions();
      setTimeout(() => setSuccess(""),3000);

    } catch (error) {
    console.error("Error deleting session:", error);
    if (error.response?.status===401) 
      setError("Session expired. Try to log in again...");
     else if (error.response?.status===403) 
      setError("You can not delete this session...you don't have permission to.");
     else if (error.response?.status===404) 
      setError("Session is not found.");
    else setError("Could not delete session. Try again...");
   }
  }
};



useEffect(() => {
 if (currentUser && token) {
  getCourse();
  getSessions();
  getCourses();
 }
},[id, currentUser, token,getCourse,getSessions,getCourses]);

if(!course) {
  if (error) {
    return(
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p>
          {error}
        </p>
      </div>
     </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600">
      </div>
    </div>
    );
  }

return (
  <div className="min-h-screen relative">
    {/* earth background */}
    <div className="absolute inset-0 bg-cover bg-center opacity-30"
      style={{ 
        backgroundImage: `url(${backgroundImage1})`,
        backgroundColor: '#1a202c'
        }}
    />

    <div className="absolute inset-0 bg-black/50" />

    <div className="relative z-10 p-6">

      {/* Error and Succeess Messages */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6">

          {error} 

        </div>
       )}

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded mb-6">

          {success} 

        </div>
      )}

      {/* Course Header */}
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded mb-6">
       <h1 className="text-3xl font-bold text-white mb-2">{course.title}</h1>
       <p className="text-gray-200 mb-2">{course.description}</p>
     <div className="flex space-x-4">
        <span className="text-sm text-gray-300">Category:{course.category}</span>
       <span className="text-sm text-gray-300">Status: {course.status}</span>
     </div>
  
      {/* Delete course button */}
      <button 
        onClick={deleteCourse}
        className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
        ✖️Delete Course
        </button>
      </div>


{/* Update course button */}
<button 
  onClick={() => setShowEditForm(!showEditForm)}
  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-4"
  >

     {showEditForm ? "Cancel" : "Update Course"}

  </button>
</div>

{/* update course form */}
{showEditForm && (
  <div className="bg-white/10 backdrop-blur-sm p-4 roundedmb-6">
    <form onSubmit={updateCourse}>
      <div className="mb-4">
        <label className="block text-white mb-2">Course Title</label>
        <input 
          type="text"
          value={editedCourse.title}
          onChange={(e) => setEditedCourse({...editedCourse, title: e.target.value})}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="Enter desired course title"
          required
          />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Description</label>
        <textarea 
          value="{editedCourse.description}"
          onChange={(e) => setEditedCourse ({...editedCourse, description: e.target.value})}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="Enter course description"
          rows="3"
          />
      </div>
     <div className="mb-4">
      <label className="block text-white mb-2">Category</label>
       <input
        type="text"
        value={editedCourse.category}
        onChange={(e) => setEditedCourse({...editedCourse, category: e.target.value})}
        className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
        placeholder="Enter a course category"
        />
     </div>
     <div className="mb-4">
      <label className="block text-white mb-2">Status</label>
      <select
        value={editedCourse.status}
        onChange={(e) => setEditedCourse({...editedCourse,status:e.target.value})}
        className="w-full p-2 rounded bg-white/20 text-white"
        >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        </select>
     </div>

     <button 
       type="submit"
       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
       >
        ➕Update Course
       </button>
    </form>
    </div>
)}


{/* add session button */}
<div className="mb-6">
  <button
    onClick={() => setShowAddForm(!showAddForm)}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {showAddForm? "Cancel" : "Add Session"}

  </button>
</div>



{/* Add Session Form */}

{showAddForm && (
  <div className="bg-white/10 backdrop-blur-sm p-4 rounded mb-6">
    <form onSubmit={addSession}>
      <div className="mb-4">
        <label className="block text-white mb-2">Notes</label>
        <textarea
         value={newSession.notes}
         onChange={(e) => setNewSession ({...newSession, notes: e.target.value})}
         className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
         placeholder="Today, I learned about..."
         rows="3"
         />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2">Topics Learned (comma separated)</label>
         <input
          type="text"
          value={newSession.topicsLearned}
          onChange={(e) => setNewSession({...newSession, topicsLearned: e.target.value})}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="React hooks, API calls, Crypto, etc."
         />
      </div>

      <button 
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕Add Session

      </button>
    </form>
  </div>
 )}
  

{/* Sessions List */}
<div className="space-y-4">
  <h2 className="text-2xl font-bold text-white">
     🎒Learning Sessions 
    ({sessions.length})
  </h2>

  {sessions.length===0 ? (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded text-center">
      <p className="text-gray-300">No sessions yet. Add your first one above🔝</p>
      </div>
  ) : ( 
    sessions.map(session => (
      <div key={session._id} className="bg-white/10 backdrop-blur-sm p-4 rounded">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm text-gray-300">
            {new Date(session.date).toLocaleDateString()}
          </div>
          <button
            onClick={() => deleteSession(session._id)}
            className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700"
           >
            ✖️Delete

          </button>
        </div>

      {session.notes && (
        <p className="text-white mb-2">{session.notes}</p>
      )}  

      {session.topicsLearned && session.topicsLearned.length > 0 && (
        <div>
          <p className="text-sm text-gray-300 mb-1">Topics:</p>
          <div className="flex flex-wrap gap-2">
            {session.topicsLearned.map((topic, index) => (
              <span key={index} className="bg-blue-600 text-white px-2 py-1 rounded text-xs"> 
               {topic}
              </span>
             ))}
          </div>
         </div>
        )}
      </div>
      ))
     )}
   </div> 
  </div>

 );
}

export default CourseDetail;



