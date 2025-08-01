import { Link } from "react-router-dom";
import backgroundImage2 from '../assets/designer-5.jpg';

function LandingPage() {
  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-40"
         style={{ 
           backgroundImage: `url(${backgroundImage2})`
          }}
       />
      <div className="relative z-10 h-full flex flex-col">
        <nav className="p-6 flex justify-between">
          <div className="text-white text-xl font-bold">SmartNest</div>
          <div>
            <Link to="/login" className="text-white mr-4">Login</Link>
            <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded">Sign Up</Link>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl text-white font-bold mb-4">
              Learning Tracker
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Keep track of your courses and learning sessions
            </p>
            <Link to="/register" className="bg-blue-500 text-white px-6 py-3 rounded text-lg mr-4"
            >
              Start Tracking
            </Link>
            <Link to="/login" className="text-white border border-white px-6 py-3 rounded text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LandingPage;