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
}