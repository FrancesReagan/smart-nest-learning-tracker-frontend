import backgroundImage1 from '../assets/designer-4.jpg';
import{ useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useUser } from '@/hooks/useUser.js';




import { useAuth } from "../contexts/AuthContext";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error,setError] = useState(""); 
  const [success,setSuccess] = useState("");
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "Other",
    url: "",
    status:"On the horizon"
});

const { currentUser } = useUser();
const { token } = useAuth();
const navigate = useNavigate();
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//  GET ALL COURSES---GET-//
  // wrap getCourses in a useCallback//
  // useCallback is used to memoize functions, preventing unnecessary re-creation on re-renders
  // This is especially useful for functions passed as dependencies to useEffect.
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
  },[token,baseURL]); 


useEffect(() => {
  if (currentUser && token) getCourses();
  },[currentUser,token,getCourses]);


 // Add Course--POST//
  const addCourse = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
       await axios.post(`${baseURL}/api/courses`, courseForm, {
        headers: {Authorization:`Bearer ${token}`},
      });
      setCourseForm({ title:"", description:"", category:"Other", url:"", status:"On the horizon" });
      setShowAddForm(false);
      setSuccess("Course added successfully.");
      getCourses();
      setTimeout(() => setSuccess(""),3000);
        } catch (error) {
      console.error("Error adding course:", error);
      if (error.response?.status === 401) setError("Session expired. Please log in again.");
       else if (error.response?.status === 403) setError("You don't have the right permissions to add this course.");
       else setError("Failed to add course. Try again...");
    }
  };

 

  const deleteCourse = async (courseId) => {
    setError ("");
    setSuccess ("");

    try {
      // await axios.delete(`${baseURL}/api/courses/${Id}//
       await axios.delete(`${baseURL}/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}`},
      });
      setSuccess("Course successfully deleted.");
      getCourses();
      setTimeout(() =>setSuccess (""), 3000);

    } catch (error) {
      console.error("Error deleting course:", error);
      if (error.response?.status===401) setError("Session expired. Log in again.");
       else if (error.response?.status===403) setError("You don't have the right permissions to delete course.");
       else setError("Could not delete course...try again.");
      }
    };
 

  const startEdit = (course) => {
    // redirect to coursedetail page for editing courses//
    navigate(`/courses/${course._id}`);
  };
 

  
  return (
    <div className="min-h-screen relative">
      {/* earth background */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" 
       style={{ 
           backgroundImage: `url(${backgroundImage1})`,
            backgroundColor: '#1a202c'
           }}
      />
    <div className="relative z-10 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-shadow-gray-700 mb-2 drop-shadow-2xl">
         
          🤓Good to see you again. Let's do this {currentUser?.username}
       
        </h1>
        <p className="text-shadow-gray-700 text-xl drop-shadow-lg">SmartNesting...Track your courses and learning process!</p>
      </div>
{/* error and success message */}
    {error && <div className="bg-red-500/20 border border-red-400 text-red-200 p-3 rounded mb-6">{error}</div>}
    {success && <div className="bg-green-500/20 border border-green-400 text-green-200 p-3 rounded mb-6">{success}</div>}
    
     {/* add course button */}
     <div className="mb-6">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-green-300 text-gray-900 text-xl px-4 py-2 rounded hover:bg-green-500 drop-shadow-lg"
        >
          {showAddForm ? "Cancel" : "Add Course"}

      </button>
     </div>

     {/* add course form */}
     {showAddForm && (
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded mb-6">
        <h3 className="text-shadow-gray-700 text-lg mb-4">Add New Course</h3>
      <form onSubmit={addCourse}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-shadow-gray-700 mb-2 drop-shadow-2xl">Title</label>
            <input
              type="text"
              value={courseForm.title}
              onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
              className="w-full p-2 rounded bg-white/20 text-blue-900 placeholder-gray-700"
              placeholder="Course title"
              required
              />
          </div>

        <div>
        <label className="block text-shadow-gray-700 mb-2">Category</label>
        <select 
         value={courseForm.category}
         onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
         className="w-full p-2 rounded bg-white/30 text-gray-800"
         >
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
          <option value="Business">Business</option>
          <option value="Data Science">Data Science</option>
          <option value="Investing">Investing</option>
          <option value="Other">Other</option>
         </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-shadow-gray-700 mb-2">Description</label>
        <textarea
          value={courseForm.description}
          onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
          className="w-full p-2 rounded bg-white/30 text-gray-900 placeholder-gray-700"
          placeholder="What will you learn today?"
          rows="3"
          required
          />    
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-shadow-gray-600 mb-2">Course URL(optional)</label>
          <input
           type="url"
           value={courseForm.url}
           onChange={(e) => setCourseForm({...courseForm, url: e.target.value})}
           className="w-full p-2 rounded bg-white/20 text-blue-900 placeholder-gray-700"
           placeholder="https://..."
           />
        </div>

        <div>
          <label className="block text-shadow-gray-600 mb-2">Status</label>
          <select
            value={courseForm.status}
            onChange={(e) => setCourseForm({...courseForm, status:e.target.value})}
            className="w-full p-2 rounded bg-white/20 text-shadow-gray-600"
            >
              <option value="On the horizon">On the horizon</option>
              <option value="Working it">Working it</option>
              <option value="BAM did it">BAM did it</option>
              <option value="On-Hold">On-Hold</option>
            </select>
        </div>
      </div>

      {/* <div className="flex space-x-2"> */}
        <button type="submit" className="bg-yellow-200 text-gray-900 px-4 py-2 rounded hover:bg-orange-400">Add Course</button>
      </form>
    </div>
    )}

{/* Course Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {courses.length===0 ?(
    <div className="col-span-full text-center py-12">
      <p className="text-gray-800 text-lg">No courses added yet...add your first one.</p>
</div>
  ) : (
    courses.map(course => (
      <CourseCard
       key={course._id}
       course={course}
       onDelete={deleteCourse}
       onEdit={startEdit}
       />
       ))
     )}
    </div>
   </div>
  </div>
 );
}


export default Dashboard;










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
