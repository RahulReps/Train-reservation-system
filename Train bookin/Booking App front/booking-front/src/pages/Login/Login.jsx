import './Login.css'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const navigate=useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = async () => {
        
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: "POST",
                body: JSON.stringify({ "username" : username, "password"  : password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                 }
              });
        
            if (response.ok) {
                const data = { name : username };
                navigate('/book',{state: data});
              
            } 
            else {
                toast.error('Invalid Credentials !', {
                    position: "top-center",
                    autoClose: 5000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
            }
          } catch (error) {
            alert('An error occurred: ' + error.message);
          }
    };
    
  return (
    <div className="user-body">
        <ToastContainer/>
        <div className="user-cont">
            <div className="log-form-area">
                <h1 className="log-title">
                   Sign in
                </h1>
                <form onSubmit={handleLogin} action='#'>
                    <div className="form-group">
                        <label
                            htmlFor="text"
                            className="sub-title"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            className="log-form_style"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}

                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="password"
                            className="sub-title"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="log-form_style"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}        
                        />
                    </div>
                    <div className="mt-6">
                        <button className="btn" type='submit'>
                            Login
                        </button>
                    </div>
                </form>
                
                <p className="link-txt">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="link">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    </div>
  )
}
