import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import './Register.css'

export default function Register() {
    const navigate= useNavigate();
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault(); 
        try {
        
            const response = await fetch('http://localhost:8080/user', {
                method: "POST",
                body: JSON.stringify({ "name": name, "age" : age ,  "username" : username, "password"  : password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                 }
              });
        
            if (response.status === 200) {

                toast.success('Registered Successfully !', {
                    position: "top-center",
                    autoClose: 5000,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate("/")
                }, 5000);
            } 

            else {
                toast.error('username already taken !', {
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
                <div className="reg-form-area">
                <h1 className="reg-title">
                   Register
                </h1>
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label
                            htmlFor="text"
                            className="sub-title"
                        >
                            Name
                        </label>
                        <input
                            type="text" required
                            className="reg-form_style"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="number"
                            className="sub-title"
                        >
                            Age
                        </label>
                        <input
                            type="number" min={8} max={100} step={1} required
                            className="reg-form_style"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="username" 
                            className="sub-title"
                        >
                            Username
                        </label>
                        <input
                            type="text" id="username" maxLength={15} minLength={8}  required
                            className="reg-form_style"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label
                            htmlFor="password" required
                            className="sub-title"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            className="reg-form_style"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <div className="mt-6">
                        <button 
                        type='submit' 
                        className="btn">
                            Register
                        </button>
                    </div>
                </form>
                <p className="link-txt">
                    {" "}
                    Already have an account?{" "}
                    <a
                        href="/"
                        className="link"
                    >
                        Sign In
                    </a>
                </p>
                </div>
            </div>
        </div>
  )
}
