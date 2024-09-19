import React from 'react'
import "./profile.css"

const ProfileInfo = ({isActive ,profileClose ,data}) => {
  return (
    <div className={`ProfileInfo ${isActive ? 'active' : ''}`}>
        <div className="profileInfo-box">
            <div className="profileinfo-image">
                <img src={data.profile_picture} alt="" />
                <h2>{data.name}</h2>
            </div>
        </div>
      this is profile
      <p onClick={profileClose}>X</p>
    </div>
  )
}

export default ProfileInfo
