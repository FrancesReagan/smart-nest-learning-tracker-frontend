import { Link } from "react-router-dom";

function CourseCard({ course, onDelete, onEdit }) {
  const handleDelete = () => {
    if(window.confirm("Do you want to delete this Course?")) {
      onDelete(course._id);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "On the horizon": return "bg-gray-800"
      case "Working it": return "bg-blue-600"
      case "BAM did it": return "bg-green-400"
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
        // for enhanced security--noopener--no linked page can take control and noreferrer prevents sharing of referrer info//
        <a href={course.url} target="_blank" rel="noopener noreferrer"
          className="text-blue-600 text-sm hover:underline block mb-3"
          >
         Course Link 

        </a>
      )}

      <div className="flex space-x-2">
        <Link to={`/courses/${course._id}`}
            className="bg-blue-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-green-300"
            >
              View Sessions

        </Link>

            <button 
               onClick={() => onEdit(course)}
               className="bg-yellow-400 text-gray-900 px-3 py-1 rounded text-sm hover:bg-orange-400"
               >
                Edit

            </button>

             <button 
               onClick={handleDelete}
               className="bg-red-300 text-gray-950 px-3 py-1 rounded text-sm hover:bg-red-400"
               >
                Delete

             </button>
      </div>
    </div>
  );
}

export default CourseCard;