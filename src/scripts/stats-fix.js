// This script explicitly sets the stat labels and handles language switching
// Add this to a separate file or include at the end of your HTML

document.addEventListener('DOMContentLoaded', function() {
  // Detect page type
  const pageUrl = window.location.href;
  const isCattlePage = pageUrl.includes('cattle') || document.title.includes('Cattle');
  const isGoatPage = pageUrl.includes('goat') || document.title.includes('Goat');
  
  console.log("Page detection:", {isCattlePage, isGoatPage});
  
  // Define correct text content for each page
  const cattleLabels = {
    en: ["Indigenous Cattle Breeds", "Genetic Markers Identified", "Years of Adaptation"],
    ar: ["سلالات الأبقار المحلية", "العلامات الجينية المحددة", "سنوات من التكيف"]
  };
  
  const goatLabels = {
    en: ["Indigenous Goat Breeds", "Genetic Markers Identified", "Years of Adaptation"],
    ar: ["سلالات الماعز المحلية", "العلامات الجينية المحددة", "سنوات من التكيف"]
  };
  
  // Function to fix stat labels content
  function fixStatLabels() {
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
  }
  
  // Function to ensure proper display based on current language
  function updateStatsVisibility() {
    const currentLang = document.documentElement.lang || 'en';
    
    // Hide all language-specific labels first
    document.querySelectorAll('.stat-label').forEach(label => {
      if (label.classList.contains(currentLang)) {
        label.style.display = 'block';
      } else {
        label.style.display = 'none';
      }
    });
  }
  
  // Apply fixes immediately
  fixStatLabels();
  updateStatsVisibility();
  
  // Listen for language changes
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Wait for language change to take effect
      setTimeout(() => {
        updateStatsVisibility();
      }, 100);
    });
  });
  
  // Ensure stat numbers are displayed correctly
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(numElement => {
    const dataCount = numElement.getAttribute('data-count');
    if (dataCount) {
      numElement.textContent = dataCount;
    }
  });
});