import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AuthPage.css"; 
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";


export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent ) => {
        e.preventDefault();

        try{
            const {data} = await axios.post("http://localhost:5000/api/users/register",{
                name,
                email,
                password,
            });

            localStorage.setItem("userInfo", JSON.stringify(data));
            navigate("/login");
            
        } catch(error: any){
            alert("Registration failed: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="logo">Mini Amazon</div>
                <h2>Register</h2>
                <p>Sign up to create a new account</p>
                
                <form onSubmit={handleRegister}>
                    <div className="input-group">
                        <span className="icon">
                            <FaUser />
                        </span>
                        <input 
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <span className="icon">
                            <FaEnvelope />
                        </span>
                        <input 
                            type="text"
                            placeholder="Email"
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
                    <button type="submit" className="login-button">Register</button>
                </form>

                <div className="links">

                </div>
            </div>
        </div>
    );
}
