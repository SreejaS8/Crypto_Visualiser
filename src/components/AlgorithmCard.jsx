import React from 'react';
import '../styles/algorithmCard.css';

const AlgorithmCard = ({ title, illustrationType }) => {
  const getIllustration = () => {
    switch (illustrationType) {
      case 'phone':
        return (
          <div className="phone-illustration">
            <div className="hand-holding-phone">
              <div className="phone">
                <div className="message-bubble">...</div>
              </div>
            </div>
          </div>
        );
      case 'key':
        return (
          <div className="key-illustration">
            <div className="hand-with-bracelet">
              <div className="key-object"></div>
            </div>
          </div>
        );
      case 'teacher':
        return (
          <div className="teacher-illustration">
            <div className="teacher-frame">
              <div className="teacher-figure">
                <div className="teacher-hair"></div>
              </div>
            </div>
          </div>
        );
      case 'computer':
        return (
          <div className="computer-illustration">
            <div className="people-at-computer">
              <div className="person-one"></div>
              <div className="person-two"></div>
              <div className="computer-screen"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="algorithm-card">
      <div className="card-content">
        <div className="illustration-container">
          {getIllustration()}
        </div>
        <h2 className="algorithm-title">{title}</h2>
      </div>
    </div>
  );
};

export default AlgorithmCard;