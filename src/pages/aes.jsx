import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/home.css';
import AESProcess from '../components/AESProcess';

const AESPage = () => {
  return (
    <div className="home-container" style={{ paddingTop: '55px' }}>
      <Navbar />
      <div className="home-content">
          <AESProcess />
      </div>
    </div>
  );
};

export default AESPage;