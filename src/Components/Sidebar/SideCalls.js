import React from 'react'
import "./Sidebar.css"
import { IoIosVideocam, IoMdCall } from "react-icons/io";
import { MdOutlineCallReceived, MdOutlineCallMade, MdOutlineCallMissed } from "react-icons/md";
import noprofile from "../../Assets/noprofile.png";


const SideCalls = ({ item, handleChatItemClick }) => {
    return (
        <div className="chatlist-item"
            key={item.id}
            onClick={() => handleChatItemClick(item)}
        >
            <div className="chatlist-item-image">
                {item.profile_picture ? (
                    <img src={item.profile_picture} alt="" />
                ) : (
                    <img src={noprofile} alt="" />
                )}
            </div>
            <div className="chatlist-item-detail">
                {item.status === "missed" ? (
                    <h4 className='red'>{item.name}</h4>
                ) : (
                    <h4>{item.name}</h4>
                )}
                <p className='call-status'>
                    {item.status === "receive" ? (
                        <MdOutlineCallReceived color='green' />
                    ) : item.status === "missed" ? (
                        <MdOutlineCallMissed className='red' />
                    ) : (
                        <MdOutlineCallMade color='green' />
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
