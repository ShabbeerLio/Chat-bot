import React from 'react'
import "./profile.css"
import { IoIosVideocam, IoMdCall ,IoMdArrowBack} from "react-icons/io";

const CalIInfo = ({isActive ,CallClose}) => {
  return (
    <div className={`CalIInfo ${isActive ? 'active' : ''}`}>
      <div className="profileinfo-back">
          <p onClick={CallClose}><IoMdArrowBack/></p>
          </div>
  </div>
  )
}

export default CalIInfo
