/**
 * Timeline and Tabs Language Fix
 * 
 * This script specifically targets the unique HTML structures used in the
 * Conservation Efforts section (timeline) and Research & Development section (tabs)
 * to properly handle language switching.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Current language based on HTML attribute
    const getCurrentLanguage = () => document.documentElement.lang || 'en';
    
    // Fix language display in timeline structure (Conservation Efforts section)
    function fixTimelineDisplay() {
      const lang = getCurrentLanguage();
      const timeline = document.querySelector('#conservation .timeline');
      if (!timeline) return;
      
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
    function fixTabsDisplay() {
      const lang = getCurrentLanguage();
      const tabsContainer = document.querySelector('#research .tabs-container');
      if (!tabsContainer) return;
      
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
    
    // Function to fix all special sections
    function fixSpecialSections() {
      fixTimelineDisplay();
      fixTabsDisplay();
    }
    
    // Run fixes on page load
    fixSpecialSections();
    
    // Run fixes when language changes
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Wait a short time for language to be updated
        setTimeout(fixSpecialSections, 100);
      });
    });
    
    // Watch for changes to HTML lang attribute
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'lang') {
          fixSpecialSections();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
  });