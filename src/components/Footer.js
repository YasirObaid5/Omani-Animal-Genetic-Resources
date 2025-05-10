import React from 'react';
import { Link } from 'react-router-dom';
import translations from '../scripts/translations.json'; // Assuming translations.json is in scripts folder relative to src

function Footer({ currentLang }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/arabic_image_0.jpg" alt="Logo" className="footer-logo-img" />
            <div className="footer-logo-text">
              <h3 className={currentLang}>{translations[currentLang].nav?.title || 'Omani Animal Genetic Resources'}</h3>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-links-column">
              <h4 className={currentLang}>{translations[currentLang].footer?.quickLinks || 'Quick Links'}</h4>
              <ul>
                {translations[currentLang].nav && Object.entries(translations[currentLang].nav)
                  .filter(([key, value]) => key !== 'gallery' && key !== 'title') // Exclude 'title' as it's not a link
                  .map(([key, value]) => (
                    <li key={key}><a href={`#${key}`}>{value}</a></li>
                  ))}
              </ul>
            </div>
            <div className="footer-links-column">
              <h4 className={currentLang}>{translations[currentLang].footer?.resources || 'Resources'}</h4>
              <ul>
                {translations[currentLang].animals && Object.entries(translations[currentLang].animals).map(([key, value]) => (
                  <li key={key}><Link to={`/${key}`}>{value}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom" dir="auto">
        <p className={`copyright ${currentLang}`}>{translations[currentLang].footer?.copyright || '© 2025 Genetic Resources of Omani Domesticated Animals. All Rights Reserved.'}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;