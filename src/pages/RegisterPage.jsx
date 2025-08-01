import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from '@/hooks/useUser.js';






function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { register, authLoading } = useAuth();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("");

    // client side validation//
    if (password.length<5) {
      setError("Password must be at least 5 characters")
      return;
    }
     if (!email.includes("@")) {
      setError("Please enter a valid email address")
      return;
     }

     if(username.length <3) {
      setError("Username must be at least 3 characters");
      return;
     }

    try {
      const result = await register({username, email, password})
      setUser(result.user);
      navigate("/dashboard")

    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "Registration failed. Try again...");
    }
  };
  
  return (
    <div className="min-h-screen relative">
      {/* birds background */}
     <div className="absolute inset-0 bg-cover bg-center opacity-40"
       style={{ backgroundImage: "url(/designer-5.jpg)"}}
      />
      <div className="absolute inset-0 bg-black/50"/>
       <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md">
           <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>
              {error && (
                   <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded mb-4">
                        {error}

                   </div>
                 )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Username</label>
            <input 
             type="text"
             value={username}
             onChange={(e) => setUsername(e.target.value)} 
             className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300"
             placeholder="Choose a username"
             required
            />
          </div>

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
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-300"
              placeholder="At least 5 characters"
              required
              disabled={authLoading}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 mb-4 disabled: opacity-50 disabled:cursor-not-allowed"
                       disabled={authLoading}
          >
              {authLoading? "Creating Account..." : "Create Account"}

          </button>
        </form>

        <div className="text-center">
          <p className="text-gray-300">

            Already have an account?{" "}

            <Link to="/login" className="text-blue-400 hover:text-blue-300">
              Login
            </Link>
          </p>

          <Link to="/" className="text-gray-400 hover:text-gray-300 text-sm">
            Back to Home 
          </Link>

        </div>
      </div>
    </div>
   </div>
  );
}

export default RegisterPage;