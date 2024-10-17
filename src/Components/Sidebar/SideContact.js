import React from 'react'
import noprofile from "../../Assets/noprofile.png";

const SideContact = ({ item, handleChatItemClick }) => {
    return (
        <div className="chatlist-item"
            key={item.id}
        >
            <div className="chatlist-item-image">
                {item.profile_picture ? (
                    <img src={item.profile_picture} alt="" />
                ) : (
                    <img src={noprofile} alt="" />
                )}
            </div>
            <div className="chatlist-item-detail">
                <h4>{item.name}</h4>
                <p>{item.about}</p>
            </div>
        </div>
    )
}

export default SideContact
