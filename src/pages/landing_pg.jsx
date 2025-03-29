import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/landing_pg.css';
import Button from '../components/Button';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/home');
  };

  return (
    <div className="landing-page">
      <div className="content-container">
        <h1 className="landing-title">
          <span className="landing-title-line">Learn</span>
          <span className="landing-title-line">Cryptography</span>
          <span className="landing-title-line">Visually</span>
        </h1>
        <Button label="Start Learning" onClick={handleStartLearning} />
      </div>
    </div>
  );
};

export default LandingPage;