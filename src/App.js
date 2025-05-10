import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './styles/consolidated-main.css';
import './styles/consolidated-fixes.css';

// Import components
import CattlePage from './components/CattlePage';
import GoatsPage from './components/GoatsPage';
import SheepPage from './components/SheepPage';
import CamelsPage from './components/CamelsPage';
import PoultryPage from './components/PoultryPage';
import Footer from './components/Footer'; 

// Import translations
import translations from './scripts/translations.json';

// Main App Component
function App() {
  const [currentLang, setCurrentLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    setCurrentLang(savedLang);
    applyLanguageSettings(savedLang);
    
    // Add translation prevention attribute
    document.documentElement.className = 'notranslate';
    
    // Set specific meta tags to prevent browser translation
    const metaGoogle = document.createElement('meta');
    metaGoogle.name = 'google';
    metaGoogle.content = 'notranslate';
    document.head.appendChild(metaGoogle);
    
    // Set content language meta dynamically
    const metaContentLang = document.createElement('meta');
    metaContentLang.httpEquiv = 'Content-Language';
    metaContentLang.content = savedLang;
    document.head.appendChild(metaContentLang);
  }, []);

  // Separate function to apply language settings - this will be reusable
  const applyLanguageSettings = (lang) => {
    // Update document properties
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // Update meta tag
    const metaContentLang = document.querySelector('meta[http-equiv="Content-Language"]');
    if (metaContentLang) {
      metaContentLang.content = lang;
    }
    
    // Add CSS classes to control language display instead of using inline styles
    document.body.classList.remove('lang-en', 'lang-ar');
    document.body.classList.add(`lang-${lang}`);
    
    // Refresh display of elements by toggling a class that forces a repaint
    document.body.classList.add('language-transition');
    setTimeout(() => {
      document.body.classList.remove('language-transition');
    }, 50);
  };

  const switchLanguage = (lang) => {
    // If we're trying to switch to the current language, add a special class
    // to force a refresh of the content display
    if (currentLang === lang) {
      document.body.classList.add('language-refresh');
      setTimeout(() => {
        document.body.classList.remove('language-refresh');
      }, 50);
    }
    
    setCurrentLang(lang);
    localStorage.setItem('preferredLanguage', lang);
    applyLanguageSettings(lang);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={<HomePage 
              currentLang={currentLang} 
              switchLanguage={switchLanguage}
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
            />} 
          />
          <Route 
            path="/cattle" 
            element={<CattlePage currentLang={currentLang} switchLanguage={switchLanguage} />} 
          />
          <Route 
            path="/goats" 
            element={<GoatsPage currentLang={currentLang} switchLanguage={switchLanguage} />} 
          />
          <Route 
            path="/sheep" 
            element={<SheepPage currentLang={currentLang} switchLanguage={switchLanguage} />} 
          />
          <Route 
            path="/camels" 
            element={<CamelsPage currentLang={currentLang} switchLanguage={switchLanguage} />} 
          />
          <Route 
            path="/poultry" 
            element={<PoultryPage currentLang={currentLang} switchLanguage={switchLanguage} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

// HomePage Component
function HomePage({ currentLang, switchLanguage, menuOpen, setMenuOpen }) {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    // Handle stats animations when component loads
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count') || '0');
          let current = 0;
          const increment = target / 50;
          const duration = 2000;
          const stepTime = duration / 50;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = Math.floor(current).toString();
          }, stepTime);
        }
      });
    }, { threshold: 0.1 });

    statNumbers.forEach(stat => {
      observer.observe(stat);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div id="app">
      <LanguageSwitcher currentLang={currentLang} switchLanguage={switchLanguage} />
      <Header 
        currentLang={currentLang} 
        menuOpen={menuOpen} 
        toggleMenu={toggleMenu} 
      />
      
      <HeroSection currentLang={currentLang} />
      <AboutSection currentLang={currentLang} />
      <ResourcesSection currentLang={currentLang} />
      <ConservationSection currentLang={currentLang} />
      <ResearchSection currentLang={currentLang} />
      {/* <GallerySection currentLang={currentLang} /> */}
      <ContactSection currentLang={currentLang} />
      <Footer currentLang={currentLang} /> {/* Use the imported Footer component */}
    </div>
  );
}

// LanguageSwitcher Component
function LanguageSwitcher({ currentLang, switchLanguage }) {
  // Detect if we're on a 1366x768 resolution - this is a direct JavaScript fix
  const is1366Resolution = window.innerWidth === 1366 || 
                         (window.innerWidth >= 1365 && window.innerWidth <= 1367);
  
  // Create inline styles for that specific resolution
  const languageSwitcherStyle = is1366Resolution ? {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '120px',
    width: 'auto',
    backgroundColor: 'rgba(42, 95, 126, 0.9)',
    overflow: 'visible',
    padding: '0'
  } : {};
  
  const langBtnStyle = is1366Resolution ? {
    display: 'block',
    width: '100%',
    minWidth: '0',
    textAlign: 'center',
    margin: '0',
    padding: '12px 20px',
    fontSize: '1rem',
    color: 'white'
  } : {};
  
  const firstBtnStyle = is1366Resolution ? {
    ...langBtnStyle,
    marginBottom: '1px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '8px 8px 0 0'
  } : langBtnStyle;
  
  const secondBtnStyle = is1366Resolution ? {
    ...langBtnStyle,
    borderRadius: '0 0 8px 8px'
  } : langBtnStyle;

  return (
    <div className="language-switcher" style={languageSwitcherStyle} data-resolution={is1366Resolution ? '1366' : 'other'}>
      <button 
        className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`} 
        onClick={() => switchLanguage('en')}
        style={firstBtnStyle}
      >
        English
      </button>
      <button 
        className={`lang-btn ${currentLang === 'ar' ? 'active' : ''}`} 
        onClick={() => switchLanguage('ar')}
        style={secondBtnStyle}
      >
        العربية
      </button>
    </div>
  );
}

// Header Component
function Header({ currentLang, menuOpen, toggleMenu }) {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <img
            src="/images/logo.jpg"
            alt="Genetic Resources of Omani Domesticated Animals Logo"
            className="site-logo-img"
            onError={(e) => {
              e.target.src = "/logo512.png";
            }}
          />
        </div>
        <nav className="main-nav">
          <button 
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
          <ul className={`nav-list ${menuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="nav-link">{translations[currentLang].nav?.home || 'Home'}</a></li>
            <li><a href="#about" className="nav-link">{translations[currentLang].nav?.about || 'About'}</a></li>
            <li className="dropdown">
              <a href="#resources" className="nav-link">{translations[currentLang].nav?.resources || 'Genetic Resources'}</a>
              <ul className="dropdown-menu">
                <li><Link to="/cattle">{translations[currentLang].animals?.cattle || 'Cattle'}</Link></li>
                <li><Link to="/goats">{translations[currentLang].animals?.goats || 'Goats'}</Link></li>
                <li><Link to="/sheep">{translations[currentLang].animals?.sheep || 'Sheep'}</Link></li>
                <li><Link to="/camels">{translations[currentLang].animals?.camels || 'Camels'}</Link></li>
                <li><Link to="/poultry">{translations[currentLang].animals?.poultry || 'Poultry'}</Link></li>
              </ul>
            </li>
            <li><a href="#conservation" className="nav-link">{translations[currentLang].nav?.conservation || 'Conservation'}</a></li>
            <li><a href="#research" className="nav-link">{translations[currentLang].nav?.research || 'Research'}</a></li>
            {/* <li><a href="#gallery" className="nav-link">{translations[currentLang].nav?.gallery || 'Gallery'}</a></li> */}
            <li><a href="#contact" className="nav-link">{translations[currentLang].nav?.contact || 'Contact'}</a></li>
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
}

// HeroSection Component
function HeroSection({ currentLang }) {
  return (
    <section id="home" className="hero"
    style={{
      background: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(245, 240, 230, 0.1)), url(/images/banner_1.jpeg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    >
      <div className="hero-content">
        <div style={{
          backgroundColor: 'rgba(0, 0, 0, 0.35)', 
          padding: '20px 30px',
          borderRadius: '8px',
          backdropFilter: 'blur(2px)',
          margin: '0 auto 20px auto',
          maxWidth: '90%'
        }}>
          <h1 className={`hero-title ${currentLang}`}>{translations[currentLang].hero?.title || 'Genetic Resources of Omani Domesticated Animals'}</h1>
          <p className={`hero-subtitle ${currentLang}`}>{translations[currentLang].hero?.subtitle || 'Preserving Oman\'s rich livestock heritage for future generations'}</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <a href="#resources" className={`cta-button ${currentLang}`}>{translations[currentLang].hero?.cta || 'Explore Resources'}</a>
        </div>
      </div>
      <div className="hero-background">
        <div className="particles-container"></div>
      </div>
    </section>
  );
}

// AboutSection Component
function AboutSection({ currentLang }) {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${currentLang}`}>{translations[currentLang].about?.title || 'About Genetic Resources of Omani Domesticated Animals'}</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p className={currentLang}>{translations[currentLang].about?.content || 'Default content...'}</p>
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number" data-count="2">0</div>
                <div className={`stat-label ${currentLang}`}>{translations[currentLang].animals?.cattle || 'Cattle Breeds'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-count="6">0</div>
                <div className={`stat-label ${currentLang}`}>{translations[currentLang].animals?.goats || 'Goat Breeds'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-count="2">0</div>
                <div className={`stat-label ${currentLang}`}>{translations[currentLang].animals?.sheep || 'Sheep Breeds'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-count="1">0</div>
                <div className={`stat-label ${currentLang}`}>{translations[currentLang].animals?.camels || 'Camel Breeds'}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" data-count="3">0</div>
                <div className={`stat-label ${currentLang}`}>{translations[currentLang].animals?.poultry || 'Poultry Breeds'}</div>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="/images/arabic_image_0.jpg"
              alt="Omani Livestock"
              className="featured-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ResourcesSection Component
function ResourcesSection({ currentLang }) {
  const resourceData = [
    {
      id: 'cattle',
      link: '/cattle',
      image: '/images/arabic_image_9.png',
      description: currentLang === 'en' ? 
        'Oman has two genetically distinct indigenous cattle breeds: North of Oman Cattle (Al-Batinah Cattle)h and South of Oman Cattle (Dhofari Cattle) .' :
        'تمتلك عمان سلالتين متميزتين وراثيًا من الأبقار المحلية: أبقار شمال عمان (أبقار الباطنة) وأبقار جنوب عمان (أبقار ظفار).'
    },
    {
      id: 'goats',
      link: '/goats',
      image: '/images/arabic_image_51.png',
      description: currentLang === 'en' ? 
        'Goats constitute the most numerous livestock species in Oman, with six genetically distinct breeds adapted to different ecological zones.' :
        'تشكل الماعز أكثر أنواع الماشية عددًا في عمان، مع ست سلالات متميزة وراثيًا متكيفة مع مناطق بيئية مختلفة.'
    },
    {
      id: 'sheep',
      link: '/sheep',
      image: '/images/Northern_Omani_Sheep.png',
      description: currentLang === 'en' ? 
        'Sheep are represented by two main breeds: the Northern Omani sheep and the less numerous Dhofari sheep.' :
        'تتمثل الضأن في سلالتين رئيسيتين: الأغنام العمانية الشمالية والأغنام الظفارية الأقل عددًا.'
    },
    {
      id: 'camels',
      link: '/camels',
      image: '/images/camel0.png',
      description: currentLang === 'en' ? 
        'The Omani camel herd consists of the single-humped Arabian camel, with distinct colour and characteristics depending on the geographical region. Omani camels have maintained their distinctive features and characteristics thanks to the restrictions imposed by camel breeders on camel breeding, which were recently imposed by legislation.' :
        'يتكون قطيع الإبل العمانية من الجمل العربي ذو السنام الواحد مع وجود تمايزات في اللون والخصائص حسب المنطقة الجغرافية، وقد حافظت الإبل العمانية على سماتها وخصائصها المميزة بفضل القيود التي فرضها المربون على تربية الإبل، والتي فُرضت مؤخرًا بموجب التشريعات.'
    },
    {
      id: 'poultry',
      link: '/poultry',
      image: '/images/arabic_image_25.png',
      description: currentLang === 'en' ? 
        'Indigenous poultry includes three genetically distinct chicken lines adapted to different local conditions.' :
        'تشمل الدواجن المحلية في عمان ثلاث سلالات دجاج متميزة وراثيًا متكيفة مع الظروف المحلية المختلفة.'
    }
  ];

  return (
    <section id="resources" className="resources">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${currentLang}`}>{translations[currentLang].resources?.title || 'Genetic Resources'}</h2>
          <p className={`section-subtitle ${currentLang}`}>{translations[currentLang].resources?.subtitle || 'Discover Oman\'s diverse indigenous livestock breeds'}</p>
        </div>
        <div className="resources-grid">
          {resourceData.map(resource => (
            <div key={resource.id} className="resource-card" id={resource.id}>
              <div className="card-image">
                <img src={resource.image} alt={translations[currentLang].animals?.[resource.id] || resource.id} />
              </div>
              <div className="card-content">
                <h3 className={`card-title ${currentLang}`}>{translations[currentLang].animals?.[resource.id] || resource.id}</h3>
                <p className={`card-description ${currentLang}`}>{resource.description}</p>
                <Link to={resource.link} className={`card-link ${currentLang}`}>
                  {translations[currentLang].resources?.learnMore || 'Learn More'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ConservationSection Component
function ConservationSection({ currentLang }) {
  return (
    <section id="conservation" className="conservation">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${currentLang}`}>{translations[currentLang].conservation?.title || 'Conservation Efforts'}</h2>
          <p className={`section-subtitle ${currentLang}`}>{translations[currentLang].conservation?.subtitle || 'Protecting Oman\'s valuable genetic heritage'}</p>
        </div>
        <div className="conservation-content">
          <div className="timeline">
            {translations[currentLang].conservation?.timeline && Object.entries(translations[currentLang].conservation.timeline).map(([key, value]) => (
              <div key={key} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <h3 className={currentLang}>{value.title}</h3>
                  <p className={currentLang}>{value.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ResearchSection Component with Tabs
function ResearchSection({ currentLang }) {
  const [activeTab, setActiveTab] = useState('genetic');

  return (
    <section id="research" className="research">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${currentLang}`}>{translations[currentLang].research?.title || 'Research & Development'}</h2>
        </div>
        <div className="tabs-container">
          <div className="tabs">
            {translations[currentLang].research?.tabs && Object.keys(translations[currentLang].research.tabs).map(tabKey => (
              <button
                key={tabKey}
                className={`tab-btn ${activeTab === tabKey ? 'active' : ''}`}
                onClick={() => setActiveTab(tabKey)}
              >
                {translations[currentLang].research.tabs[tabKey].title}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {translations[currentLang].research?.tabs && Object.entries(translations[currentLang].research.tabs).map(([tabKey, tabData]) => (
              <div
                key={tabKey}
                className={`tab-pane ${activeTab === tabKey ? 'active' : ''}`}
                id={tabKey}
              >
                <div className="tab-pane-content">
                  <div className="tab-text">
                    <h3 className={currentLang}>{tabData.heading}</h3>
                    <p className={currentLang}>{tabData.content}</p>
                  </div>
                  <div className="tab-image">
                    <img
                      src={`/images/arabic_image_${tabKey === 'genetic' ? '40' : tabKey === 'breeding' ? '53' : '14'}.png`}
                      alt={tabData.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ContactSection Component
function ContactSection({ currentLang }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus('');
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className={`section-title ${currentLang}`}>{translations[currentLang].contact?.title || 'Contact Us'}</h2>
        </div>
        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              {translations[currentLang].contact?.form && Object.entries(translations[currentLang].contact.form).slice(0, 4).map(([key, label]) => {
                if (key !== 'submit' && key !== 'sending' && key !== 'success') {
                  return (
                    <div key={key} className="form-group">
                      <label className={currentLang}>{label}</label>
                      {key === 'message' ? (
                        <textarea
                          value={formData[key]}
                          onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                          required
                          rows="5"
                        />
                      ) : (
                        <input
                          type={key === 'email' ? 'email' : 'text'}
                          value={formData[key]}
                          onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                          required
                        />
                      )}
                    </div>
                  );
                }
                return null;
              })}
              <button type="submit" className="submit-btn" disabled={submitStatus === 'sending'}>
                {submitStatus === 'sending' ? 
                  (translations[currentLang].contact?.form?.sending || 'Sending...') : 
                  (translations[currentLang].contact?.form?.submit || 'Send Message')
                }
              </button>
            </form>
            {submitStatus === 'success' && (
              <div className="form-success">
                <p>{translations[currentLang].contact?.form?.success || 'Message sent successfully!'}</p>
              </div>
            )}
          </div>
          <div className="contact-info">
            {translations[currentLang].contact?.info && Object.entries(translations[currentLang].contact.info).map(([key, info]) => (
              <div key={key} className="info-item">
                <i className={`fas fa-${key === 'address' ? 'map-marker-alt' : key}`}></i>
                <div className="info-text">
                  <h3 className={currentLang}>{info.title}</h3>
                  <p className={currentLang}>{info.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


export default App;
