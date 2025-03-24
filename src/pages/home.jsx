import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AlgorithmCard from '../components/AlgorithmCard';
import '../styles/home.css';

const Home = () => {
  const algorithms = [
    {
      id: 'aes',
      title: 'AES',
      illustration: 'phone',
      path: '/aes'
    },
    {
      id: 'rsa',
      title: 'RSA',
      illustration: 'key',
      path: '/rsa'
    },
    {
      id: 'hmac',
      title: 'HMAC',
      illustration: 'teacher',
      path: '/hmac'
    },
    {
      id: 'sha256',
      title: 'SHA-256',
      illustration: 'computer',
      path: '/sha256'
    }
  ];

  return (
    <div className="home-container">
      <Navbar/>
      <div className="home-content">
        <div className="welcome-section">
          <span className="tilde-icon">~</span>
          <h1 className="japanese-title">ようこそ</h1>
        </div>
        
        <div className="algorithms-grid">
          {algorithms.map((algorithm) => (
            <Link to={algorithm.path} key={algorithm.id} className="card-link">
              <AlgorithmCard 
                title={algorithm.title} 
                illustrationType={algorithm.illustration} 
              />
            </Link>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;