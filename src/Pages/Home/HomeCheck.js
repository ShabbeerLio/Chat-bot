// In your React component (e.g., ChatBox.js)
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8000');

const ChatBox = ({ person }) => { // 'person' now represents the user you're chatting with
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server with ID:', socket.id);
      // Optionally, emit an event to identify the user to the backend
      // socket.emit('join_chat', currentUserId);
    });

    socket.on('private_message', (data) => {
      setMessages(prevMessages => [...prevMessages, { ...data, received: true }]);
    });

    return () => {
      socket.off('connect');
      socket.off('private_message');
    };
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && person?.id) { // Ensure there's a recipient
      socket.emit('private_message', {
        recipientId: person.id, // The ID of the user you're chatting with
        content: message
      });
      setMessages(prevMessages => [...prevMessages, { content: message, sent: true }]);
      setMessage('');
    } else if (!person) {
      alert('Please select a user to chat with.');
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim()) {
      sendMessage();
    }
  };

  return (
    <div className="chatbox">
      {person ? (
        <div className="chatbox-chat">
          <div className="chatbox-head">
            {/* ... display info about 'person' ... */}
            <h2>Chatting with: {person.name} ({person.id})</h2> {/* Display recipient ID for clarity */}
          </div>
          <div className="messanger-box" ref={chatWindowRef}>
            {messages.map((msg, index) => (
              <div key={index} className={msg.sent ? 'sent' : (msg.received ? 'received' : '')}>
                {msg.senderId && !msg.sent && <span>{msg.senderId}: </span>} {/* Display sender if received */}
                {msg.content}
              </div>
            ))}
          </div>
          <div className="message-box">
            <input
              type="text"
              placeholder={`Message ${person.name}`}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage}>Send</button>
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