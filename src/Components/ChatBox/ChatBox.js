import React, { useState } from 'react';
import "./ChatBox.css";

const ChatBox = ({ person }) => {
  const [isChatAvailable, setIsChatAvailable] = useState(true);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);

  const openChat = () => {
    setIsChatAvailable(true);
  }

  console.log(isChatAvailable, openChat)

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    setMessagesList([...messagesList, message]);
    setMessage('');
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className='chatbox'>
      {person ? (
        <div className='chatbox-chat'>
          <div className="chatbox-head">
            <div className="chatbox-head-detail">
              <img src={person.profile_picture} alt="" />
              <h2>{person.name}'s Chat</h2>
            </div>
          </div>
          {/* Display messages */}
          <div className="messages-received">
            {person.messages.map((msg, index) => (
              <p key={index}>
                {msg.text}
                <span>{msg.timestamp}</span>
              </p>
            ))}
          </div>

          {/* Message box */}
          <div className="message-box">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      ) : (
        <div className='chatbox-main'>
          <h2>Chat</h2>
          <p>Send and receive messages without keeping your phone online.</p>
        </div>
      )}
    </div>
  );
}

export default ChatBox;

// import React, { useState } from 'react';
// import "./ChatBox.css";

// const ChatBox = () => {
//   const [isChatAvailable, setIsChatAvailable] = useState(true);
//   const [message, setMessage] = useState('');
//   const [messagesList, setMessagesList] = useState([]);

//   const openChat = () => {
//     // Implement logic to check if chat is available
//     // For demonstration, always open chat if available
//     setIsChatAvailable(true);
//   }

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   }

//   const sendMessage = () => {
//     // Implement logic to send message
//     console.log("Message sent:", message);
//     // Add the message to the list of messages
//     setMessagesList([...messagesList, message]);
//     // Clear message input field
//     setMessage('');
//   }

//   return (
//     <div className='chatbox'>
//       {isChatAvailable ? (
//         // Render chat interface if available
//         <div>
//           <h2>Chat is available</h2>
//           {/* Display messages */}
//           <div className="messages">
//             {messagesList.map((msg, index) => (
//               <div key={index}>{msg}</div>
//             ))}
//           </div>

//           {/* Message box */}
//           <div className="message-box">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={message}
//               onChange={handleMessageChange}
//             />
//             <button onClick={sendMessage}>Send</button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h2>Chat is not available</h2>
//           {/* Your alternative content or component goes here */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ChatBox;

