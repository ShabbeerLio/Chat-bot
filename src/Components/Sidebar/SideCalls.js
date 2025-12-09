import React from "react";
import "./Sidebar.css";
import { IoIosVideocam, IoMdCall } from "react-icons/io";
import {
    MdOutlineCallReceived,
    MdOutlineCallMade,
    MdOutlineCallMissed,
    MdClear,
} from "react-icons/md";
import noprofile from "../../Assets/noprofile.png";

const SideCalls = ({ item, handleChatItemClick, userDetail, formatTime }) => {
  const isCaller = item.caller._id === userDetail._id; // ✅ correct way
  const otherUser = isCaller ? item.receiver : item.caller; // show opposite person

//   console.log(isCaller,"isCaller")
//   console.log(otherUser,"otherUser")
  console.log(item,"item")
  return (
    <div className="chatlist-item" key={item._id}>
      <div className="chatlist-item-image">
        <img 
          src={otherUser.profilePic?.url || noprofile} 
          alt={otherUser.name} 
        />
      </div>

      <div className="chatlist-item-detail">
        <h4 className={item.status === "missed" ? "red" : ""}>
          {otherUser.name}
          <span className="calltime">{formatTime(item.startedAt)}</span>
        </h4>

        <p className="call-status">
          {item.status === "rejected" ? (
            <MdClear color="red" />
          ) : item.status === "missed" ? (
            <MdOutlineCallMissed className="red" />
          ) : isCaller ? (
            <MdOutlineCallMade color="green" />  // you initiated
          ) : (
            <MdOutlineCallReceived color="green" /> // you received
          )}

          {item.status === "missed"
            ? "Missed call"
            : item.status === "rejected"
            ? "Rejected"
            : `${Math.floor(item.durationSec / 60)}m ${
                item.durationSec % 60
              }s`}
        </p>

        <span className="call-type">
          {item.type === "audio" ? <IoMdCall /> : <IoIosVideocam />}
        </span>
      </div>
    </div>
  );
};

export default SideCalls;
