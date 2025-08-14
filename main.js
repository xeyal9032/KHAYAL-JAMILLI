/**
 * Khayal Jamilli Portfolio - Main JavaScript
 * Modern AI & Full-Stack Developer Website
 * GitHub Optimized
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initThemeSwitcher();
  loadCaseStudies();
  initCounters();
  initContactForm();
});

/**
 * Theme Switching Functionality
 */
function initThemeSwitcher() {
  const themeBtn = document.getElementById('theme');
  const html = document.documentElement;
  
  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.className = savedTheme;
  themeBtn.textContent = savedTheme === 'dark' ? '🌓' : '🌙';
  
  // Theme toggle event listener
  themeBtn.addEventListener('click', function() {
    const currentTheme = html.className;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.className = newTheme;
    localStorage.setItem('theme', newTheme);
    themeBtn.textContent = newTheme === 'dark' ? '🌓' : '🌙';
  });
}

/**
 * Load Case Studies from Data File
 */
function loadCaseStudies() {
  const casesContainer = document.getElementById('cases');
  
  if (!casesContainer || !window.caseStudies) return;
  
  const casesHTML = window.caseStudies.map(study => `
    <article class="card">
      <img src="${study.image}" alt="${study.title}" loading="lazy">
      <div class="tags">
        ${study.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <h3>${study.title}</h3>
      <p>${study.summary}</p>
      <div class="metrics">
        <span>${study.metrics.performance}</span>
        <span>${study.metrics.users}</span>
        <span>${study.metrics.revenue}</span>
      </div>
      <div class="actions">
        <a href="${study.demo}" target="_blank" rel="noopener" class="cta small">Demo</a>
        <a href="${study.code}" target="_blank" rel="noopener" class="ghost small">Kod</a>
        <a href="${study.brief}" download class="ghost small">Brief</a>
      </div>
    </article>
  `).join('');
  
  casesContainer.innerHTML = casesHTML;
}

/**
 * Counter Animation for Hero Stats
 */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = counter.getAttribute('data-count');
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

/**
 * Animate Counter from 0 to Target Value
 */
function animateCounter(counter, target) {
  const isPercentage = target.includes('%');
  const isPlus = target.includes('+');
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
  
  let current = 0;
  const increment = numericTarget / 50;
  const duration = 2000;
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    
    if (current >= numericTarget) {
      current = numericTarget;
      clearInterval(timer);
    }
    
    let displayValue = Math.floor(current);
    
    if (isPercentage) {
      displayValue += '%';
    } else if (isPlus) {
      displayValue += '+';
    }
    
    counter.textContent = displayValue;
  }, stepTime);
}

/**
 * Contact Form Handling
 */
function initContactForm() {
  const contactForm = document.getElementById('contact');
  const status = document.getElementById('status');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    // Update status
    status.textContent = 'Gönderiliyor...';
    status.style.color = 'var(--warning)';
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        status.textContent = 'Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.';
        status.style.color = 'var(--success)';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      status.textContent = 'Mesaj gönderilemedi. Lütfen xeyalcemilli9032@gmail.com adresine doğrudan e-posta gönderin.';
      status.style.color = 'var(--error)';
    }
  });
}
