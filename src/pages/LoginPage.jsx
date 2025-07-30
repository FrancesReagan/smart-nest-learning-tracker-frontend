import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

};

const handleSubmit = async (e) => {
  e.preventDefault()
  setError("")

  try {
    await login(email, password)
    navigate("/dashboard")
  } catch (error) {
    setError("Invalid email or password")
  }
}
return (
  <div className="min-h-screen relative">
    {/* Birds Background */}
    <div
  </div>
)

  } catch (error) {
    
  }
}  