import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [succcess, setSucccess] = useState("");
  const [newSession, setNewSession] = useState({
    notes:"",
    topicsLearned:""
  });

  const { currentUser } = useUser();
  const { token } = useAuth();

useEffect(() => {
 if (currentUser && token) {
  getCourses();
  getSession();
 }
},[id, currentUser, token]);

const getGourse = async () => {

  try {
    const response = await axios.get(`/api/courses/${id}`, {
      headers: {
        Authorization:`Bearer ${token}`
      }
    });
    setCourse(response.data);
  } catch (error) {
    console.error("Error retrieving course for you:", error);
    if(error.response?.status === 404) {
      setError("Course not found.");
    } else if (error.response?.status===401){
      setError("Session expired. Please log in again.");
    } else if (error.response?.status===403){
      setError("You need permission to view this course.");
    } else {
      setError("Failed to load course. Try again...");
    }
  }
};

const getSessions = async () => {
  try {
    const response = await axios.get(`/api/courses/${id}/sessions`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setSessions(response.data);
  } catch (error) {
    console.error("Error getting sessions:", error);
    if(error.response?.status===401) {
      setError("Session expired. Try to log in again.");
    } else if (error.response?.status===403) {
      setError("You don't have permission to view these sessions.");
    } else {
      setError("Failed to load sesions. Please refresh the page.");
    }
   }
  };

const addSession = async (e) => {
  e.preventDefault();
  setError("");
  setSucccess("");

  try {
    
    const sessionData = {
      ...newSession,
      topicsLearned: newSession.topicsLearned.split(",").map(topic => topic.trim()).filter(topic => topic)
    };

   await axios.post(`/api/courses/${id}/sessions`, sessionData. {
    headers: {
      Authorization: `Bearer ${token}`
    }
   });

   setNewSession({ notes:"", topicsLearned:"" });
   setShowAddForm(false);
   setSucccess("Session added successfully");
   getSessions();
  //  clear success message after 3 seconds//
  } catch (error) {
    console.error("Error adding session:", error);
    if (error.response?.status===400) {
      setError ("Please check your session information and try again");
    } else if (error.response?.status===401){
      setError("Session expired. Please log in again. ");
    } else if (error.response?.status===403){
      setError ("You don't have permission to add sessions to this course.");
    } else {
      setError("Failed to add a session. Please try again.");
    }
  }
};

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
        <label className="block text-white mb-2">Topics Learned(comma separated)</label>
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
          Add Session
        </button>
      </form>
    </div>
)}

  </div>

{/* Sessions List */}
<div className="space-y-4">
  <h2 className="text-2xl font-bold text-white">Learning Sessions 
    ({sessions.length})
  </h2>

  {sessions.lenth===0 ? (
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
            Delete
           </button>
        </div>
      {session.notes && (
        <p className="text-white mb-2">{session.notes}</p>
      )}  
      {session.topicsLearned && session.topicsLearned.length > 0 && (
        <div>
          <p className="text-sm text-gray-300 mb-1">Topics:</p>
          <div className="flex flex-wrap gap-2">
            {session.topicsLearned.map((topic,index) => (
              <span key={index}className="bg-blue-600 text-white px-2 py-1 rounded text-xs"> 
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
  </div>
    )
  }

export default CourseDetail;



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