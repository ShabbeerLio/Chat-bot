import React, { useState } from "react";
import "./ChatBox.css";
import { IoSend } from "react-icons/io5";
import {
  IoIosVideocam,
  IoMdCall,
  IoIosInformationCircle,
} from "react-icons/io";
import { FaKeyboard } from "react-icons/fa";
import { TbPhotoVideo } from "react-icons/tb";

const ChatBox = ({ person }) => {
  const [isChatAvailable, setIsChatAvailable] = useState(true);
  const [message, setMessage] = useState("");
  const [sentMessagesList, setSentMessagesList] = useState([]);
  const [receivedMessagesList, setReceivedMessagesList] = useState([]);

  const openChat = () => {
    setIsChatAvailable(true);
  };

  console.log(isChatAvailable, openChat);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    setSentMessagesList([...sentMessagesList, message]);
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.trim() !== "") {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  return (
    <div className="chatbox">
      {person ? (
        <div className="chatbox-chat">
          <div className="chatbox-head">
            <div className="chatbox-head-detail">
              <div className="chatbox-head-item">
                <img src={person.profile_picture} alt="" />
                <h2>{person.name}</h2>
              </div>
              <div className="chatbox-head-item">
                <p>
                  <IoMdCall />
                </p>
                <p>
                  <IoIosVideocam />
                </p>
                <p>
                  <IoIosInformationCircle />
                </p>
              </div>
            </div>
          </div>
          <div className="messanger-box">
            {/* Display received messages */}
            <div className="messages-received">
              {person.messages.map((msg, index) => (
                <div className="boxess">
                  <p key={index}>
                    {msg.text}
                    <span>{msg.timestamp}</span>
                  </p>
                </div>
              ))}
            </div>

            {/* Display sent messages */}
            <div className="messages-sent">
              {sentMessagesList.map((msg, index) => (
                <div className="boxess">
                  <p key={index}>
                    {msg}
                    <span>5:00</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message box */}
          <div className="message-box">
            <div className="message-box-input">
              <FaKeyboard />
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
              />
              <TbPhotoVideo/>
            </div>
              <button onClick={sendMessage}>
                <IoSend />
              </button>
          </div>
        </div>
      ) : (
        <div className="chatbox-main">
          <h2>Chat</h2>
          <p>Send and receive messages without keeping your phone online.</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
