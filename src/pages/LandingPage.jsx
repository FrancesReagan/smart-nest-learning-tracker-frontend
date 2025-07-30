import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 bg-cover bg-center opacity-40"
      style={{ backgroundImage: "url(/designer-5.jpg)"}}
      />
      <div className="relative z-10 h-full flex flex-col">
        <nav className="p-6 flex justify-between">
          <div className="text-white text-xl font-bold">SmartNest</div>
          <div>
            <Link to="/login" className="text-white mr-4">Login</Link>
          </div>
        </nav>
      </div>
    </div>
  )
}