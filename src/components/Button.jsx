import React from 'react';
import '../styles/Button.css';

const Button = ({ label, onClick }) => {
  return (
    <button className="pixel-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;