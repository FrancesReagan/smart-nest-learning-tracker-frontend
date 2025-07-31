import{ useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import { useAuth } from "../contexts/AuthContext";
import CourseCard from "../components/CourseCard";



function Dashboard() {
  const [courses, setCourses] = useState([]);
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

const { currentUser } = useUser();
const { token } = useAuth();

useEffect(() => {
  if (currentUser && token) {
  getCourses();
  }
},[currentUser,token]);

const getCourses = async () => {
  try {
    const response = await axios.get("/api/courses", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  getCourses(response.data)
  } catch (error) {
    console.error("Error retrieving your courses:", error);
  } if (error.response?.status===401){
    setError("Session expired. Login again...");
  } else if (error.response?.status===500){
    setError("Server Error. Try again...");
  } else {
    setError("Failed to load your courses...Refresh the page.");
   }
  }
 };

 const addCourses = async (e) => {
  e.preventDefault();
  setError("");
  setSuccess("");
  
  try {
    await axios.post("/api/courses", courseForm, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCourseForm({ title:"", description:"", category:"Other", url:"", status: "On the horizon"});
    setShowAddForm(false);
    setSuccess("Course added successfully.");
    getCourses();

    // clear success message after 3 seconds//
    setTimeout(() => setSuccess(""), 3000);
  } catch (error) {
    console.error("Error happened adding your course:", error);
    if (error.response?.status===400) {
      setError("Please check your course information and try again.");
    } else if (error.response?.status===401) {
      setError("Session expired. Log in again...");
    } else {
      setError("Failed to add your course...please try again.");
    }
   }
 };

 const updateCourse = async (e) => {
  e.preventDefault ();
  setError("");
  setSuccess ("");

  try {
    await axios.put(`/api/courses/${editingCourse,._id}`, courseForm, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setCourseForm({ title: "", description:"", category:"Other", url: "", status: "On the horizon"});
    setEditingCourse(null);
    setShowAddForm(false);
    setSuccess("Course updated successfully.");
    getCourses();

    // clear success message after 3 seconds//
    setTimeout(() => setSuccess(""), 3000);
  } catch (error) {
    console.error ("Error updating course:", error);
    if (error.response?.status===400){
      setError("Check your course information and try once again...");
    } else if (error.response?.status===401){
      setError("Session expired. Log in again.");
    } else if (error.response?.status===403) {
      setError("You don't have permission to edit this course.");
    } else {
      setError("Could not update this course...try again.");
    }
  }
 };

  const deleteCourse = async (courseId) => {
    setError ("");
    setSuccess ("");

    try {
      await axios.delete(`/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSuccess("Course successfully deleted.");
      getCourses();

      // clear succcess message after 3 seconds//
      setTimeout(() =>setSuccess (""), 3000);
    } catch (error) {
      console.error("Error deleting course:", error);
      if (error.response?.status===401) {
        setError("Session expired. Log in again.");
      } else if (error.response?.status===403) {
        setError("Permission to delete course denied.");
      } else {
        setError("Could not delete course...try again.");
      }
    }
  };

  const startEdit = (course) => {
    setError ("");
    setSuccess("");
    setEditingCourse (course);
    setCourseForm({
      title: course.title,
      description: course.description,
      category: course.category,
      url: course.url || "",
      status: course.status,
    });
    setShowAddForm(true)
  };

  const cancelEdit = () => {
    setError ("");
    setSuccess("");
    setEditingCourse(null);
    setShowAddForm(false);
    setCourseForm({ title: "", description: "", category: "Other", url: "", status: "On the horizon" });
  };

  // show loading if the user is not yet loaded//
  if(!currentUser){
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
           style={{ backgroundImage: "url(/designer-4.jpg)"}}
           />
    <div className="relative z-10 p-6">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          🤓Good to see you again. Let's do this {currentUser.username}
        </h1>
        <p className="text-gray-200">SmartNesting...Track your courses and learning process!</p>
      </div>

      {/* Error & Success Messages */}
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

     {/* add course button */}
     <div className="mb-6">
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover: bg-blue-700"
        >
          {showAddForm ? "Cancel" : "Add Course"}
        </button>
     </div>

     {/* add/edit course form */}
     {showAddForm && (
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded mb-6">
        <h3 className="text-white text-lg mb-4">
          {editingCourse? "Edit Course" : "Add New Course"}
        </h3>
      <form onSubmit={editingCourse? updateCourse : addCourse}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white mb-2">Title</label>
            <input
              type="text"
              value={courseForm.title}
              onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
              className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
              placeholder="Course title"
              required
              />
          </div>

        <div>
        <label className="block text-white mb-2">Category</label>
        <select 
         value={courseForm.category}
         onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
         className="w-full p-2 rounded bg-white/20 text-white"
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
        <label className="block text-white mb-2">Description</label>
        <textarea
          value={courseForm.description}
          onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
          className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
          placeholder="What will you learn today?"
          rows="3"
          required
          />    
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white mb-2">Course URL(optional)</label>
          <input
           type="url"
           value={courseForm.url}
           onChange={(e) => setCourseForm({...courseForm, url: e.target.value})}
           className="w-full p-2 rounded bg-white/20 text-white placeholder-gray-300"
           placeholder="https://..."
           />
        </div>

        <div>
          <label className="block text-white mb-2">Status</label>
          <select
            value={courseForm.status}
            onChange={(e) => setCourseForm({...courseForm, status:e.target.value})}
            className="w-full p-2 rounded bg-white/20 text-white"
            >
              <option value="On the horizon">On the horizon</option>
              <option value="Working it">Working it</option>
              <option value="BAM did it">BAM did it</option>
            </select>
        </div>
      </div>

      <div className="flex space-x-2">
        <button 
         type="submit"
         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
         >
          {editingCourse?"Update Course" : "Add Course"} 
        </button>

        {editingCourse && (
          <button
           type="button"
           onClick={cancelEdit}
           className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
           >
            Cancel
           </button>
        )}
         </div>
      </form>
    </div>
    )}

{/* Course Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {courses.length===0 ? (
    <div className="col-span-full text-center py-12">
      <p className="text-gray-300 text-lg">No courses added yet...add your first one.</p>
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
