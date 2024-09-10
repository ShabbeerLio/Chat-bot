import React from "react";
import "./Message.css";

const ImgMessage = ({ item }) => {
  return (
    <>
      {item.incoming ? (
        <div className="messages-received">
          <div className="boxess img-box-left">
            <img src={item.img} alt="" />
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      ) : (
        <div className="messages-sent">
          <div className="boxess img-box-right">
            <img src={item.img} alt="" />
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ImgMessage;
