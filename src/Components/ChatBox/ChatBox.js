import React, { useState, useEffect, useRef } from "react";
import "./ChatBox.css";
import { IoSend } from "react-icons/io5";
// ... other imports ...

const ChatBox = ({ person, socket }) => {
  console.log(person,"person")
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (socket) {
      socket.on('private_message', (data) => {
        console.log('Received private message on frontend:', data); // Log received messages
        if (data.senderId === person?.id || data.senderId === socket.id || person?.id === socket.id) {
          setMessages(prevMessages => [...prevMessages, { ...data, received: data.senderId === person?.id }]);
        }
      });

      return () => {
        socket.off('private_message');
      };
    }
  }, [socket, person?.id]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && person?.id && socket) {
      const messageData = {
        recipientId: person.id,
        content: message
      };
      console.log('Sending message:', messageData); // ADDED LOG
      socket.emit('private_message', messageData);
      setMessages(prevMessages => [...prevMessages, { content: message, sent: true }]);
      setMessage("");
    } else if (!person) {
      alert("Please select a user to chat with.");
    } else if (!socket) {
      alert("Not connected to the server.");
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && message.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="chatbox">
      {person ? (
        <div className="chatbox-chat">
          <div className="chatbox-head">
            <h2>{person.name}</h2>
          </div>
          <div className="messanger-box" ref={chatWindowRef}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sent ? "sent" : (msg.received ? "received" : "")}>
                {msg.senderId && !msg.sent && <span>{/* You might want to fetch the sender's username */}</span>}
                {msg.content}
              </div>
            ))}
          </div>
          <div className="message-box">
            <input
              type="text"
              placeholder={`Message ${person.name}`}
              value={message}
              onChange={handleMessageChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>
              <IoSend />
            </button>
          </div>
        </div>
      ) : (
        <div className="chatbox-main">
          <h2>Chat</h2>
          <p>Select a user to start chatting.</p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;