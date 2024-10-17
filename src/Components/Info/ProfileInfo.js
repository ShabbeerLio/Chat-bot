import React from "react";
import "./profile.css";
import { IoIosVideocam, IoMdCall, IoMdArrowBack } from "react-icons/io";
import { RiArrowRightSLine } from "react-icons/ri";
import noprofile from "../../Assets/noprofile.png";

const ProfileInfo = ({ isActive, profileClose, data }) => {
  return (
    <div className={`ProfileInfo ${isActive ? "active" : ""}`}>
      <div className="profileInfo-box">
        <div className="profileinfo-image">
          {data.profile_picture ? (
            <img src={data.profile_picture} alt="" />
          ) : (
            <img src={noprofile} alt="" />
          )}
          <h2>{data.name}</h2>
          <p>{data.number}</p>
          <div className="profileinfo-call">
            <div className="profileinfo-call-card">
              <IoMdCall />
              <p>Audio</p>
            </div>
            <div className="profileinfo-call-card">
              <IoIosVideocam />
              <p>Video</p>
            </div>
          </div>
          <div className="profileinfo-back">
            <p onClick={profileClose}>
              <IoMdArrowBack />
            </p>
          </div>
        </div>
        <div className="profileinfo-gallery-box">
          <div className="profileinfo-gallery-head">
            <p>Media, link, docs</p>
            <p>
              2161 <RiArrowRightSLine />
            </p>
          </div>
          <div className="profileinfo-gallery">
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
            <img src={data.profile_picture} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
