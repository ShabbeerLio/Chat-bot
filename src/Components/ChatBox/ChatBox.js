import React, { useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import { IoSend } from "react-icons/io5";
import {
  IoIosVideocam,
  IoMdCall,
  IoIosInformationCircle,
  IoMdSearch,
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
import MenuBox from "./MenuBox";
import ProfileInfo from "../Info/ProfileInfo";
import CalIInfo from "../Info/CalIInfo";
import Search from "../Search/Search";

const ChatBox = ({ person }) => {
  const [isChatAvailable, setIsChatAvailable] = useState(true);
  const [message, setMessage] = useState("");
  const [sentMessagesList, setSentMessagesList] = useState([]);

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

  const [menu, setMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const [call, setCall] = useState(false);
  const menuRef = useRef(null);

  const menuOpen = () => {
    setMenu((prevMenu) => !prevMenu);
  };
  const profileOpen = () => {
    setProfile((prevProfile) => !prevProfile);
  };
  const callOpen = () => {
    setCall((prevCall) => !prevCall);
  };
  const profileClose = () => {
    setProfile(false);
  };
  const callClose = () => {
    setCall(false);
  };

  // Close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false); // Close the menu when clicking outside
      }
    };

    // Add event listener to detect clicks
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="chatbox">
      {person ? (
        <>
          <div className="chatbox-chat">
            <div className="chatbox-head">
              <div className="chatbox-head-detail">
                <div className="chatbox-head-item" onClick={profileOpen}>
                  <img src={person.profile_picture} alt="" />
                  <h2>{person.name}</h2>
                </div>
                <div className="chatbox-head-item">
                  <Search />
                  <p>
                    <IoMdCall onClick={callOpen} />
                  </p>
                  <p>
                    <IoIosVideocam onClick={callOpen} />
                  </p>
                  <p>
                    <IoIosInformationCircle onClick={profileOpen} />
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
                <TbPhotoVideo onClick={menuOpen} />
              </div>
              <MenuBox isActive={menu} ref={menuRef} />
              <button onClick={sendMessage}>
                <IoSend />
              </button>
            </div>
          </div>
          <ProfileInfo
            isActive={profile}
            profileClose={profileClose}
            data={person}
          />
          <CalIInfo isActive={call} CallClose={callClose} data={person} />
          {/* <SearchBox isActive={search} searchClose={searchClose} data={person}/> */}
        </>
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
