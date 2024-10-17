import React from 'react'
import "./Sidebar.css"
import { MdEdit, MdLogout } from "react-icons/md";
import noprofile from "../../Assets/noprofile.png";


const Setting = ({ item, handleChatItemClick }) => {
    return (
        <div className="setting">
            <div className="setting-top">
                <div className="setting-top-img">
                    {item.profile_picture ? (
                        <img src={item.profile_picture} alt="" />
                    ) : (
                        <img src={noprofile} alt="" />
                    )}
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
