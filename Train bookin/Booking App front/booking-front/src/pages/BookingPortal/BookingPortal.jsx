import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
import './BookingPortal.css'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import ticket from '../../assets/images/portal-ticket.png'

export default function BookingPortal() {
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  const[seats,setSeats] = useState(1);
  const[classes,setClasses] = useState("first_class");
  const[passengers,setPassengers] = useState([{name:'', age:'',contact:'',gender:''}])

  const handleBook = async (event) =>{
      event.preventDefault();
      
        try{
        const response = await fetch(`http://localhost:8080/user/${data.name}/bookings/${data.train.id}/class/${classes}/not/${seats}`, {
            method: "POST",
            body: JSON.stringify(passengers),
            headers: {
              "Content-Type": "application/json",
            },

          });
          if(response.ok){
            toast.success('Booked Successfull!', {
              position: "top-center",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
            });
            setPassengers([{name:'', age:'',contact:'',gender:''}]);
            setSeats(1);
            navigate(-1);
          }
          else{
            toast.error('Error', {
              position: "top-center",
              autoClose: 5000,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "light",
          });
          }
      } 
      catch(error){
        alert('An error occurred: ' + error.message);
      }
    
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
  }

  const handleFormChange = (index, event) => {
    let pass = [...passengers];
    pass[index][event.target.name] = event.target.value;
    setPassengers(pass);
  };
  
  const addField = () =>{
    let newPass = {name:'', age:'',contact:'',gender:''};
    setPassengers([...passengers,newPass]);
    setSeats(seats+1);
  }

  const removeField = (index) =>{
    let pass=[...passengers];
    pass.splice(index,1);
    setPassengers(pass);
    setSeats(seats-1);

  }

  const handleSeatsChange = (e) =>{
    setSeats(Number(e.target.value));
    const currSeats=e.target.value;
    let pass=[...passengers];
    if(currSeats<pass.length){
      pass=pass.slice(0,seats-1);
    }
    if(currSeats>pass.length){
      for(let i=0;i<currSeats-pass.length;i++){
        let newPass = {name:'', age:'',contact:'',gender:''};
        pass=[...passengers,newPass];
      }
    }
    setPassengers(pass);
    console.log(passengers)
  }

  return (
    
    <div >
        <ToastContainer/>
        <div className='display-ticket'>
          <img src={ticket} alt="" className='main-img'/>
          <div className='heading'>
          <h1> {data.train.name} </h1>
          </div>
          <div className="from">{data.train.arrival}</div>
          <div className="to">{data.train.destination}</div>
          <div className="date">{data.train.date}</div>
          <div className="time">{data.train.time}</div>
          <div className='seats'>
            <input type="number" min={1} max={10} step={1} required value={seats} onChange={(e) =>handleSeatsChange(e)} onKeyDown={(event) => {
      event.preventDefault();
    }} className='input'/>
          </div>
          <div>
          <select className='class-dd' value={classes} onChange={(e)=> setClasses(e.target.value)}>
            <option value="first_class">First class</option>
            <option value="second_class" >Second class</option>
            <option value="third_class" >Third class</option>
            <option value="chair_car" >Chair car</option>
          </select>
          </div>

          <div className="passenger">
            <form onSubmit={handleSubmit}>
              {passengers.map((input,index)=>{
                return(
                  <div key={index} className='inp-group'>
                    <input type="text" name='name' placeholder='Name' value={input.name} required onChange={event => handleFormChange(index, event)} className='passenger-inputs'/>
                    <input type="number" name='age' placeholder='Age' value={input.age} min={1} max={100} step={1} required 
                    onChange={event => handleFormChange(index, event)} className='passenger-inputs'/>
                    <input type="text" name='contact' placeholder='Contact' value={input.contact} required minLength={10} maxLength={10}
                    onChange={event => handleFormChange(index, event)} className='passenger-inputs'/>
                    <input type="text" name='gender' placeholder='Gender' value={input.gender} required onChange={event => handleFormChange(index, event)} className='passenger-inputs'/>
                    <button onClick={() =>removeField(index)} className='remove-btn'>Remove Passenger</button>
                    </div>               
                )
              })}
            </form>
          </div>
          <div className="add-btn-wrapper">
            <button onClick={addField} className='add-button'>Add Passenger</button>
          </div>
        <form onSubmit={handleBook} action='#'>
          <br/>
          <div className='button-container'><button type="submit" value="Submit" className='bttn-2'>Book Tickets</button></div>
        </form> 
        </div>
    </div>
  )
}
