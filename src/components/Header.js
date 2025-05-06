import React from 'react';
import { Link } from 'react-router-dom';
import translations from '../scripts/translations.json';
import '../styles/header-fixes.css';

const Header = ({ currentLang }) => {
  return (
    <header className="header">
      <div className="container">
        
        <div className="logo">
          <img
            src="/images/logo.jpg"
            alt="Livestock Research Logo"
            className="site-logo-img"
            onError={(e) => {
              e.target.src = "/logo512.png";
            }}
          />
          <div className="logo-text">
            <h1 className={currentLang}>Livestock Research</h1>
          </div>
        </div>
        <nav className="main-nav">
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">
              {translations[currentLang]?.nav?.home || 'Home'}
            </Link></li>
            <li><a href="/#about" className="nav-link">
              {translations[currentLang]?.nav?.about || 'About'}
            </a></li>
            <li className="dropdown">
              <Link to="/#resources" className="nav-link">
                {translations[currentLang]?.nav?.resources || 'Genetic Resources'}
              </Link>
              <ul className="dropdown-menu">
                <li><Link to="/cattle">{translations[currentLang]?.animals?.cattle || 'Cattle'}</Link></li>
                <li><Link to="/goats">{translations[currentLang]?.animals?.goats || 'Goats'}</Link></li>
                <li><Link to="/sheep">{translations[currentLang]?.animals?.sheep || 'Sheep'}</Link></li>
                <li><Link to="/camels">{translations[currentLang]?.animals?.camels || 'Camels'}</Link></li>
                <li><Link to="/poultry">{translations[currentLang]?.animals?.poultry || 'Poultry'}</Link></li>
              </ul>
            </li>
            <li><Link to="/#conservation" className="nav-link">
              {translations[currentLang]?.nav?.conservation || 'Conservation'}
            </Link></li>
            <li><Link to="/#research" className="nav-link">
              {translations[currentLang]?.nav?.research || 'Research'}
            </Link></li>
            {/* <li><Link to="/#gallery" className="nav-link">
              {translations[currentLang]?.nav?.gallery || 'Gallery'}
            </Link></li> */}
            <li><Link to="/#contact" className="nav-link">
              {translations[currentLang]?.nav?.contact || 'Contact'}
            </Link></li>
          </ul>
        </nav>
        <div className="logo">
          <img
            src="/images/oman2040-light.png"
            alt="Oman 2040 Vision Logo"
            className="site-logo-img"
            onError={(e) => {
              e.target.src = "/logo512.png";
            }}
          />
        </div>
        
      </div>
    </header>
  );
};

export default Header;
