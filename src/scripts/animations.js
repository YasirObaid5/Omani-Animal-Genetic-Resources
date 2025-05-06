// Additional JavaScript for enhanced animations and visual effects

// Create scroll progress indicator
function createScrollProgressIndicator() {
  const scrollProgress = document.createElement('div');
  scrollProgress.className = 'scroll-progress';
  document.body.appendChild(scrollProgress);
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    
    scrollProgress.style.width = scrollPercent + '%';
  });
}

// Create custom cursor
function createCustomCursor() {
  if (window.innerWidth < 1024) return;
  
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  
  const follower = document.createElement('div');
  follower.className = 'custom-cursor-follower';
  
  document.body.appendChild(cursor);
  document.body.appendChild(follower);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Follower follows with delay
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }, 100);
  });
  
  // Change cursor on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .resource-card, .gallery-item, .tab-btn');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '30px';
      cursor.style.height = '30px';
      cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.3)';
      
      follower.style.width = '50px';
      follower.style.height = '50px';
      follower.style.borderColor = 'rgba(212, 175, 55, 0.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.backgroundColor = 'rgba(212, 175, 55, 0.5)';
      
      follower.style.width = '40px';
      follower.style.height = '40px';
      follower.style.borderColor = 'rgba(42, 95, 126, 0.5)';
    });
  });
}

// Create section background shapes
function createSectionBackgrounds() {
  const sections = ['resources', 'conservation', 'research'];
  
  sections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      const shape = document.createElement('div');
      shape.className = 'section-bg-shape';
      section.appendChild(shape);
    }
  });
}

// Create text reveal animations - FIXED VERSION
function createTextRevealAnimations() {
  // Skip text reveal animation for the "about" section paragraphs and stat labels
  const excludedSelectors = [
    '#about .about-text p',
    '#about .stat-label',
    '.card-description',
    '.ar', // Skip all Arabic text
    '.arabic-title', // Skip all Arabic titles
    '[dir="rtl"]', // Skip all RTL elements
    '.hero-title', // Skip hero titles that might affect layout
    '.hero-subtitle'
  ];
  
  // Only apply to section titles that are NOT in the excluded list
  const titles = document.querySelectorAll('.section-title.en, .hero-title.en');
  
  titles.forEach(title => {
    // Check if this element should be excluded
    let shouldExclude = false;
    excludedSelectors.forEach(selector => {
      if (title.matches(selector) || title.closest(selector)) {
        shouldExclude = true;
      }
    });
    
    if (shouldExclude) return;
    
    const text = title.textContent || '';
    title.innerHTML = '';
    title.classList.add('text-reveal');
    
    // Wrap each letter in a span
    text.split('').forEach(letter => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      title.appendChild(span);
    });
  });
  
  // Animate text when in viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Add delay to each letter
        const spans = entry.target.querySelectorAll('span');
        spans.forEach((span, index) => {
          span.style.transitionDelay = (index * 0.03) + 's';
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  titles.forEach(title => {
    observer.observe(title);
  });
}

// Create parallax effect for images - SKIP FOR ABOUT SECTION
function createParallaxEffect() {
  const featuredImages = document.querySelectorAll('.featured-image, .card-image img');
  
  featuredImages.forEach(img => {
    // Skip images in the about section
    if (img.closest('#about')) return;
    
    const parent = img.parentElement;
    if (parent) {
      parent.classList.add('parallax-container');
      
      const imgSrc = img.getAttribute('src');
      const parallaxImg = document.createElement('div');
      parallaxImg.className = 'parallax-image';
      parallaxImg.style.backgroundImage = `url(${imgSrc})`;
      
      parent.insertBefore(parallaxImg, img);
      img.style.opacity = '0';
      
      parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const moveX = (mouseX - rect.width / 2) / 20;
        const moveY = (mouseY - rect.height / 2) / 20;
        
        parallaxImg.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
      });
      
      parent.addEventListener('mouseleave', () => {
        parallaxImg.style.transform = 'translate(0, 0)';
      });
    }
  });
}

// Create loading animation
function createLoadingAnimation() {
  const loading = document.createElement('div');
  loading.className = 'loading';
  
  const spinner = document.createElement('div');
  spinner.className = 'loading-spinner';
  
  loading.appendChild(spinner);
  document.body.appendChild(loading);
  
  // Hide loading screen after content is loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      loading.classList.add('hidden');
      
      // Remove loading screen after transition
      setTimeout(() => {
        document.body.removeChild(loading);
      }, 500);
    }, 1000);
  });
}

// Create page transition effect
function createPageTransitionEffect() {
  const transition = document.createElement('div');
  transition.className = 'page-transition';
  document.body.appendChild(transition);
  
  // Simulate page transition on internal links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      // Skip transition for dropdown toggles on mobile
      if (window.innerWidth <= 767 && link.parentElement?.classList.contains('dropdown')) {
        return;
      }
      
      e.preventDefault();
      const target = link.getAttribute('href');
      
      // Activate transition
      transition.classList.add('active');
      
      // After transition completes, navigate and hide transition
      setTimeout(() => {
        window.location.hash = target || '';
        transition.classList.remove('active');
      }, 500);
    });
  });
}

// Enhance section title animations - FIXED VERSION
function enhanceSectionTitleAnimations() {
  // Skip elements in about section and card descriptions
  const excludedSelectors = [
    '#about .about-text p',
    '#about .stat-label',
    '.card-description',
    '.ar',
    '.arabic-title',
    '[dir="rtl"]'
  ];
  
  const sectionTitles = document.querySelectorAll('.section-title.en');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  sectionTitles.forEach(title => {
    let shouldExclude = false;
    excludedSelectors.forEach(selector => {
      if (title.matches(selector) || title.closest(selector)) {
        shouldExclude = true;
      }
    });
    
    if (!shouldExclude) {
      observer.observe(title);
    }
  });
}

// Enhance stat number animations
function enhanceStatAnimations() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

// Initialize all visual enhancements
document.addEventListener('DOMContentLoaded', () => {
  createScrollProgressIndicator();
  createCustomCursor();
  createSectionBackgrounds();
  createTextRevealAnimations();
  createParallaxEffect();
  createLoadingAnimation();
  createPageTransitionEffect();
  enhanceSectionTitleAnimations();
  enhanceStatAnimations();
  
  // Add animations.css to document
  const animationStyles = document.createElement('link');
  animationStyles.rel = 'stylesheet';
  animationStyles.href = 'styles/animations.css';
  document.head.appendChild(animationStyles);
  
  // Additional fix for Arabic elements
  document.querySelectorAll('.ar, .arabic-title, [dir="rtl"]').forEach(el => {
    el.classList.remove('text-reveal');
    el.classList.remove('animated');
    el.style.animation = 'none';
    el.style.webkitAnimation = 'none';
    el.style.transform = 'none';
    el.style.transition = 'none';
    
    // Clean up any spans that might have been created inside
    if (el.classList.contains('text-reveal') || el.classList.contains('section-title')) {
      const text = el.textContent || '';
      el.innerHTML = text; // Reset to plain text
    }
  });
  
  // Additional fix for card descriptions and main content
  document.querySelectorAll('#about .about-text p, .card-description').forEach(el => {
    el.classList.remove('text-reveal');
    el.classList.remove('animated');
    el.style.animation = 'none';
    el.style.webkitAnimation = 'none';
    el.style.transform = 'none';
    
    // If the element has been turned into spans, restore it
    if (el.innerHTML.includes('<span>')) {
      const text = el.textContent || '';
      el.innerHTML = text; // Reset to plain text
    }
  });
});
