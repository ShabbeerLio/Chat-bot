import React from "react";

const Sidebar = ({ item, handleChatItemClick }) => {
  return (
    <div
      className="chatlist-item"
      key={item.id}
      onClick={() => handleChatItemClick(item)}
    >
      {item.online ? (
        <div className="chatlist-item-image">
          <img src={item.profile_picture} alt="" />
          <span></span>
        </div>
      ) : (
        <div className="chatlist-item-image">
          <img src={item.profile_picture} alt="" />
        </div>
      )}
      {item.messages[item.messages.length - 1]?.incoming ? (
        <div className="chatlist-item-detail">
          <h4>{item.name}</h4>
          <p>{item.messages[item.messages.length - 1]?.text}</p>
        </div>
      ) : (
        <div className="chatlist-item-detail">
          <h4>{item.name}</h4>
          <p>You: {item.messages[item.messages.length - 1]?.text}</p>
        </div>
      )}

      {item.unread ? (
        <div className="chatlist-item-notic-true">
          <p>today</p>
          <span>{item.unread}</span>
        </div>
      ) : (
        <div className="chatlist-item-notic">
          <p>today</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
