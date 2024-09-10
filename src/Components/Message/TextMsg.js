import React from "react";
import "./Message.css";

const TextMsg = ({ item }) => {
  return (
    <>
      {item.incoming ? (
        <div className="messages-received">
          <div className="boxess">
            <p key={item.id}>
              {item.text}
              <span>{item.timestamp}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="messages-sent">
          <div className="boxess">
            <p key={item.id}>
              {item.text}
              <span>{item.timestamp}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default TextMsg;
