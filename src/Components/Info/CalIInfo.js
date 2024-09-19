import React from 'react'
import "./profile.css"

const CalIInfo = ({isActive ,CallClose}) => {
  return (
    <div className={`CalIInfo ${isActive ? 'active' : ''}`}>
    this is call page
    <p onClick={CallClose}>X</p>
  </div>
  )
}

export default CalIInfo
