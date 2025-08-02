import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from '@/hooks/useUser.js';





function NavBar() {
  const { logout} = useAuth();
  const { currentUser, clearUser } = useUser();

  const handleLogout = () => {
    logout();
    clearUser();
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
       <Link to="/dashboard" className="text-white text-4xl font-bold drop-shadow-lg">

        SmartNest

       </Link>

       <div className="flex items-center space-x-4">
        <span className="text-gray-300 drop-shadow-lg">

          Good to see you, {currentUser?.username}

        </span>

        <button
         onClick={handleLogout}
         className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-red-700" 
        >
          Log out...

        </button>

      </div>
    </div>
  </nav>
 );
}

    export default NavBar;

