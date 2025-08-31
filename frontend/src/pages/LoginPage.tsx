import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";



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
            navigate("/");
        }
        catch(error: any){
            alert("Login failed: " + (error.response?.data?.message || "Unknown error"));
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}} 
                /><br />
                <input 
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}} 
                /><br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}