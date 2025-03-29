import React, { useState } from 'react';
import '../styles/MessageInput.css';

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input-container">
      <input 
        type="text" 
        placeholder="Enter Message" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="message-input"
      />
      <button 
        className="send-button"
        onClick={handleSend}
      >
        Send
      </button>
      
      <div className="input-options">
        <div className="option-item active">Plain text 128 bits</div>
        <div className="option-item">Pre-round Transformation</div>
        <div className="option-item">Cipher text 128 bits</div>
      </div>
    </div>
  );
};

export default MessageInput;