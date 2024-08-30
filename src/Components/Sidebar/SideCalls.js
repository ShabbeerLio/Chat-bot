import React from 'react'
import "./Sidebar.css"
import { IoIosVideocam, IoMdCall } from "react-icons/io";
import { MdOutlineCallReceived, MdOutlineCallMade, MdOutlineCallMissed } from "react-icons/md";


const SideCalls = ({ item, handleChatItemClick }) => {
    return (
        <div className="chatlist-item"
            key={item.id}
            onClick={() => handleChatItemClick(item)}
        >
            <div className="chatlist-item-image">
                <img src={item.profile_picture} alt="" />
            </div>
            <div className="chatlist-item-detail">
                <h4>{item.name}</h4>
                <p className='call-status'>
                    {item.status === "receive" ? (
                        <MdOutlineCallReceived color='green'/>
                    ) : item.status === "missed" ? (
                        <MdOutlineCallMissed color='red'/>
                    ) : (
                        <MdOutlineCallMade color='green'/>
                    )}{item.callStatus}
                </p>
                <span className='call-type'>{item.callType == "call" ? (
                    <IoMdCall />
                ) : (
                    <IoIosVideocam />
                )}</span>
            </div>
        </div>
    )
}

export default SideCalls
