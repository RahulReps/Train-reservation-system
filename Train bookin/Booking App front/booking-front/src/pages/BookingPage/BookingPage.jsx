import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useLocation } from "react-router-dom";

export default function BookingPage() {
  const location = useLocation();
  const data = location.state;
  

  return (
      <>
        <Header name={data.name}/> 
      </>
  )
}
