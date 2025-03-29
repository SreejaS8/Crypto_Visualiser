import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/home.css';
import RSAProcess from '../components/RSAProcess';

const RSAPage = () => {
  return (
    <div className="home-container" style={{ paddingTop: '55px' }}>
      <Navbar />
      <div className="home-content">
          <RSAProcess />
      </div>
    </div>
  );
};

export default RSAPage;