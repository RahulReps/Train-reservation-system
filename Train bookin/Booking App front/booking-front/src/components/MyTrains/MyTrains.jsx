import React,{ useState, useEffect  } from 'react'
import './MyTrains.css'
import { useLocation } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom'


export default function MyTrains() {
  const location = useLocation();
  const data = location.state;
  const [bookings, setBookings] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [detrain, setDeltrain] = useState({});


  useEffect(() => {
    const pasName = data.name;
    fetch(`http://localhost:8080/getmytrain/${pasName}`)
        .then(response => response.json())
        .then(data => setBookings(Array.from(data)))
        .catch(error => console.error('Error fetching trains:', error));
    }, []); 


    const handleCancel = async (id) =>{
      try {
        const response = await fetch(`http://localhost:8080/bookings/${id}`, {
            method: "DELETE",
            body: JSON.stringify({}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
             }
          });
    
        if (response.status === 200) {
          toast.success('DELETED Successfully !', {
            position: "top-center",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
          });
            setShowConfirmation(false);
            window.location.reload();
            
        } 

        else {
            toast.error('Failed to delete!', {
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
    }

    

  return (
    <>
    <ToastContainer/> 
        <div className='train-cards'>
          {bookings.map(booking => (
            <div key={booking.train.name}>
            <div className='train-card'>
                <ul key={booking.train.name}>   
                    <li className='trn'>{booking.train.name}</li>
                    <li className='tra'>{booking.train.arrival} ---{">"} {booking.train.destination}</li>
                    <li className='trd'>
                        DATE : {booking.train.date}
                    </li>  
                    <li className='trd'>
                        TIME : {booking.train.time}
                    </li>  
                    <li className='tra'>
                      SEATS BOOKED : {booking.tier}  x  {booking.numberOfTickets}
                    </li>
                    <div className='button-container'>
                        <Link to="/book/passengers" state={{"name" : data.name , "id" : booking.pnr, "trainName" : booking.train.name, "trainFrom" : booking.train.arrival, "trainTo" : booking.train.destination, "trainDate" : booking.train.date, "trainTime" : booking.train.time}} className='bttn'>
                            View Details
                        </Link>
                      <button type="button" value="Submit" className='bttn' onClick={() => {setShowConfirmation(booking); setDeltrain(booking)}} >Cancel</button>
                    </div>
                  </ul>
            </div>
            {showConfirmation && (
                  <div className="overlay">
                    <div className="confirmation-modal">
                      <h1 className='title-text'>Are you sure you want to cancel this booking?</h1>
                      <div className='display-info'>
                          <h2 className='train-name-o'>{detrain.train.name}</h2>
                          <p className='train-loc-o'>{detrain.train.arrival} ---{">"} {booking.train.destination}</p>
                          <p className='train-date-o'>
                              DATE : {detrain.train.date}
                          </p>  
                          <p className='train-time-o'>
                              TIME : {detrain.train.time}
                          </p>  
                          <p className='train-seat-o'>
                            SEATS BOOKED : {detrain.tier}  x  {detrain.numberOfTickets}
                          </p>
                      </div>
                      <button onClick={() => handleCancel(detrain.pnr)} className='confirm-button'>Confirm</button>
                      <button onClick={() => setShowConfirmation(false)} className='cancel-button'>Cancel</button>
                    </div>
                  </div>
                )}
            </div>
        ))}
    </div>
    </>
  )
}
