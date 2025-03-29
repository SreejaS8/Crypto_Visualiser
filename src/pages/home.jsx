import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import AlgorithmCard from '../components/AlgorithmCard';
import '../styles/home.css';

const Home = () => {
  const algorithms = [
    {
      id: 'aes',
      title: 'AES',
      illustration: 'phone',
      path: '/aes',
    },
    {
      id: 'rsa',
      title: 'RSA',
      illustration: 'key',
      path: '/rsa',
    },
  ];

  return (
    <div className="home-container" style={{ paddingTop: '55px' }}> {/* Add padding to avoid overlap */}
      <Navbar />
      <div className="home-content">
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
    </div>
  );
};

export default Home;