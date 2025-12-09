import React, { useContext, useEffect, useState } from "react";
import noprofile from "../../Assets/noprofile.png";
import { Check, CheckCheck, ChevronLeft, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";
import defaultimg from "../../Assets/login.png";

const Sidebar = ({ item, handleChatItemClick, formatTime }) => {
  // console.log(item, "item");

  const receiver = item;
  const lastMsg = item?.lastMessage;
  const isMine = lastMsg?.sentByMe;
  const isSeen = lastMsg?.isSeen;
  // console.log(receiver,"receiver")

  return (
    <div
      className="chatlist-item"
      key={receiver._id}
      onClick={() => handleChatItemClick(receiver)}
    >
      {item.online ? (
        <div className="chatlist-item-image">
          {receiver?.profilePic?.url ? (
            <img
              src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          ) : (
            <img src={noprofile} alt="" />
          )}
          <span></span>
        </div>
      ) : (
        <div className="chatlist-item-image">
          {receiver.profilePic?.url ? (
            <img
              src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e?q=80&w=2090&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          ) : (
            <img src={noprofile} alt="" />
          )}
        </div>
      )}
      <div className="chatlist-item-detail">
        <h4>{receiver.name || receiver.name}</h4>{" "}
        <p className={`last-message ${!isSeen ? "seen" : ""}`}>
          {lastMsg ? (
            <>
              {isMine && (
                <span className={`msg-status ${isSeen ? "seen" : "sent"}`}>
                  {isSeen ? <CheckCheck /> : <Check />}
                </span>
              )}{" "}
              {lastMsg.content}
            </>
          ) : (
            "Tap to start chatting..."
          )}
        </p>
      </div>

      <div className="chat-time">
        {formatTime(receiver.lastMessage?.createdAt)}
      </div>
    </div>
  );
};

export default Sidebar;
