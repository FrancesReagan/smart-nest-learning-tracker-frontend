import backgroundImage1 from '../assets/designer-4.jpg';
import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from '@/hooks/useUser.js';
import { useAuth } from "../contexts/AuthContext";



function CourseDetail() {
  // Get the course ID from the URL parameters//
  const { id } = useParams();
  const navigate = useNavigate();

  // state variables for managing the component data and UI state//
  const [course, setCourse] = useState(null);
  // const [courses, setCourses] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newSession, setNewSession] = useState({ notes:"", topicsLearned:"" });
  const [editedCourse, setEditedCourse] = useState(null);
  // const [selectedSession, setSelectedSession] = useState(null);

  // state for managing editing the sessions//
  const[editingSession, setEditingSession] = useState(null);
  const[editedSessionData, setEditedSessionData] = useState({notes:"", topicsLearned:""});

  // state for confirmation modal----to ensure user meant to do something or not---confirm or cancel and action they did//
  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const[showDeleteSessionModal, setShowDeleteSessionModal] = useState(false);
  const[sessionToDelete, setSessionToDelete] = useState(null);
 
 

  // custom hooks for user and authentication context//
  const { currentUser } = useUser();
  const { token } = useAuth();
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

 
  //  GET ALL COURSES---GET-----keeping this here but currently not using this function yet//
  // wrap getCourses in a useCallback//
  // useCallback is used to memoize functions, preventing unnecessary re-creation on re-renders
  // This is especially useful for functions passed as dependencies to useEffect.
  const getCourses = useCallback(async() => {
    try {
      const response = await axios.get(`${baseURL}/api/courses`,{
        headers: { Authorization: `Bearer ${token}`},
      });
      // setCourses(response.data);
      // initialize with current course data//
      console.log("All courses:", response.data);
    } catch (error) {
      console.error("Error in retrieving all courses:", error);
      if (error.response?.status === 404) setError("Your courses could not found.");
       else if (error.response?.status===401) setError("Session expired. You need to log in once more.");
       else if (error.response?.status===403) setError("To view courses you need to have the correct permissions.");
       else setError("Courses failed to load...please try again.");
    }
  },[token,baseURL]); 

  // GET COURSE BY ID---GET//
  const getCourse = useCallback(async() => {
    try {
      const response = await axios.get(`${baseURL}/api/courses/${id}`,{
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
  //  setCourses(response.data);
    setSuccess("Course updated.");
    setShowEditForm(false);
    // get updated course data//
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
    // close the confirmation modal//
    setShowDeleteCourseModal(false);
    try {
        const response = await axios.delete(`${baseURL}/api/courses/${id}`, {
        headers: {Authorization:`Bearer ${token}`,},
      });
      setCourses(response.data);
      setSuccess("Course has been deleted.");
      // redirect to courses after 2s//
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

      await axios.post(`${baseURL}/api/courses/${id}/sessions`, sessionData, {
      headers: {Authorization:`Bearer ${token}`},
    });

    //  setSessions(response.data);
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
     await axios.put(`${baseURL}/api/courses/${id}/sessions/${sessionId}`, sessionData, {
      headers: { Authorization: `Bearer ${token}` },
    });
   
    setSuccess("Session updated successfully.");
    getSessions();
    // reset editing state//
    setEditingSession(null);
    // reset editing state//
    setEditingSession(null);
    setTimeout(() => setSuccess(""), 3000);
  } catch (error) {
    console.error("Error updating session:", error);
      if (error.response?.status === 401) setError("Session expired. Log in again...");
      else if (error.response?.status === 403) setError("Insufficient permissions.");
      else setError("Could not update session. Try again...");
    }
  };


// Delete Sessions---DELETE//
const handleDeleteSessionConfirmed = async () => {
   const sessionId = sesstionToDelete;
    setError("");
    setSuccess("");
    setShowDeleteSessionModal(false);
    setSessionToDelete(null);

    try {
        await axios.delete(`${baseURL}/api/courses/${id}/sessions/${sessionId}`, {
        headers: {Authorization: `Bearer ${token}`},
      });

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


// this is the  main effect hook that will fetch or get the initial data//
useEffect(() => {
 if (currentUser && token) {
  getCourse();
  getSessions();
  getCourses();
 }
}, [id, currentUser, token, getCourse, getSessions, getCourses]);

// loading and error states//
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

{/*  Main Content */}
    <div className="relative z-10 p-6 max-w-4xl-mx-auto">

      {/* Error and Succeess Messages */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-6 drop-shadow-lg">
          {error} 
        </div>
       )}

      {success && (
        <div className="bg-green-500/20 border border-green-500 text-green-200 p-3 rounded mb-6 drop-shadow-lg">
          {success} 
        </div>
      )}

      {/* Course Header with details and action buttons*/}
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded mb-6">
       <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-2xl">{course.title}</h1>
       <p className="text-gray-200 mb-2 drop-shadow-2xl">{course.description}</p>
     <div className="flex space-x-4">
        <span className="text-sm text-gray-300 drop-shadow-2xl">Category:{course.category}</span>
       <span className="text-sm text-gray-300 drop-shadow-2xl">Status: {course.status}</span>
     </div>
  
      {/* Delete course button */}
      <button 
        onClick={() => setShowDeleteCourseModal(true)}
        className="mt-4 bg-red-400 text-gray-900 px-4 py-2 drop-shadow-xl rounded hover:bg-orange-200"
        >
        ✖️Delete Course
        </button>
      </div>


{/* Update course button --form, conditionally rendered */}
<button 
  onClick={() => setShowEditForm(!showEditForm)}
  className="mt-4 bg-blue-600 text-gray-900 px-4 py-2 drop-shadow-xl rounded hover:bg-blue-700 mr-4"
  >

     {showEditForm ? "Cancel" : "Update Course"}

  </button>
</div>

{/* update course form */}
{showEditForm && (
  <div className="bg-white/10 backdrop-blur-sm p-4 rounded mb-6">
    <form onSubmit={updateCourse}>
      <div className="mb-4">
        <label className="block text-blue-900 mb-2 drop-shadow-2xl">Course Title</label>
        <input 
          type="text"
          value={editedCourse.title}
          onChange={(e) => setEditedCourse({...editedCourse, title: e.target.value})}
          className="w-full p-2 rounded bg-white/20 text-blue-900 placeholder-gray-900"
          placeholder="Enter desired course title"
          required
          />
      </div>
      <div className="mb-4">
        <label className="block text-gray-800 mb-2 drop-shadow-2xl">Description</label>
        <textarea 
          value="{editedCourse.description}"
          onChange={(e) => setEditedCourse ({...editedCourse, description: e.target.value})}
          className="w-full p-2 rounded bg-white/20 text-gray-800 placeholder-gray-900"
          placeholder="Enter course description"
          rows="3"
          />
      </div>
     <div className="mb-4">
      <label className="block text-blue-900 mb-2 drop-shadow-2xl">Category</label>
       <input
        type="text"
        value={editedCourse.category}
        onChange={(e) => setEditedCourse({...editedCourse, category: e.target.value})}
        className="w-full p-2 rounded bg-white/20 text-gray-900 placeholder-gray-700"
        placeholder="Enter a course category"
        />
     </div>
     <div className="mb-4">
      <label className="block text-gray-800 mb-2 drop-shadow-2xl">Status</label>
      <select
        value={editedCourse.status}
        onChange={(e) => setEditedCourse({...editedCourse,status:e.target.value})}
        className="w-full p-2 rounded bg-white/20 text-gray-900"
        >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
        </select>
     </div>

     <button 
       type="submit"
       className="bg-yellow-400 text-gray-900 px-4 py-2 rounded drop-shadow-2xl hover:bg-yellow-200"
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
    className="bg-green-300 text-gray-900 px-4 py-2 rounded hover:bg-blue-500"
    >
      {showAddForm? "Cancel" : "Add Session"}

  </button>
</div>



{/* Add Session Form */}

{showAddForm && (
  <div className="bg-white/10 backdrop-blur-sm p-4 rounded mb-6 drop-shadow-2xl">
    <form onSubmit={addSession}>
      <div className="mb-4">
        <label className="block text-gray-900 mb-2 drop-shadow-xl">Notes</label>
        <textarea
         value={newSession.notes}
         onChange={(e) => setNewSession ({...newSession, notes: e.target.value})}
         className="w-full p-2 rounded bg-white/20 text-gray-900 placeholder-gray-700"
         placeholder="Today, I learned about..."
         rows="3"
         />
      </div>
      <div className="mb-4">
        <label className="block text-gray-900 mb-2 drop-shadow-2xl">Topics Learned (comma separated)</label>
         <input
          type="text"
          value={newSession.topicsLearned}
          onChange={(e) => setNewSession({...newSession, topicsLearned: e.target.value})}
          className="w-full p-2 rounded bg-white/20 text-gray-900 placeholder-gray-700"
          placeholder="React hooks, API calls, Crypto, etc."
         />
      </div>

      <button 
        type="submit"
        className="bg-yellow-300 text-gray-900 px-4 py-2 rounded hover:bg-orange-200"
        >
          ➕Add Session

      </button>
    </form>
  </div>
 )}
  

{/* Sessions List */}
<div className="space-y-4">
  <h2 className="text-2xl font-bold drop-shadow-2xl text-gray-900">
     🎒Learning Sessions ({sessions.length})
  </h2>

  {sessions.length===0 ? (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded text-center">
      <p className="text-gray-900">No sessions yet. Add your first one above🔝</p>
      </div>
  ) : ( 
    sessions.map(session => (
      <div key={session._id} className="bg-white/10 backdrop-blur-sm p-4 rounded">
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm text-gray-800">
            {new Date(session.date).toLocaleDateString()}
          </div>

          <div className="flex space-x-2">
           <button 
             onClick={() => {
               setEditingSession(session._id);
               setEditedSessionData({
                notes: session.notes,
                topicsLearned: session.topicsLearned.join(", "),
               });
             }}
              className="bg-blue-400 text-gray-900 px-2 py-1 rounded-lg text-sm hover:bg-blue500 transition duration-300"
              >
                ✏️Edit Session
            </button>

          <button
            onClick={() => {
              setSessionToDelete(session._id);
              setShowDeleteCourseModal(true);
            }}
            className="bg-red-400 text-gray-900 px-2 py-1 rounded text-xs hover:bg-yellow-300"
           >

            ✖️Delete

          </button>
        </div>
       </div>

      {editingSession === session._id? (
        <form onSubmit={(e) => {
          e.preventDefault();
          updateSession(editingSession, editedSessionData);
        }}>
          <div className="mb-2">
            <label className="block text-gray-800 mb-1 text-sm drop-shadow-2xl">Notes</label>
            <textarea
              value={editedSessionData.notes}
              onChange={(e) => setEditedSessionData({...editedSessionData, notes: e.target.value })}
              className="w-full p-1 rounded bg-white/20 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm
              rows=2"
              />
          </div>
          <div className="mb-2">
            <label className="block text-gray-900 mb-1 text-sm">Topics Learned (comma separated)</label>
            <input 
              type="text"
              value={editedSessionData.topicsLearned}
              onChange={(e) => setEditedSessionData({...editedSessionData, topicsLearned: e.target.value })}
              className="w-full p-1 bg-white/20 text-gray-900 placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
          </div>
          <div className="flex justify-end space-x-2">
            <button 
              type="submit"
              className="bg-green-400 text-gray-900 px-3 py-1 rounded-lg text-sm hover:bg-green-300 transition duration-300"
             >
              Update 
            </button>
          <button 
            type="button"
            onClick={() => setEditingSession(null)}
            className="bg-gray-500 text-gray-900 px-3 py-1 rounded-lg text-sm hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
        {session.notes && (
          <p className="text-gray-800 mb-2 drop-shadow-2xl">{session.notes}</p>
        )}
        {session.topicsLearned && session.topicsLearned.length > 0 && (
          <div>
            <p className="text-sm text-gray-900 mb-1 drop-shadow-2xl">Topics:</p>
            <div className="flex flex-wrap gap-2">
              {session.topicsLearned.map((topic,index) => (
                <span key={index} className="bg-blue-400 text-gray-900 px-2 py-1 rounded-lg text-sm drop-shadow-2xl">
                  {topic} 
                </span>
              ))}
            </div>
          </div>
        )}
       </>
      )}
    </div>
    ))
   )}
  </div>

  {/* In-line confirmation moduals to ensure users truly want to do the actions they take or not */}
  {showDeleteCourseModal && (
     <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <p className="text-gray-800 text-lg mb-4">Are you absolutely sure you want to permanently delete this course?</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={deleteCourse}
            className="bg-red-300 text-gray-900 px-4 py-2 rounded hover:bg-orange-400 transition duration-300"
            >
              Confirm
            </button>

            <button 
              onClick={() => setShowDeleteCourseModal(false)}
              className="bg-gray-600 text-gray-900 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
        </div>
      </div>
     </div>
  )}
  {showDeleteCourseModal && (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <p className="text-gray-900 text-lg mb-4">Are you sure you want to delete this session?</p>
        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleDeleteSessionConfirmed}
            className="bg-red-400 text-gray-900 px-4 py-2 rounded hover:bg-red-200 transition duration-300"
           >
            Confirm 
          </button>
            

            </div>
      </div>
    </div>
  )}

       

export default CourseDetail;

