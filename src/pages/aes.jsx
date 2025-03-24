// pages/aes.jsx
import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import SenderReceiver from '../components/SenderReceiver';
import AESProcess from '../components/AESProcess';
import '../styles/aes.css';

const AESPage = () => {
  return (
    <div className="aes-page">
      <Navbar />
      <div className="aes-content">
        <div className="aes-title">
          <span className="tilde-icon">~</span>
          <h1 className="aes-header">AES</h1>
        </div>
        
        <SenderReceiver />
        <AESProcess />
      </div>
      <Footer />
    </div>
  );
};

export default AESPage;