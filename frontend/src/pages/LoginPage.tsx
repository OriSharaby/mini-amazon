import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/LoginPage.css"; 




export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try{
            const {data} = await axios.post("http://localhost:5000/api/users/login",
               { email,
                password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/home");
        }
        catch(error: any){
            alert("Login failed: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
      <div className="login-container">
        <div className="login-card">
          <div className="logo"> Mini Amazon</div>
          <h2>Welcome </h2>
          <p>Log in/sign in to your account to continue</p>
          <form onSubmit={handleLogin}>
          <div className="input-group">
            <span className="icon">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder=" Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <span className="icon">            
              <FaLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

        <button type="submit" className="login-button">Login</button>
        </form>

        <div className="links">
         <Link to="/forgot-password">Forgot my password. 🔐</Link>
         <Link to="register">Don't have an account? Register👤</Link>
        </div>
      </div>
    </div>
  );
}