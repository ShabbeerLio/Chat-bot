import React from 'react'

const SideContact = ({ item, handleChatItemClick }) => {
    return (
        <div className="chatlist-item"
            key={item.id}
        >
            <div className="chatlist-item-image">
                <img src={item.profile_picture} alt="" />
            </div>
            <div className="chatlist-item-detail">
                <h4>{item.name}</h4>
                <p>{item.about}</p>
            </div>
        </div>
    )
}

export default SideContact
