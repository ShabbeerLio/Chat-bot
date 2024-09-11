import { Link } from "react-router-dom";
import React from "react";
import "./Message.css";

const LinkMessage = ({ item }) => {
  return (
    <>
      {item.incoming ? (
        <div className="messages-received">
          <div className="boxess img-box-left">
            <div className="link-box">
              <img className="link" src={item.link} alt="" />
              <h5>this is the title of the link</h5>
            </div>
            <Link to={"link"}>this is link</Link>
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      ) : (
        <div className="messages-sent">
          <div className="boxess img-box-right">
            <div className="link-box">
              <img className="link" src={item.link} alt="" />
              <h5>this is the title of the link</h5>
            </div>
            <Link to={"link"}>this is link</Link>
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default LinkMessage;
