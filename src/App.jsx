import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landing_pg';
import Home from './pages/home';
import AESPage from './pages/aes';
import Footer from './components/Footer';
import './styles/global.css';

function App() {
  /**
   * Component for placeholder pages that includes the Footer
   * 
   * @param {String} text The text to be displayed on the placeholder page
   * @returns {JSX.Element} The JSX element for the placeholder page
   */
  const PlaceholderPage = ({ text }) => (
    <div className="placeholder-container">
      <div className="placeholder-page">{text}</div>
      <Footer />
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aes" element={<AESPage />} />
        <Route path="/rsa" element={<PlaceholderPage text="RSA Page (Coming Soon)" />} />
        <Route path="/hmac" element={<PlaceholderPage text="HMAC Page (Coming Soon)" />} />
        <Route path="/sha256" element={<PlaceholderPage text="SHA-256 Page (Coming Soon)" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;