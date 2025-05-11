import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import translations from '../scripts/translations.json'; // Assuming translations.json is in scripts folder relative to src

function Footer({ currentLang }) {
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Check if we're on a livestock page
  const isLivestockPage = currentPath.match(/^\/(cattle|goats|sheep|camels|poultry)/);
  // Extract the animal type (cattle, goats, etc.)
  const animalType = isLivestockPage ? currentPath.substring(1) : '';
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
                  .map(([key, value]) => {
                    if (key === 'about' || key === 'resources') {
                      // These sections exist on current page, use local links
                      return <li key={key}><a href={`#${key}`}>{value}</a></li>;
                    } else if (key === 'home') {
                      // Home link should go to the root
                      return <li key={key}><a href={`/`}>{value}</a></li>;
                    } else if (key === 'conservation' && isLivestockPage) {
                      // For Conservation section on livestock pages
                      // Determine IDs based on animal type
                      let conservationId;
                      if (animalType === 'cattle') {
                        conservationId = `${animalType}-conservation`; // #cattle-conservation
                      } else if (animalType === 'goats') {
                        conservationId = 'goat-conservation'; // #goat-conservation
                      } else {
                        conservationId = 'conservation'; // #conservation (sheep, camels, poultry)
                      }
                      return <li key={key}><a href={`#${conservationId}`}>{value}</a></li>;
                    } else if (key === 'research' && isLivestockPage) {
                      // For Research section on livestock pages
                      let researchId;
                      if (animalType === 'cattle') {
                        researchId = `${animalType}-research`; // #cattle-research
                      } else {
                        researchId = 'research'; // #research (goats, sheep, camels, poultry)
                      }
                      return <li key={key}><a href={`#${researchId}`}>{value}</a></li>;
                    } else if (key === 'contact') {
                      // Contact link always goes to the home page contact section
                      // Using just /?#contact or /#contact to navigate to home page first, then to contact section
                      return <li key={key}><Link to="/" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/#contact';
                      }}>{value}</Link></li>;
                    } else {
                      // Default case for other links
                      return <li key={key}><a href={`/#${key}`}>{value}</a></li>;
                    }
                  })}
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
