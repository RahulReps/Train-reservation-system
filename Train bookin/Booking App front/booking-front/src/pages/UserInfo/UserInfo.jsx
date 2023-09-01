import React, { useEffect, useState } from 'react'
import './UserInfo.css'
import { useLocation, useNavigate } from 'react-router-dom';
export default function UserInfo() {

  const location= useLocation();
  const data=location.state;
  const [user,setUser] = useState([]);
  const [name,setName] = useState(``)
  const [age,setAge] = useState(``)
  const [existing, setExisting] = useState('');
  const [newPass, setNewPass] = useState('');
  const [verify, setVerify] = useState('');
  const navigate = useNavigate();

  const handleUserChange = async(event) =>{
    event.preventDefault();
    const response = await fetch(`http://localhost:8080/user/${data.name}`, {
      method: "PUT",
      body: JSON.stringify({ "username" : user.username , "password" : user.password, "name" : name , "age" : age }),
      headers: {
          'Content-type': 'application/json; charset=UTF-8',
       }
    });
    if (response.status === 200) {
      alert("updated successfully")
    } 

    else {
        alert("an error has occured")
    }

  }

  const handlePassChange = async(event) =>{
    let response2 = null;
    event.preventDefault();
    if(newPass===verify){
      response2 = await fetch(`http://localhost:8080/update-password/${data.name}/${existing}/${newPass}`, {
        method: "PUT",
      });
      
      if (response2.status === 200) {
        alert("updated successfully")
        setExisting("")
        setNewPass("")
        setVerify("")
      } 

      else {
          alert("an error has occured")
      }
      }

  }

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    const pasName = data.name;
    fetch(`http://localhost:8080/user/${pasName}`)
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setName(data.name);
          setAge(data.age);
        })
        .catch(error => console.error('Error fetching trains:', error));
    }, []); 


  return (
    <div>
    <div className='user-body'>
      <div className='user-cont'>
        <div className="user-form-area">
          <h4 className='change-title'>UPDATE USER INFO</h4>
          <div className="forms-container">
            <form onSubmit={handleUserChange}>
              <div className='form-group'>
                <label htmlFor='name' className='sub-title'>Name:</label>
                <input type='text' className="form_style" id='name' value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='age' className='sub-title'>Age:</label>
                <input type='number' className="form_style" id='age' value={age} onChange={(e) => setAge(e.target.value)} />
              </div>
              <button type='submit' className="btn">Submit</button>
            </form>

            <form onSubmit={handlePassChange}>
              <div className='form-group'>
                <label htmlFor='existing' className='sub-title'>Enter Existing Password:</label>
                <input type='password' className="form_style" id='existing' value={existing} onChange={(e) => setExisting(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='new' className='sub-title'>Enter New Password:</label>
                <input type='password' className="form_style" id='new' value={newPass} onChange={(e) => setNewPass(e.target.value)} />
              </div>
              <div className='form-group'>
                <label htmlFor='renew' className='sub-title'>Re-enter New Password:</label>
                <input type='password' className="form_style" id='renew' value={verify} onChange={(e) => setVerify(e.target.value)} />
              </div>
              <button type='submit' className="btn">Change</button>
            </form>
          </div>
          <button type='button' className="btn-2" onClick={handleLogout}>Log Out!</button>
        </div>
      </div>
    </div>
    <div></div>
    </div>
  )
}
