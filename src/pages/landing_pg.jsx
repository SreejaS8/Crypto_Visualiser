import React from 'react';
import '../styles/landing_pg.css';
import Button from '../components/Button';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="content-container">
        <h1 className="landing-title">
          <span className="landing-title-line">Learn Cryptography</span>
          <span className="landing-title-line">Visually</span>
        </h1>
        <Button label="Start Learning" onClick={() => console.log('Start Learning clicked')}/>
      </div>
    </div>
  );
};

export default LandingPage;