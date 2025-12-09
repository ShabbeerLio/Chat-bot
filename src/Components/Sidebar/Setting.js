import React, { useContext } from "react";
import "./Sidebar.css";
import { MdEdit, MdLogout } from "react-icons/md";
import noprofile from "../../Assets/noprofile.png";
import { useNavigate } from "react-router-dom";
import NoteContext from "../../Context/NikhaContext";

const Setting = () => {
  const { userDetail } = useContext(NoteContext);
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/welcome");
  };
  return (
    <div className="setting">
      <div className="setting-top">
        <div className="setting-top-img">
          {userDetail?.profilePic?.url ? (
            <img src={userDetail?.profilePic?.url} alt="" />
          ) : (
            <img src={noprofile} alt="" />
          )}
          <MdEdit />
        </div>
      </div>
      <div className="setting-detail">
        <h2>
          {userDetail.name}
          <MdEdit />
        </h2>
        <p>
          {userDetail.email}
          <MdEdit />
        </p>
      </div>
      <div className="setting-logout">
        <p onClick={handlelogout}>
          Log Out <MdLogout />
        </p>
      </div>
    </div>
  );
};

export default Setting;
