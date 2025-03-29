import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const location = useLocation();
  let pageTitle = 'ようこそ';

  if (location.pathname === '/aes') {
    pageTitle = 'AES';
  } else if (location.pathname === '/rsa') {
    pageTitle = 'RSA';
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="wavy-icon">~</span> home
        </Link>
        <div className="navbar-title">{pageTitle}</div>
      </div>
    </nav>
  );
};

export default Navbar;