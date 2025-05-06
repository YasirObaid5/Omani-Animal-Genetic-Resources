// Contact Form functionality using EmailJS
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    // You'll need to sign up at https://www.emailjs.com/ and replace this with your actual public key
    emailjs.init("RTWCuaGbKcx4NCN5f");
    
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Create feedback elements
    const feedbackDiv = document.createElement('div');
    feedbackDiv.className = 'form-feedback';
    feedbackDiv.style.marginTop = '15px';
    feedbackDiv.style.padding = '10px';
    feedbackDiv.style.borderRadius = '5px';
    feedbackDiv.style.display = 'none';
    
    const feedbackEn = document.createElement('p');
    feedbackEn.className = 'en';
    feedbackEn.setAttribute('dir', 'ltr');
    
    const feedbackAr = document.createElement('p');
    feedbackAr.className = 'ar';
    feedbackAr.setAttribute('dir', 'rtl');
    
    feedbackDiv.appendChild(feedbackEn);
    feedbackDiv.appendChild(feedbackAr);
    contactForm.appendChild(feedbackDiv);
    
    // Form submission handler
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Basic validation
      if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
        showFeedback('Please fill all required fields.', 'يرجى ملء جميع الحقول المطلوبة.', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        showFeedback('Please enter a valid email address.', 'يرجى إدخال عنوان بريد إلكتروني صالح.', 'error');
        return;
      }
      
      // Disable submit button and show loading state
      submitBtn.disabled = true;
      const originalBtnText = getVisibleButtonText();
      updateButtonText('Sending...', 'جاري الإرسال...');
      
      // Prepare template parameters
      const templateParams = {
        from_name: nameInput.value,
        from_email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
      };
      
      // Send email using EmailJS
      // Replace these with your actual EmailJS service ID and template ID
      emailjs.send('service_od9slee', 'template_v5hkllc', templateParams)
        .then(function() {
          // Success
          showFeedback('Your message has been sent successfully. We will get back to you soon.', 
                      'تم إرسال رسالتك بنجاح. سنرد عليك قريبًا.', 'success');
          contactForm.reset();
        }, function(error) {
          // Error
          console.error('EmailJS error:', error);
          showFeedback('Failed to send message. Please try again later or contact us directly by email.', 
                      'فشل في إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بنا مباشرة عبر البريد الإلكتروني.', 'error');
        })
        .finally(function() {
          // Re-enable submit button and restore original text
          submitBtn.disabled = false;
          updateButtonText(originalBtnText.en, originalBtnText.ar);
        });
    });
    
    // Helper function to show feedback messages
    function showFeedback(enMessage, arMessage, type) {
      feedbackEn.textContent = enMessage;
      feedbackAr.textContent = arMessage;
      
      feedbackDiv.style.display = 'block';
      feedbackDiv.style.backgroundColor = type === 'success' ? '#d4edda' : '#f8d7da';
      feedbackDiv.style.color = type === 'success' ? '#155724' : '#721c24';
      feedbackDiv.style.borderColor = type === 'success' ? '#c3e6cb' : '#f5c6cb';
      
      // Hide the feedback after 5 seconds for success messages
      if (type === 'success') {
        setTimeout(() => {
          feedbackDiv.style.display = 'none';
        }, 5000);
      }
      
      // Scroll to the feedback message
      feedbackDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Helper function to get the visible button text based on current language
    function getVisibleButtonText() {
      const enBtn = submitBtn.querySelector('.en');
      const arBtn = submitBtn.querySelector('.ar');
      
      return {
        en: enBtn.textContent,
        ar: arBtn.textContent
      };
    }
    
    // Helper function to update button text
    function updateButtonText(enText, arText) {
      const enBtn = submitBtn.querySelector('.en');
      const arBtn = submitBtn.querySelector('.ar');
      
      enBtn.textContent = enText;
      arBtn.textContent = arText;
    }
  });