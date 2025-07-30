import { Link } from "react-router-dom";

function CourseCard({ course, onDelete, onEdit }) {
  const handleDelete = () => {
    if(window.confirm("Do you want to delete this Course?")) {
      onDelete(course._id);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "On the horizon": return "bg-yellow-500"
      case "Working it": return "bg-blue-500"
      case "BAM did it": return "bg-green-500"
      default: return "bg-gray-500"
    }
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-bold">{course.title}</h3>
        <span className={`text-white text-xs px-2 py-1 rounded ${getStatusColor(course.status)}`}>
          {course.status}
        </span>
      </div>
      <p className="text-gray-600 mb-2">{course.description}</p>
      
      {course.category && (
        <p className="text-sm text-gray-500 mb-2">Category: {course.category}</p>
      )}

      {course.url && (
        <a href={course.url} target="_blank" rel="noopener noreferrer">
          className="text-blue-600 text-sm hover:underline block mb-3">
          Course Link 
          </a>
      )}
      <div classname="flex space-x-2">
        <Link to={`/courses/${course._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
            >
              View Sessions

            </Link>
            <button 
               onClick={() => onEdit(course)}
               className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700"
               >
                Edit
               </button>
      </div>
    </div>
  )
}