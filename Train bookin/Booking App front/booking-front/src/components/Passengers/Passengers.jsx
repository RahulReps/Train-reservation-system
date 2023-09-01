import {React, useEffect, useState} from 'react'
import './Passengers.css'
import { useLocation } from "react-router-dom";
import ticketImg from '../../assets/images/portal-ticket (2).png'

export default function Passengers() {
  const location = useLocation();
  const data = location.state;
  const [details, setDetails] = useState([]);


  useEffect( () =>{ 
    fetch(`http://localhost:8080/passengers/${data.id}`)
      .then(response => response.json())
      .then(da => setDetails(da))
      .catch(error => console.error('Error fetching passengers:', error));
    console.log(details);
  },[]); 

  return (
    <div>
      {details.map(detail => (
        <div className="container">
          <img src={ticketImg} alt="ticket image"/>
          <div className="name-text">
            <h1 className='at'>{detail.name}</h1>
          </div>
          <div className="age-text">
            <h1>{detail.age}</h1>
          </div>
          <div className="contact-text">
            <h1>{detail.contact}</h1>
          </div>
          <div className="gender-text">
            <h1>{detail.gender}</h1>
          </div>
          <div className="train-name">
            <h1 className='train-name-txt'>{data.trainName}</h1>
          </div>
          <div className="train-from">
            <h1 className='train-from-txt'>{data.trainFrom}</h1>
          </div>
          <div className="train-to">
            <h1 className='train-to-txt'>{data.trainTo}</h1>
          </div>
          <div className="train-date">
            <h1 className='train-date-txt'>{data.trainDate}</h1>
          </div>
          <div className="train-time">
            <h1 className='train-time-txt'>{data.trainTime}</h1>
          </div>
        </div>
      ))}
    </div>
  )
}
