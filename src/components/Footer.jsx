import React from 'react';
import '../styles/global.css';

/**
 * Footer component that displays a credit message with GitHub profile picture.
 * Contains a link to the GitHub profile of the creator.
 */

const Footer = () => {
  return (
    <div className="footer">
      <div className="credit">
        Made by Sreeja
        <a href="https://github.com/SreejaS8" target="_blank" rel="noopener noreferrer" className="github-link">
          <img 
            src="https://github.com/SreejaS8.png" 
            alt="Sreeja's GitHub profile" 
            className="github-avatar" 
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;