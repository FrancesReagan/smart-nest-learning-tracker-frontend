import { useState } from "react";

import { Link, useNavigate } from "ract-router-dom";
import { useAuth } from "../contexts/AuthContext";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("");

    if (password.length<5) {
      setError("Password must be at least 5 characters")
      return
    }
    try {
      await register(username, email, password)
      navigate("/dashboard")
    } catch (error) {
      setError("Registration failed. Email might already be taken.")
    }
  }
  
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
          <div className
        </form>
      </div>
    </div>
  )

}