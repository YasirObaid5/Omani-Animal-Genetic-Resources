// Conservation Section Specific Fix
// This targets only the specific issue with conservation sections in both English and Arabic views

document.addEventListener('DOMContentLoaded', function() {
    // Function to fix the conservation section display
    document.addEventListener('DOMContentLoaded', function() {
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
    
      // initial run
      fixConservationSection();
    
      // re-run on language toggle buttons
      document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setTimeout(fixConservationSection, 100));
      });
    
      // re-run if the <html lang> attribute changes
      new MutationObserver(muts => {
        muts.forEach(m => {
          if (m.attributeName === 'lang') fixConservationSection();
        });
      }).observe(document.documentElement, { attributes: true });
    });
    
  
    // Run the fix immediately
    fixConservationSection();
  
    // Listen for language changes - both using buttons and any other methods
    // 1. Listen to language toggle buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Wait a moment for the language to change in the DOM
        setTimeout(fixConservationSection, 100);
      });
    });
  
    // 2. Listen for HTML lang attribute changes (in case language is changed by other scripts)
    const htmlObserver = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'lang') {
          fixConservationSection();
        }
      });
    });
    
    // Start observing the HTML element
    htmlObserver.observe(document.documentElement, { attributes: true });
  });