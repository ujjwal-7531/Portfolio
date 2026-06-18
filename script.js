document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- Dark/Light Theme Handler ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Retrieve theme preference from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark-theme';
  body.className = savedTheme;

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light-theme');
    } else {
      body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark-theme');
    }
  });

  // --- Header Scrolled Shadow ---
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Scroll Progress Bar ---
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      scrollProgress.style.width = `${progress}%`;
    }
  });

  // --- Mobile Menu Toggle ---
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  mobileNavToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    // Change menu icon to close icon if lucide is active
    const icon = mobileNavToggle.querySelector('i');
    if (icon) {
      if (isOpen) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    }
  });

  // Close mobile menu when clicking a link
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const icon = mobileNavToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    });
  });

  // --- Copy Email to Clipboard ---
  const copyBtn = document.getElementById('copy-email-btn');
  const emailLink = document.getElementById('email-link');

  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', () => {
      const emailAddress = emailLink.textContent.trim();
      
      navigator.clipboard.writeText(emailAddress)
        .then(() => {
          // Toggle copy/check icons
          const copyIcon = copyBtn.querySelector('.copy-icon');
          const checkIcon = copyBtn.querySelector('.check-icon');
          
          copyIcon.classList.add('hidden');
          checkIcon.classList.remove('hidden');
          
          copyBtn.style.color = '#10b981'; // Green confirmation color
          
          setTimeout(() => {
            copyIcon.classList.remove('hidden');
            checkIcon.classList.add('hidden');
            copyBtn.style.color = ''; // Restore default color
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy email: ', err);
        });
    });
  }

  // --- Fade-in Animations (Intersection Observer) ---
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  fadeElements.forEach(el => fadeObserver.observe(el));

  // --- Contact Form Submission & Validation ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic Validation
    if (!name || !email || !subject || !message) {
      showStatus('Please fill in all fields.', 'error');
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }

    // Dynamic mailto construction
    const ownerEmail = 'ujjwalthakur0412@gmail.com'; 
    const mailtoSubject = encodeURIComponent(`Portfolio Inquiry: ${subject}`);
    const mailtoBody = encodeURIComponent(
      `Hello Ujjwal Narayan Thakur,\n\n` +
      `My name is ${name} (${email}).\n\n` +
      `Message:\n${message}\n\n` +
      `---\nSent from Portfolio Contact Form.`
    );

    const mailtoLink = `mailto:${ownerEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Show launching status
    showStatus('Launching your email client to send message...', 'success');

    // Trigger redirection to trigger default email client
    setTimeout(() => {
      window.location.href = mailtoLink;
      contactForm.reset();
    }, 1200);
  });

  function showStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
    formStatus.classList.remove('hidden');
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      formStatus.classList.add('hidden');
    }, 5000);
  }

  // Set Current Year in Footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
