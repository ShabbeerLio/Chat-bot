import React from 'react'
import "./Message.css"

const Timeline = ({item}) => {
  return (
    <div className='timeline'>
      <span></span>
      <p>{item.text}</p>
      <span></span>
    </div>
  )
}

export default Timeline
