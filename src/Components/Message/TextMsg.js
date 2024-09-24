import React from "react";
import "./Message.css";
import { CiMenuKebab } from "react-icons/ci";
import MenuItem from "../ChatBox/MenuItem";

const TextMsg = ({ item }) => {
  return (
    <>
      {item.incoming ? (
        <div className="messages-received">
          <div className="boxess">
            <p key={item.id}>
              {item.text}
              <span>{item.timestamp}</span>
              <div class="btn-group dropend">
                <button
                  type="button"
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <CiMenuKebab />
                </button>
                <MenuItem />
              </div>
            </p>
          </div>
        </div>
      ) : (
        <div className="messages-sent">
          <div className="boxess">
            <p key={item.id}>
              <div class="btn-group dropstart">
                <button
                  type="button"
                  class="btn btn-secondary dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <CiMenuKebab />
                </button>
                <MenuItem />
              </div>
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
