import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Home from './Home';

const socket = io('http://localhost:8000');

function HomeBox() {
  const [username, setUsername] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server with ID:', socket.id);
    });

    socket.on('online_users', (users) => {
      console.log('Received online_users:', users);
      setOnlineUsers(users);
    });

    socket.on('username_not_found', (name) => {
      alert(`Username "${name}" not found.`);
    });

    return () => {
      socket.off('connect');
      socket.off('online_users');
      socket.off('username_not_found');
    };
  }, []);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    if (username.trim()) {
      const response = await fetch('http://localhost:8000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (response.ok) {
        socket.emit('set_username', username);
        setLoggedIn(true);
      } else {
        alert(data.message || 'Failed to create user.');
      }
    } else {
      alert('Please enter a username.');
    }
  };

  const handleLogin = () => {
    if (username.trim()) {
      socket.emit('set_username', username);
      setLoggedIn(true);
    } else {
      alert('Please enter a username to login.');
    }
  };

  if (!loggedIn) {
    return (
      <div>
        <h2>Enter your username</h2>
        <form onSubmit={handleUsernameSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <button type="submit">Create User & Login</button>
          <button type="button" onClick={handleLogin}>Login with existing username</button>
        </form>
      </div>
    );
  }

  return (
    <Home onlineUsers={onlineUsers} socket={socket} />
  );
}

export default HomeBox;