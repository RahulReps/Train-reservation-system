import React from 'react'
import './HomeContent.css'
import homeImg from '../../assets/images/book-img (2).png'
import Typewriter from '../TypeEffect/Typewritter'


export default function HomeContent(props) {
  const texts = ['JOURNEY', 'TRAVEL', 'LIVES'];

  return (
    
    <>
      <div className='home-dis'>
        <img src={homeImg} alt="Home-image" className='home-img'/>
        <Typewriter className='anime'/>
      </div>
    </>
  )
}
