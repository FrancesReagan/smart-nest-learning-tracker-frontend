import backgroundImage2 from '../assets/designer-5.jpg';
import { Link } from "react-router-dom";


function LandingPage() {
  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-40"
         style={{ 
           backgroundImage: `url(${backgroundImage2})`,
            backgroundColor: '#1a202c'
          }}
       />
      <div className="relative z-10 h-full flex flex-col">
        <nav className="p-6 flex justify-between">
          <div className="text-white text-6xl font-bold drop-shadow-lg">SmartNest</div>
          <div>
            <Link to="/login" className="text-gray-900 text-3xl mr-4 drop-shadow-lg">Login</Link>
            <Link to="/register" className="bg-gray-700 text-white text-2xl px-4 py-2 rounded drop-shadow-lg">Sign Up</Link>
          </div>
        </nav>
        <div className="flex-1 flex items-center justify-center text-center">
          <div>
            <h1 className="text-7xl text-white font-bold mb-4 drop-shadow-lg">
              Learning Tracker
            </h1>
            <p className="text-gray-800-500 text-2xl mb-8 drop-shadow-lg">
              Keep track of your courses and learning sessions
            </p>
            <Link to="/register" className="bg-gray-700 text-white px-6 py-3 rounded text-2xl mr-4 drop-shadow"
            >
              Start Tracking
            </Link>
            <Link to="/login" className="text-blue-900 border border-blue drop-shadow-lg px-6 py-3 rounded text-2xl"
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