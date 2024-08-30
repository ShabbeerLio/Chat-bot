import React from 'react'
import "./Sidebar.css"
import { MdEdit, MdLogout } from "react-icons/md";


const Setting = ({ item, handleChatItemClick }) => {
    return (
        <div className="setting">
            <div className="setting-top">
                <div className="setting-top-img">
                    <img src={item.profile_picture} alt="" />
                    <MdEdit />
                </div>
            </div>
            <div className="setting-detail">
                <h2>{item.name}<MdEdit /></h2>
                <p>{item.status}<MdEdit /></p>
                <p>{item.number}</p>
            </div>
            <div className="setting-logout">
                <p>Log Out <MdLogout /></p>
            </div>
        </div>
    )
}

export default Setting
