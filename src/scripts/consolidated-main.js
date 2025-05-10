"use strict";
// Consolidated JavaScript for Animal Genetic Resources in Oman Website

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

// Global variables
let translations = {};
let currentLang = 'en';

// DOM Elements
const langButtons = document.querySelectorAll('.lang-btn');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const dropdowns = document.querySelectorAll('.dropdown');
const tabButtons = document.querySelectorAll('.tab-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contactForm');

/**
 * Helper function: updateLocalizedElements
 * For a given selector, update the text content for elements that match the current language
 * and hide those that do not.
 */
function updateLocalizedElements(selector, text) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(el => {
        if (el.classList.contains(currentLang)) {
            el.textContent = text;
            el.style.display = '';

            // Apply language-specific styling
            if (currentLang === 'ar') {
                el.setAttribute('dir', 'rtl');
                el.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                el.style.direction = 'rtl';
                el.style.textAlign = 'right';
                el.style.unicodeBidi = 'isolate';
                el.style.letterSpacing = '0';
                el.style.wordSpacing = 'normal';

                // Special handling for centered elements
                if (el.classList.contains('hero-title') || el.classList.contains('hero-subtitle')) {
                    el.style.textAlign = 'center';
                }
            } else {
                el.setAttribute('dir', 'ltr');
                el.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                el.style.direction = 'ltr';
                el.style.textAlign = el.tagName.toLowerCase() === 'p' ? 'left' : '';
                el.style.unicodeBidi = 'isolate';

                // Special handling for centered elements
                if (el.classList.contains('hero-title') || el.classList.contains('hero-subtitle')) {
                    el.style.textAlign = 'center';
                }
            }
        } else {
            el.style.display = 'none';
        }
    });
}

// Load translations
function loadTranslations() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('scripts/translations.json');
            translations = yield response.json();
            // Initialize with saved language or default
            const savedLang = localStorage.getItem('preferredLanguage') || 'en';
            setLanguage(savedLang);
        }
        catch (error) {
            console.error('Failed to load translations:', error);
        }
    });
}

// Set language throughout the site
function setLanguage(lang) {
    if (!translations[lang]) {
        console.error(`Translations for ${lang} not found`);
        return;
    }

    currentLang = lang;
    document.documentElement.lang = lang;

    // Important: Set direction but don't apply it to body directly
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // When switching to Arabic, ensure proper font is loaded
    if (lang === 'ar') {
        // Add Amiri font if not already added
        if (!document.getElementById('amiri-font')) {
            const link = document.createElement('link');
            link.id = 'amiri-font';
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap';
            document.head.appendChild(link);
        }
    }

    // Update active class on language buttons
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Save language preference
    localStorage.setItem('preferredLanguage', lang);

    // Update all translatable sections
    updateNavigation();
    updateHeroSection();
    updateAboutSection();
    updateResourcesSection();
    updateConservationSection();
    updateResearchSection();
    updateGallerySection();
    updateContactSection();
    updateFooter();

    // Apply specific styling for each language
    if (lang === 'ar') {
        fixArabicTextRendering();
    } else {
        fixEnglishTextRendering();
    }
    
    // Fix stat labels and tabs
    fixStatLabels();
    fixSpecialSections();
}

// Fix Arabic text rendering issues
function fixArabicTextRendering() {
    // Apply to all visible Arabic elements
    const arabicElements = document.querySelectorAll('.ar:not([style*="display: none"])');
    arabicElements.forEach(el => {
        el.setAttribute('dir', 'rtl');
        el.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
        el.style.direction = 'rtl';
        el.style.textAlign = 'right';
        el.style.unicodeBidi = 'isolate';
        el.style.letterSpacing = '0';
        el.style.wordSpacing = 'normal';

        // Special handling for centered elements
        if (el.classList.contains('hero-title') || el.classList.contains('hero-subtitle')) {
            el.style.textAlign = 'center';
        }

        // Force layout recalculation
        const fontSize = window.getComputedStyle(el).fontSize;
        el.style.fontSize = fontSize;
    });

    // Ensure card descriptions are properly displayed
    document.querySelectorAll('.card-description.ar').forEach(el => {
        el.style.display = 'block';
    });
    document.querySelectorAll('.card-description.en').forEach(el => {
        el.style.display = 'none';
    });

    // Make sure the header title is properly displayed
    fixHeaderTitles('ar');
}

// Fix English text rendering issues
function fixEnglishTextRendering() {
    // Apply to all visible English elements
    const englishElements = document.querySelectorAll('.en:not([style*="display: none"])');
    englishElements.forEach(el => {
        el.setAttribute('dir', 'ltr');
        el.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
        el.style.direction = 'ltr';
        el.style.textAlign = el.tagName.toLowerCase() === 'p' ? 'left' : '';
        el.style.unicodeBidi = 'isolate';

        // Special handling for centered elements
        if (el.classList.contains('hero-title') || el.classList.contains('hero-subtitle')) {
            el.style.textAlign = 'center';
        }
    });

    // Ensure card descriptions are properly displayed
    document.querySelectorAll('.card-description.en').forEach(el => {
        el.style.display = 'block';
    });
    document.querySelectorAll('.card-description.ar').forEach(el => {
        el.style.display = 'none';
    });

    // Make sure the header title is properly displayed
    fixHeaderTitles('en');
}

// Special function to fix the header titles which have been problematic
function fixHeaderTitles(lang) {
    if (lang === 'en') {
        // Fix English titles
        const mainTitleEn = document.querySelector('.section-title.en');
        if (mainTitleEn) {
            mainTitleEn.setAttribute('dir', 'ltr');
            mainTitleEn.style.direction = 'ltr';
            mainTitleEn.style.textAlign = 'left';
            mainTitleEn.style.unicodeBidi = 'isolate';
        }

        const heroTitleEn = document.querySelector('.hero-title.en');
        if (heroTitleEn) {
            heroTitleEn.setAttribute('dir', 'ltr');
            heroTitleEn.style.direction = 'ltr';
            heroTitleEn.style.textAlign = 'center';
            heroTitleEn.style.unicodeBidi = 'isolate';
        }
    } else {
        // Fix all Arabic titles, including different class variants
        const arabicTitles = document.querySelectorAll('.section-title.ar, .arabic-title, .hero-title.ar, h2.ar, h1.ar, h3.ar');
        arabicTitles.forEach(title => {
            // Remove any animation or transformation
            title.style.animation = 'none';
            title.style.webkitAnimation = 'none';
            title.style.transform = 'none';
            title.style.transition = 'none';

            // Force proper RTL rendering
            title.setAttribute('dir', 'rtl');
            title.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
            title.style.direction = 'rtl';
            title.style.textAlign = 'right';
            title.style.unicodeBidi = 'isolate';
            title.style.letterSpacing = '0';
            title.style.wordSpacing = 'normal';

            // Remove any text-reveal class that might split the text
            title.classList.remove('text-reveal');

            // Special handling for hero title
            if (title.classList.contains('hero-title')) {
                title.style.textAlign = 'center';
            }
        });
    }
}

// Update navigation elements (they are assumed to be single elements with data attributes)
function updateNavigation() {
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        const key = item.getAttribute('href')?.replace('#', '');
        if (key && translations[currentLang].nav[key]) {
            item.textContent = translations[currentLang].nav[key];
        }
    });
    // Update dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-menu a');
    dropdownItems.forEach(item => {
        const key = item.getAttribute('href')?.replace('#', '');
        if (key && translations[currentLang].animals[key]) {
            item.textContent = translations[currentLang].animals[key];
        }
    });
}

// Update hero section: update both hero-title, hero-subtitle, and CTA buttons based on language
function updateHeroSection() {
    updateLocalizedElements('.hero-title', translations[currentLang].hero.title);
    updateLocalizedElements('.hero-subtitle', translations[currentLang].hero.subtitle);
    updateLocalizedElements('.cta-button', translations[currentLang].hero.cta);
}

// Update about section
function updateAboutSection() {
    updateLocalizedElements('#about .section-title', translations[currentLang].about.title);
    updateLocalizedElements('#about .about-text p', translations[currentLang].about.content);
    // Update stat labels (assumes order: goats, cattle, sheep)
    const statLabels = document.querySelectorAll('.stat-label');
    if (statLabels.length >= 3) {
        statLabels[0].textContent = translations[currentLang].animals.goats;
        statLabels[1].textContent = translations[currentLang].animals.cattle;
        statLabels[2].textContent = translations[currentLang].animals.sheep;
    }
}

// Update resources section
function updateResourcesSection() {
    updateLocalizedElements('#resources .section-title', translations[currentLang].resources.title);
    updateLocalizedElements('#resources .section-subtitle', translations[currentLang].resources.subtitle);

    // Force display properties for card descriptions based on current language
    document.querySelectorAll('.card-description').forEach(desc => {
        if (desc.classList.contains(currentLang)) {
            desc.style.display = 'block';
        } else {
            desc.style.display = 'none';
        }
    });

    // Update resource cards (each card should have a language-specific title element)
    const resourceCards = document.querySelectorAll('.resource-card');
    resourceCards.forEach(card => {
        const id = card.id;
        const titleElement = card.querySelector('.card-title');
        const description = card.querySelector('.card-description');
        const link = card.querySelector('.card-link');

        if (titleElement && translations[currentLang].animals[id]) {
            // Here we assume each card title element has a language class (e.g., en or ar)
            titleElement.textContent = translations[currentLang].animals[id];

            // Apply language-specific styling
            if (currentLang === 'ar' && titleElement.classList.contains('ar')) {
                titleElement.setAttribute('dir', 'rtl');
                titleElement.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                titleElement.style.direction = 'rtl';
                titleElement.style.textAlign = 'right';
                titleElement.style.unicodeBidi = 'isolate';
                titleElement.style.letterSpacing = '0';
                titleElement.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && titleElement.classList.contains('en')) {
                titleElement.setAttribute('dir', 'ltr');
                titleElement.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                titleElement.style.direction = 'ltr';
                titleElement.style.textAlign = 'left';
                titleElement.style.unicodeBidi = 'isolate';
            }
        }

        // Ensure the description is properly displayed
        if (description) {
            if (description.classList.contains(currentLang)) {
                description.style.display = 'block';
            } else {
                description.style.display = 'none';
            }
        }

        if (link) {
            link.textContent = translations[currentLang].resources.learnMore;
        }
    });
}

// Update conservation section
function updateConservationSection() {
    // 1️⃣ Pick the right section (goat‑specific or generic)
    const sectionId = document.getElementById('goat-conservation')
      ? 'goat-conservation'
      : 'conservation';
  
    // 2️⃣ Update header
    updateLocalizedElements(
      `#${sectionId} .section-title`,
      translations[currentLang].conservation.title
    );
    updateLocalizedElements(
      `#${sectionId} .section-subtitle`,
      translations[currentLang].conservation.subtitle
    );
  
    // 3️⃣ Update each timeline item
    const items = document.querySelectorAll(`#${sectionId} .timeline-item`);
    const keys  = ['breeding','documentation','community','policy'];
  
    items.forEach((item, idx) => {
      const key     = keys[idx];
      const heading = item.querySelector('h3');
      const para    = item.querySelector('p');
      const data    = translations[currentLang].conservation.timeline[key];
  
      if (heading && data) {
        heading.textContent = data.title;
        if (currentLang==='ar') {
          heading.setAttribute('dir','rtl');
          heading.style.textAlign='right';
        } else {
          heading.setAttribute('dir','ltr');
          heading.style.textAlign='left';
        }
      }
  
      if (para && data) {
        para.textContent = data.content;
        if (currentLang==='ar') {
          para.setAttribute('dir','rtl');
          para.style.textAlign='right';
        } else {
          para.setAttribute('dir','ltr');
          para.style.textAlign='left';
        }
      }
    });
}

// Update research section
function updateResearchSection() {
    updateLocalizedElements('#research .section-title', translations[currentLang].research.title);
    // Update tab buttons and content: each tab button and pane should be marked with a language class
    tabButtons.forEach(button => {
        const tabId = button.getAttribute('data-tab');
        if (tabId && translations[currentLang].research.tabs[tabId]) {
            const span = button.querySelector('span');
            if (span) {
                span.textContent = translations[currentLang].research.tabs[tabId].title;

                // Apply language-specific styling
                if (currentLang === 'ar' && span.classList.contains('ar')) {
                    span.setAttribute('dir', 'rtl');
                    span.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                    span.style.direction = 'rtl';
                    span.style.textAlign = 'right';
                    span.style.unicodeBidi = 'isolate';
                    span.style.letterSpacing = '0';
                    span.style.wordSpacing = 'normal';
                } else if (currentLang === 'en' && span.classList.contains('en')) {
                    span.setAttribute('dir', 'ltr');
                    span.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                    span.style.direction = 'ltr';
                    span.style.textAlign = 'left';
                    span.style.unicodeBidi = 'isolate';
                }
            }
        }
    });
    const tabPanes = document.querySelectorAll('.tab-pane');
    tabPanes.forEach(pane => {
        const id = pane.id;
        const heading = pane.querySelector('h3');
        const content = pane.querySelector('p');
        if (heading && translations[currentLang].research.tabs[id]) {
            heading.textContent = translations[currentLang].research.tabs[id].heading;

            // Apply language-specific styling
            if (currentLang === 'ar' && heading.classList.contains('ar')) {
                heading.setAttribute('dir', 'rtl');
                heading.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                heading.style.direction = 'rtl';
                heading.style.textAlign = 'right';
                heading.style.unicodeBidi = 'isolate';
                heading.style.letterSpacing = '0';
                heading.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && heading.classList.contains('en')) {
                heading.setAttribute('dir', 'ltr');
                heading.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                heading.style.direction = 'ltr';
                heading.style.textAlign = 'left';
                heading.style.unicodeBidi = 'isolate';
            }
        }
        if (content && translations[currentLang].research.tabs[id]) {
            content.textContent = translations[currentLang].research.tabs[id].content;

            // Apply language-specific styling
            if (currentLang === 'ar' && content.classList.contains('ar')) {
                content.setAttribute('dir', 'rtl');
                content.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                content.style.direction = 'rtl';
                content.style.textAlign = 'right';
                content.style.unicodeBidi = 'isolate';
                content.style.letterSpacing = '0';
                content.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && content.classList.contains('en')) {
                content.setAttribute('dir', 'ltr');
                content.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                content.style.direction = 'ltr';
                content.style.textAlign = 'left';
                content.style.unicodeBidi = 'isolate';
            }
        }
    });
}

// Update gallery section
function updateGallerySection() {
    updateLocalizedElements('#gallery .section-title', translations[currentLang].gallery.title);
    // Update filter buttons (each button should have language-specific span)
    filterButtons.forEach(button => {
        const filter = button.getAttribute('data-filter');
        if (filter && translations[currentLang].gallery.filters[filter]) {
            const span = button.querySelector('span');
            if (span) {
                span.textContent = translations[currentLang].gallery.filters[filter];

                // Apply language-specific styling
                if (currentLang === 'ar' && span.classList.contains('ar')) {
                    span.setAttribute('dir', 'rtl');
                    span.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                    span.style.direction = 'rtl';
                    span.style.textAlign = 'right';
                    span.style.unicodeBidi = 'isolate';
                    span.style.letterSpacing = '0';
                    span.style.wordSpacing = 'normal';
                } else if (currentLang === 'en' && span.classList.contains('en')) {
                    span.setAttribute('dir', 'ltr');
                    span.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                    span.style.direction = 'ltr';
                    span.style.textAlign = 'left';
                    span.style.unicodeBidi = 'isolate';
                }
            }
        }
    });
}

// Update contact section
function updateContactSection() {
    updateLocalizedElements('#contact .section-title', translations[currentLang].contact.title);
    // Update form labels – assumes that each label has the appropriate language class
    const formLabels = document.querySelectorAll('.form-group label');
    const formFields = ['name', 'email', 'subject', 'message'];
    formLabels.forEach((label, index) => {
        if (index < formFields.length) {
            label.textContent = translations[currentLang].contact.form[formFields[index]];

            // Apply language-specific styling
            if (currentLang === 'ar' && label.classList.contains('ar')) {
                label.setAttribute('dir', 'rtl');
                label.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                label.style.direction = 'rtl';
                label.style.textAlign = 'right';
                label.style.unicodeBidi = 'isolate';
                label.style.letterSpacing = '0';
                label.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && label.classList.contains('en')) {
                label.setAttribute('dir', 'ltr');
                label.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                label.style.direction = 'ltr';
                label.style.textAlign = 'left';
                label.style.unicodeBidi = 'isolate';
            }
        }
    });
    // Update submit button
    const submitBtn = document.querySelector('.submit-btn span');
    if (submitBtn) {
        submitBtn.textContent = translations[currentLang].contact.form.submit;

        // Apply language-specific styling
        if (currentLang === 'ar' && submitBtn.classList.contains('ar')) {
            submitBtn.setAttribute('dir', 'rtl');
            submitBtn.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
            submitBtn.style.direction = 'rtl';
            submitBtn.style.textAlign = 'right';
            submitBtn.style.unicodeBidi = 'isolate';
            submitBtn.style.letterSpacing = '0';
            submitBtn.style.wordSpacing = 'normal';
        } else if (currentLang === 'en' && submitBtn.classList.contains('en')) {
            submitBtn.setAttribute('dir', 'ltr');
            submitBtn.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
            submitBtn.style.direction = 'ltr';
            submitBtn.style.textAlign = 'left';
            submitBtn.style.unicodeBidi = 'isolate';
        }
    }
    // Update contact info
    const infoItems = document.querySelectorAll('.info-item');
    const infoKeys = ['address', 'phone', 'email'];
    infoItems.forEach((item, index) => {
        const key = infoKeys[index];
        const heading = item.querySelector('h3');
        const content = item.querySelector('p');
        if (heading && translations[currentLang].contact.info[key]) {
            heading.textContent = translations[currentLang].contact.info[key].title;

            // Apply language-specific styling
            if (currentLang === 'ar' && heading.classList.contains('ar')) {
                heading.setAttribute('dir', 'rtl');
                heading.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                heading.style.direction = 'rtl';
                heading.style.textAlign = 'right';
                heading.style.unicodeBidi = 'isolate';
                heading.style.letterSpacing = '0';
                heading.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && heading.classList.contains('en')) {
                heading.setAttribute('dir', 'ltr');
                heading.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                heading.style.direction = 'ltr';
                heading.style.textAlign = 'left';
                heading.style.unicodeBidi = 'isolate';
            }
        }
        if (content && key === 'address') {
            content.textContent = translations[currentLang].contact.info[key].content;

            // Apply language-specific styling
            if (currentLang === 'ar' && content.classList.contains('ar')) {
                content.setAttribute('dir', 'rtl');
                content.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                content.style.direction = 'rtl';
                content.style.textAlign = 'right';
                content.style.unicodeBidi = 'isolate';
                content.style.letterSpacing = '0';
                content.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && content.classList.contains('en')) {
                content.setAttribute('dir', 'ltr');
                content.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                content.style.direction = 'ltr';
                content.style.textAlign = 'left';
                content.style.unicodeBidi = 'isolate';
            }
        }
    });
}

// Update footer
function updateFooter() {
    updateLocalizedElements('.footer-links-column:nth-child(1) h4', translations[currentLang].footer.quickLinks);
    updateLocalizedElements('.footer-links-column:nth-child(2) h4', translations[currentLang].footer.resources);
    updateLocalizedElements('.footer-social h4', translations[currentLang].footer.followUs);
    const copyright = document.querySelector('.copyright');
    if (copyright) {
        copyright.textContent = translations[currentLang].footer.copyright;

        // Apply language-specific styling
        if (currentLang === 'ar' && copyright.classList.contains('ar')) {
            copyright.setAttribute('dir', 'rtl');
            copyright.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
            copyright.style.direction = 'rtl';
            copyright.style.textAlign = 'right';
            copyright.style.unicodeBidi = 'isolate';
            copyright.style.letterSpacing = '0';
            copyright.style.wordSpacing = 'normal';
        } else if (currentLang === 'en' && copyright.classList.contains('en')) {
            copyright.setAttribute('dir', 'ltr');
            copyright.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
            copyright.style.direction = 'ltr';
            copyright.style.textAlign = 'left';
            copyright.style.unicodeBidi = 'isolate';
        }
    }
    // Update footer links (for each link, update text if a matching key is found)
    const quickLinks = document.querySelectorAll('.footer-links-column:nth-child(1) a');
    quickLinks.forEach(link => {
        const key = link.getAttribute('href')?.replace('#', '');
        if (key && translations[currentLang].nav[key]) {
            link.textContent = translations[currentLang].nav[key];

            // Apply language-specific styling
            if (currentLang === 'ar' && link.classList.contains('ar')) {
                link.setAttribute('dir', 'rtl');
                link.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                link.style.direction = 'rtl';
                link.style.textAlign = 'right';
                link.style.unicodeBidi = 'isolate';
                link.style.letterSpacing = '0';
                link.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && link.classList.contains('en')) {
                link.setAttribute('dir', 'ltr');
                link.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                link.style.direction = 'ltr';
                link.style.textAlign = 'left';
                link.style.unicodeBidi = 'isolate';
            }
        }
    });
    const resourceLinks = document.querySelectorAll('.footer-links-column:nth-child(2) a');
    resourceLinks.forEach(link => {
        const key = link.getAttribute('href')?.replace('#', '');
        if (key && translations[currentLang].animals[key]) {
            link.textContent = translations[currentLang].animals[key];

            // Apply language-specific styling
            if (currentLang === 'ar' && link.classList.contains('ar')) {
                link.setAttribute('dir', 'rtl');
                link.style.fontFamily = "'Amiri', 'Cairo', 'Tajawal', sans-serif";
                link.style.direction = 'rtl';
                link.style.textAlign = 'right';
                link.style.unicodeBidi = 'isolate';
                link.style.letterSpacing = '0';
                link.style.wordSpacing = 'normal';
            } else if (currentLang === 'en' && link.classList.contains('en')) {
                link.setAttribute('dir', 'ltr');
                link.style.fontFamily = "'Montserrat', 'Open Sans', sans-serif";
                link.style.direction = 'ltr';
                link.style.textAlign = 'left';
                link.style.unicodeBidi = 'isolate';
            }
        }
    });
}

// Fix stat labels content
function fixStatLabels() {
    // Detect page type
    const pageUrl = window.location.href;
    const isCattlePage = pageUrl.includes('cattle') || document.title.includes('Cattle');
    const isGoatPage = pageUrl.includes('goat') || document.title.includes('Goat');
    
    // Define correct text content for each page
    const cattleLabels = {
        en: ["Indigenous Cattle Breeds", "Genetic Markers Identified", "Years of Adaptation"],
        ar: ["سلالات الأبقار المحلية", "العلامات الجينية المحددة", "سنوات من التكيف"]
    };
    
    const goatLabels = {
        en: ["Indigenous Goat Breeds", "Genetic Markers Identified", "Years of Adaptation"],
        ar: ["سلالات الماعز المحلية", "العلامات الجينية المحددة", "سنوات من التكيف"]
    };
    
    const labels = isCattlePage ? cattleLabels : (isGoatPage ? goatLabels : null);
    if (!labels) return;
    
    // Get all stat items
    const statItems = document.querySelectorAll('.stat-item');
    
    // Apply the correct labels to each stat item
    statItems.forEach((item, index) => {
        if (index < 3) { // We have 3 stats
            const enLabel = item.querySelector('.stat-label.en');
            const arLabel = item.querySelector('.stat-label.ar');
            
            if (enLabel) enLabel.textContent = labels.en[index];
            if (arLabel) arLabel.textContent = labels.ar[index];
        }
    });
    
    // Update visibility based on current language
    const currentLang = document.documentElement.lang || 'en';
    
    // Hide all language-specific labels first
    document.querySelectorAll('.stat-label').forEach(label => {
        if (label.classList.contains(currentLang)) {
            label.style.display = 'block';
        } else {
            label.style.display = 'none';
        }
    });
    
    // Ensure stat numbers are displayed correctly
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(numElement => {
        const dataCount = numElement.getAttribute('data-count');
        if (dataCount) {
            numElement.textContent = dataCount;
        }
    });
}

// Fix special sections (timeline and tabs)
function fixSpecialSections() {
    // Fix language display in timeline structure (Conservation Efforts section)
    const lang = getCurrentLanguage();
    const timeline = document.querySelector('#conservation .timeline');
    if (timeline) {
        // Get all language-specific elements in the timeline
        const timelineItems = timeline.querySelectorAll('.timeline-item');
        
        timelineItems.forEach(item => {
            // Get all language-specific elements in this timeline item
            const content = item.querySelector('.timeline-content');
            if (!content) return;
            
            // Find all headings and paragraphs with language classes
            content.querySelectorAll('h3, p').forEach(el => {
                // If element has the current language class, show it
                if (el.classList.contains(lang)) {
                    el.style.display = 'block';
                } 
                // If element has the other language class, hide it
                else if (el.classList.contains(lang === 'en' ? 'ar' : 'en')) {
                    el.style.display = 'none';
                }
            });
        });
    }
    
    // Fix language display in tabs structure (Research & Development section)
    const tabsContainer = document.querySelector('#research .tabs-container');
    if (tabsContainer) {
        // Handle tab buttons
        tabsContainer.querySelectorAll('.tab-btn span').forEach(span => {
            if (span.classList.contains(lang)) {
                span.style.display = 'inline-block';
            } else {
                span.style.display = 'none';
            }
        });
        
        // Handle tab panes content
        tabsContainer.querySelectorAll('.tab-pane').forEach(pane => {
            const tabText = pane.querySelector('.tab-text');
            if (!tabText) return;
            
            // Find all headings and paragraphs with language classes
            tabText.querySelectorAll('h3, p').forEach(el => {
                if (el.classList.contains(lang)) {
                    el.style.display = 'block';
                } else if (el.classList.contains(lang === 'en' ? 'ar' : 'en')) {
                    el.style.display = 'none';
                }
            });
        });
    }
    
    // Fix conservation section
    fixConservationSection();
}

// Fix conservation section
function fixConservationSection() {
    // 1️⃣ Pick the right section: page‑specific or generic
    const conservationSection =
      document.getElementById('goat-conservation') ||
      document.getElementById('conservation');
    if (!conservationSection) return;

    // 2️⃣ Determine current language
    const currentLang = document.documentElement.lang || 'en';

    // 3️⃣ Show only the matching-language titles & subtitles
    const titles    = conservationSection.querySelectorAll('.section-title');
    const subtitles = conservationSection.querySelectorAll('.section-subtitle');

    titles.forEach(t => {
      t.style.display = t.classList.contains(currentLang) ? 'block' : 'none';
    });
    subtitles.forEach(s => {
      s.style.display = s.classList.contains(currentLang) ? 'block' : 'none';
    });

    // 4️⃣ For each timeline-content, show only the matching-language elements
    const entries = conservationSection.querySelectorAll('.timeline-content');
    entries.forEach(entry => {
      const langEls = entry.querySelectorAll('.en, .ar');
      langEls.forEach(el => {
        el.style.display = el.classList.contains(currentLang)
          ? (el.tagName.toLowerCase()==='span' ? 'inline-block' : 'block')
          : 'none';
      });
    });
}

// Get the current language
function getCurrentLanguage() {
    return document.documentElement.lang || 'en';
}

// Language Switching
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.getAttribute('data-lang');
        if (lang) {
            setLanguage(lang);
        }
    });
});

// Mobile Menu Toggle
if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        // Transform hamburger to X
        const bars = menuToggle.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'translateY(9px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Mobile Dropdown Toggle
dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    if (link && window.innerWidth <= 767) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('active');
        });
    }
});

// Tabs Functionality
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.getAttribute('data-tab');
        if (tabId) {
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Show active tab content
            const tabPanes = document.querySelectorAll('.tab-pane');
            tabPanes.forEach(pane => pane.classList.remove('active'));
            const activePane = document.getElementById(tabId);
            if (activePane) activePane.classList.add('active');
        }
    });
});

// Gallery Filtering
const galleryGrid = document.querySelector('.gallery-grid');
const galleryItems = [];

// Populate gallery with images
function populateGallery() {
    // Get all images from the images directory that start with 'arabic_image_'
    for (let i = 0; i < 63; i++) {
        const category = assignCategory(i);
        galleryItems.push({
            id: i,
            src: `images/arabic_image_${i}.${i > 11 && i % 2 === 0 ? 'png' : 'jpg'}`,
            alt: `Animal Genetic Resource Image ${i}`,
            category
        });
    }
    renderGalleryItems('all');
}

// Assign a category based on image index (for demo purposes)
function assignCategory(index) {
    if (index < 10) return 'cattle';
    if (index < 20) return 'goats';
    if (index < 30) return 'sheep';
    if (index < 40) return 'camels';
    return 'poultry';
}

// Render gallery items based on filter
function renderGalleryItems(filter) {
    if (!galleryGrid) return;
    galleryGrid.innerHTML = '';
    const filteredItems = filter === 'all' ? galleryItems : galleryItems.filter(item => item.category === filter);
    filteredItems.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', item.category);
        galleryItem.innerHTML = `
      <img src="${item.src}" alt="${item.alt}" class="gallery-image">
      <div class="gallery-overlay">
        <i class="fas fa-search-plus gallery-icon"></i>
      </div>
    `;
        galleryItem.addEventListener('click', () => openLightbox(item));
        galleryGrid.appendChild(galleryItem);
    });
}

// Gallery filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        if (filter) {
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // Filter gallery items
            renderGalleryItems(filter);
        }
    });
});

// Lightbox functionality
let currentLightboxIndex = 0;
function openLightbox(item) {
    currentLightboxIndex = galleryItems.findIndex(i => i.id === item.id);
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close">&times;</button>
      <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
      <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
      <img src="${item.src}" alt="${item.alt}" class="lightbox-image">
    </div>
  `;
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    // Close lightbox
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn?.addEventListener('click', closeLightbox);
    // Navigate lightbox
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    prevBtn?.addEventListener('click', () => navigateLightbox('prev'));
    nextBtn?.addEventListener('click', () => navigateLightbox('next'));
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeyboard);
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        document.body.removeChild(lightbox);
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleLightboxKeyboard);
    }
}

function navigateLightbox(direction) {
    if (direction === 'prev') {
        currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    } else {
        currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    }
    const lightboxImage = document.querySelector('.lightbox-image');
    if (lightboxImage) {
        const item = galleryItems[currentLightboxIndex];
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
    }
}

function handleLightboxKeyboard(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
    } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
    }
}

// Animated Statistics Counter
function animateStats() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count') || '0');
        let current = 0;
        const increment = target / 50; // Divide animation into 50 steps
        const duration = 2000; // 2 seconds
        const stepTime = duration / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current).toString();
        }, stepTime);
    });
}

// Animation Functions

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

// Create text reveal animations
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

// Enhance section title animations
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

// Create particles for hero section
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        // Random particle properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const animDuration = Math.random() * 20 + 10;
        const animDelay = Math.random() * 10;
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.opacity = opacity.toString();
        particle.style.animation = `float ${animDuration}s ease-in-out ${animDelay}s infinite`;
        particlesContainer.appendChild(particle);
    }
}

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('about')) {
                animateStats();
            }
            // Add animation classes to elements when they come into view
            const animElements = entry.target.querySelectorAll('.anim-fade-in, .anim-fade-up, .anim-fade-left, .anim-fade-right');
            animElements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('animated');
                }, index * 100); // Stagger animations
            });
            // Unobserve after animation is triggered
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navList?.classList.contains('active')) {
                    menuToggle?.dispatchEvent(new Event('click'));
                }
                // Scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header scroll behavior
let lastScrollTop = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        // Scrolling down & past hero section
        header?.classList.add('hidden');
    } else {
        // Scrolling up
        header?.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

// Contact form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = {};
        formData.forEach((value, key) => {
            formValues[key] = value.toString();
        });
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.submit-btn');
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>${translations[currentLang].contact.form.sending}</span>`;
            submitBtn.disabled = true;
            // Simulate API call
            setTimeout(() => {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.innerHTML = `<p>${translations[currentLang].contact.form.success}</p>`;
                contactForm.reset();
                contactForm.appendChild(successMessage);
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                // Remove success message after 5 seconds
                setTimeout(() => {
                    contactForm.removeChild(successMessage);
                }, 5000);
            }, 1500);
        }
    });
}

// Initialize all visual enhancements
function initializeVisualEnhancements() {
    createScrollProgressIndicator();
    createCustomCursor();
    createSectionBackgrounds();
    createTextRevealAnimations();
    createParallaxEffect();
    createLoadingAnimation();
    createPageTransitionEffect();
    enhanceSectionTitleAnimations();
    enhanceStatAnimations();
    
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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize language first based on saved preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    document.documentElement.lang = savedLang;

    // Immediately force proper display for card descriptions
    if (savedLang === 'ar') {
        document.querySelectorAll('.card-description.ar').forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll('.card-description.en').forEach(el => {
            el.style.display = 'none';
        });
    } else {
        document.querySelectorAll('.card-description.en').forEach(el => {
            el.style.display = 'block';
        });
        document.querySelectorAll('.card-description.ar').forEach(el => {
            el.style.display = 'none';
        });
    }

    // Load translations and complete initialization
    loadTranslations().then(() => {
        populateGallery();
        createParticles();
        initializeVisualEnhancements();
        
        // Observe sections for animations
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
        
        // Add animation classes to elements for initial animations
        document.querySelectorAll('.resource-card, .timeline-item, .tab-pane-content, .info-item').forEach(el => {
            el.classList.add('anim-fade-up');
        });

        // Apply immediate fixes to language elements
        if (document.documentElement.lang === 'ar') {
            fixArabicTextRendering();
        } else {
            fixEnglishTextRendering();
        }
        
        // Fix stat labels and conservation section
        fixStatLabels();
        fixSpecialSections();
    });
});

// Add CSS for dynamic elements
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }
  
  .lightbox-image {
    max-width: 100%;
    max-height: 90vh;
    border: 2px solid white;
  }
  
  .lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    color: white;
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  body[dir="rtl"] .lightbox-close {
    right: auto;
    left: 0;
  }
  
  .lightbox-prev,
  .lightbox-next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 2rem;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  
  .lightbox-prev {
    left: -60px;
  }
  
  .lightbox-next {
    right: -60px;
  }
  
  body[dir="rtl"] .lightbox-prev {
    left: auto;
    right: -60px;
  }
  
  body[dir="rtl"] .lightbox-next {
    right: auto;
    left: -60px;
  }
  
  .form-success {
    margin-top: 1rem;
    padding: 1rem;
    background-color: #d4edda;
    color: #155724;
    border-radius: 0.25rem;
    text-align: center;
  }
  
  .particle {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    pointer-events: none;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) translateX(0);
    }
    25% {
      transform: translateY(-30px) translateX(15px);
    }
    50% {
      transform: translateY(-15px) translateX(-15px);
    }
    75% {
      transform: translateY(30px) translateX(10px);
    }
  }
  
  .anim-fade-in, .anim-fade-up, .anim-fade-left, .anim-fade-right {
    opacity: 0;
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  
  .anim-fade-up {
    transform: translateY(30px);
  }
  
  .anim-fade-left {
    transform: translateX(-30px);
  }
  
  .anim-fade-right {
    transform: translateX(30px);
  }
  
  .anim-fade-in.animated,
  .anim-fade-up.animated,
  .anim-fade-left.animated,
  .anim-fade-right.animated {
    opacity: 1;
    transform: translate(0);
  }

  /* Bilingual text rendering fixes */
  .en {
    direction: ltr !important;
    text-align: left !important;
    unicode-bidi: isolate !important;
    font-family: 'Montserrat', 'Open Sans', sans-serif !important;
  }
  
  .ar {
    direction: rtl !important;
    text-align: right !important;
    unicode-bidi: isolate !important;
    font-family: 'Amiri', 'Cairo', 'Tajawal', sans-serif !important;
    letter-spacing: 0 !important;
    word-spacing: normal !important;
  }
  
  /* Fix for card descriptions to ensure proper display */
  html[lang="ar"] .card-description.ar {
    display: block !important;
  }
  
  html[lang="ar"] .card-description.en {
    display: none !important;
  }
  
  html[lang="en"] .card-description.en {
    display: block !important;
  }
  
  html[lang="en"] .card-description.ar {
    display: none !important;
  }
  
  /* Fix for text alignment in specific elements */
  .hero-title.en, .hero-title.ar,
  .hero-subtitle.en, .hero-subtitle.ar {
    text-align: center !important;
  }
`;

document.head.appendChild(dynamicStyles);
