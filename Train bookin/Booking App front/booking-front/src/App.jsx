import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import BookingPage from './pages/BookingPage/BookingPage'
import TrainDisplay from './components/TrainDisplay/TrainDisplay'
import HomeContent from './components/HomeContent/HomeContent'
import MyTrains from './components/MyTrains/MyTrains'
import BookingPortal from './pages/BookingPortal/BookingPortal'
import UserInfo from './pages/UserInfo/UserInfo'
import Passengers from './components/Passengers/Passengers'
function App() {

  return (
    <Routes>
      <Route exact path='/' element={<Login/>}/> 
      <Route path='/register' element={<Register/>}/>
      <Route path='/book' element={<BookingPage/>} >          
        <Route path='' element={<HomeContent/>}/>  
        <Route path='book-train' element={<TrainDisplay/>}/>  
        <Route path='booking-portal' element={<BookingPortal/>}/>
        <Route path='my-train' element={<MyTrains/>}/>
        <Route path='user-info' element={<UserInfo/>}/>
        <Route path='passengers' element={<Passengers/>}/>
      </Route>
    </Routes>
  )
}

export default App
