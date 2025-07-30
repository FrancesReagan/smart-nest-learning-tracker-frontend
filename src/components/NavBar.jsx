import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { user, logout} = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
       <Link to="/dashboard" className="text-white text-xl font-bold">
       SmartNest
       </Link>
       <div className="flex items-center space-x-4">
        <span className="text-gray-300">
          Good to see you, {user.username}
        </span>
        <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700" 
        >
          Log out...
        </button>
        </div>
        </div>
        </nav>
      )
    }

    export default NavBar;

//     // This NavBar:
// •	Shows the SmartNest logo that links back to dashboard
// •	Says "Hey, [username]" so users know they're logged in
// •	Has a logout button that actually works
// •	Uses the earth/hands background (since it's inside the app)
// No dropdown menus, no complex navigation - When user clicks logout, she or he go back to birds landing page.
// may change this approach --but as an extra//
