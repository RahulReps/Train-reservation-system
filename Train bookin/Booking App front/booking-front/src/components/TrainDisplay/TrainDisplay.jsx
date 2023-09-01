import React , { useState, useEffect  }from 'react'
import './TrainDisplay.css'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";

export default function TrainDisplay(props) {
  const [trains, setTrains] = useState([]);
  const [search, setSearch] = useState('');
  const [arrival, setArrival] = useState('');
  const [dest, setDest] = useState('');


  const location = useLocation();
  const data = location.state;
  
  useEffect(() => {
    fetch('http://localhost:8080/trains')
        .then(response => response.json())
        .then(dat => setTrains(dat))
        .catch(error => console.error('Error fetching trains:', error));
  }, [search]); 
 
  const fetchTrain = async (event) =>{
    event.preventDefault();
    if(search!=''){
      fetch(`http://localhost:8080/trains/${search}/${arrival}/${dest}`)
          .then(response => response.json())
          .then(dat => setTrains(dat))
          .catch(error => console.error('Error fetching trains:', error)); 
      }
      else{
        fetch(`http://localhost:8080/trains`)
          .then(response => response.json())
          .then(dat => setTrains(dat))
          .catch(error => console.error('Error fetching trains:', error)); 
      }
  }

  return (
    <div className='book-page'>
          <div className="search-bar">
            <form onSubmit={fetchTrain}>  
                <div className='search-input'>  
                  <input type="text" required  className='search-inp' placeholder='DD-MM-YYYY' pattern='^\d{2}-\d{2}-\d{4}$'
                  value={search} onChange={(e) => setSearch(e.target.value) }/>
                  <input type="text" required  className='search-inp' placeholder='Departure' value={arrival} 
                  onChange={(e) => setArrival(e.target.value) }/>
                  <input type="text" required  className='search-inp' placeholder='Destination' value={dest} 
                  onChange={(e) => setDest(e.target.value) }/>
                  <button type="submit" className='search-btn' >search</button>
                  <button className='clear-btn' onClick={()=>{setSearch(''); setArrival(''); setDest('')}}>clear</button>
                </div>
            </form>
        </div>
         <div className="train-cards">
            {trains.map(train => (
                <div key={train.id} className="train-card">
                    <ul>
                        <li className='trn'>{train.name}</li>
                        <li className='tra'>{train.arrival} → {train.destination}</li>
                        <li className='trd'>DATE: {train.date}</li>
                        <li className='trt'>DEPARTURE TIME: {train.time}</li>
                    </ul>
                    <div className='button-container'>
                        <Link to="/book/booking-portal" state={{"name" : data.name , "train" : train }} className='bttn'>
                          Click here to book!
                        </Link>
                    </div>
                    
                </div>
            ))}
          </div>
      </div>
  )
}