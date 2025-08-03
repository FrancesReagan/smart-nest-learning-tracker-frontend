import backgroundImage2 from '../assets/designer-5.jpg';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from '@/hooks/useUser.js';






function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login, authLoading } = useAuth()
  const { setUser } = useUser()
  const navigate = useNavigate()



const handleSubmit = async (e) => {
  e.preventDefault()
  setError("");

  try {
    const result = await login({ email, password});
    // set user in  UserContext//
    setUser(result.user);
    navigate("/dashboard")
  } catch (error) {
    console.error("Login error:", error);
    setError(error.message || "Invalid email or password")
  }
}

return (
  
  <div className="min-h-screen relative">
    {/* Birds Background */}
    <div className="absolute inset-0 bg-cover bg-center opacity-40"
   style={{ 
            backgroundImage: `url(${backgroundImage2})`,
             backgroundColor: '#1a202c'
           }}
    />
    
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md">
      <h2 className="text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">Login</h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4">
          {error}
      </div>
      )}

 <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label className="block text-white mb-2 text-2xl drop-shadow-lg">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-3 rounded bg-white/20 text-gray-800 placeholder-gray-900 text-xl"
      placeholder="your@email.com"
      required
      />
  </div>

 <div className="mb-6">
  <label className="block text-white mb-2 text-2xl drop-shadow-lg">Password</label>
  <input
   type="password"
   value={password}
   onChange={(e) => setPassword(e.target.value)}
   className="w-full p-3 rounded bg-white/20 text-white text-xl placeholder-gray-900"
   placeholder="Your Password"
   required
   />
 </div>

<button type="submit" className="w-full bg-gray-700 text-white text-xl py-3 rounded hover:bg-blue-700 mb-4 disabled:opacity-50 drop-shadow-lg"
    disabled={authLoading}
    >
     {authLoading? "Logging in...": "Login"}
</button>
 </form>
<div className="text-center">
  <p className="text-gray-300 text-xl drop-shadow-lg">
    Don't have an account?{" "}
    <Link to="/register" className="text-blue-300 hover:text-yellow-300">
    Sign Up
    </Link>
  </p>
  <Link to="/" className="text-gray-900 hover:text-yellow-300 text-xl">
     Back to home
    </Link>
  </div>
  </div>
  </div>
</div>
);
}

export default LoginPage;