import React from "react";
import "./Message.css";
import { IoMdDownload } from "react-icons/io";
import { LuFile } from "react-icons/lu";



const DocMessage = ({ item }) => {
  return (
    <>
      {item.incoming ? (
        <div className="messages-received">
          <div className="boxess img-box-left">
            <div className="doc-box">
                <h3><LuFile /></h3>
              <h5>this is the title of the link</h5>
              <button><IoMdDownload/></button>
            </div>
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      ) : (
        <div className="messages-sent">
          <div className="boxess img-box-right">
            <div className="doc-box">
            <h3><LuFile /></h3>
              <h5>this is the title of the link</h5>
              <button><IoMdDownload/></button>
            </div>
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DocMessage;
