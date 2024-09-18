import React from "react";
import "./ChatBox.css";
import { IoPerson } from "react-icons/io5";
import { FaPhotoVideo } from "react-icons/fa";
import { IoIosCamera } from "react-icons/io";
import { FaFile } from "react-icons/fa6";

const MenuBox = ({isActive}) => {
  return (
    <div className={`menubox ${isActive ? 'active' : ''}`}>
      <div className="menubox-box">
        <div className="menu-card">
          <p>
            <IoPerson />
          </p>
          <h3>Contact</h3>
        </div>
        <div className="menu-card">
          <p>
            <IoIosCamera />
          </p>
          <h3>Image</h3>
        </div>
        <div className="menu-card">
          <p>
            <FaPhotoVideo />
          </p>
          <h3>Photo/Video</h3>
        </div>
        <div className="menu-card">
          <p>
            <FaFile />
          </p>
          <h3>Document</h3>
        </div>
      </div>
    </div>
  );
};

export default MenuBox;
