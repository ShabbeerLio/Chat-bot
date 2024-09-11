import React from 'react'
import "./Message.css";

const ReplyMessage = ({item}) => {
  return (
    <>
      {item.incoming ? (
        <div className="messages-received">
          <div className="boxess img-box-left">
            <h6 className='reply'>{item.reply}</h6>
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      ) : (
        <div className="messages-sent">
          <div className="boxess img-box-right">
          <h6 className='reply'>{item.reply}</h6>
            <h5>{item.text}</h5>
            <span>{item.timestamp}</span>
          </div>
        </div>
      )}
    </>
  )
}

export default ReplyMessage
