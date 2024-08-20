import React from 'react'

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
                <p>{item.messages.map((msg) => (msg.text))}</p>
                <span>today</span>
            </div>
        </div>
    )
}

export default SideCalls
