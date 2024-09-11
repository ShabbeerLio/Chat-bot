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
import Typing from "../Loader/Typing";
import Timeline from "../Message/Timeline";
import TextMsg from "../Message/TextMsg";
import ImgMessage from "../Message/ImgMessage";
import ReplyMessage from "../Message/ReplyMessage";
import LinkMessage from "../Message/LinkMessage";
import DocMessage from "../Message/DocMessage";

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
            {person.messages.map((msg, index) => {
              switch (msg.type) {
                case "divider":
                  // timeline
                  return <Timeline item={msg} />;
                case "msg":
                  switch (msg.subtype) {
                    case "img":
                      // image msg
                      return <ImgMessage item={msg} />;
                    case "doc":
                      // doc msg
                      return <DocMessage item={msg} />;
                    case "link":
                      // link msg
                      return <LinkMessage item={msg} />;
                    case "reply":
                      // reply msg
                      return <ReplyMessage item={msg} />;

                    default:
                      // text msg
                      return <TextMsg item={msg} />;
                  }
                  break;

                default:
                  return <></>;
                  break;
              }
            })}
            <Typing />
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
              <TbPhotoVideo />
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
