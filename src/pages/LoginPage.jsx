import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";

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
    style={{ backgroundImage: "url(/designer-5.jpg)"}}
    />
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-white text-center mb-6">Login</h2>
      
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4">
          {error}
      </div>
      )}

 <form onSubmit={handleSubmit}>
  <div className="mb-4">
    <label className="block text-white mb-2">Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300"
      placeholder="your@email.com"
      required
      />
  </div>

 <div className="mb-6">
  <label className="block text-white mb-2">Password</label>
  <input
   type="password"
   value={password}
   onChange={(e) => setPassword(e.target.value)}
   className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300"
   placeholder="Your Password"
   required
   />
 </div>

<button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 mb-4 disabled:opacity-50"
    disabled={authLoading}
    >
     {authLoading? "Logging in...": "Login"}
</button>
 </form>
<div className="text-center">
  <p className="text-gray-300">
    Don't have an account?{" "}
    <Link to="/register" className="text-blue-400 hover:text-blue-300">
    Sign Up
    </Link>
  </p>
  <Link to="/" className="text-gray-400 hover:text-gray-300 text-sm">
     Back to home
    </Link>
  </div>
  </div>
  </div>
</div>
);
}

export default LoginPage;