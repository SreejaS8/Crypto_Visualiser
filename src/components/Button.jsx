import React from 'react';
import '../styles/button.css';

const Button = ({ label, onClick }) => {
  return (
    <button className="pixel-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;