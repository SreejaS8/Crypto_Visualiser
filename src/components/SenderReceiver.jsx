import React from 'react';
import '../styles/SenderReceiver.css';

const SenderReceiver = ({ message, isSuccessful }) => {
  return (
    <div className="sender-receiver-container">
      <div className="message-display">
        message ... {message}
      </div>
      
      <div className={`status-indicator ${isSuccessful ? 'successful' : ''}`}>
        {isSuccessful ? 'Successful' : 'Pending'}
      </div>
    </div>
  );
};

export default SenderReceiver;