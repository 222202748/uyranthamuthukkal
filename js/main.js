// ========================================
// UYARANTHAMUTHUKKAL - Main JavaScript
// ========================================

// Sticky Header
const header = document.getElementById('header');

// Translation Logic
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('preferredLang') || 'en';

function updateLanguage(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });
  
  if (langToggle) {
    langToggle.textContent = lang === 'en' ? 'தமிழ்' : 'English';
  }
  
  localStorage.setItem('preferredLang', lang);
  currentLang = lang;
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    updateLanguage(currentLang === 'en' ? 'ta' : 'en');
  });
}

// Initialize language
document.addEventListener('DOMContentLoaded', () => {
  updateLanguage(currentLang);
});

window.addEventListener('scroll', () => {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 80);
  }
});

// Mobile Nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}

// Scroll Reveal
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.welcome-card, .blog-card, .event-card').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Newsletter Subscribe
function handleSubscribe(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn = e.target.querySelector('button');
  const email = input.value;

  btn.textContent = 'Subscribing...';
  btn.disabled = true;

  setTimeout(() => {
    input.value = '';
    btn.textContent = 'Subscribed! ✓';
    btn.style.background = '#2a5c2a';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  }, 1200);
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPage) {
    link.classList.add('active');
  } else {
    link.classList.remove('active');
  }
});

// Back to top on scroll
const createBackToTop = () => {
  const btn = document.createElement('button');
  btn.innerHTML = '✝';
  btn.className = 'back-to-top';
  btn.style.cssText = `
    position: fixed; bottom: 2rem; right: 2rem;
    width: 50px; height: 50px; border-radius: 50%;
    background: #C9A84C; color: #0D1B2A;
    border: none; font-size: 1.3rem; cursor: pointer;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    opacity: 0; transition: all 0.3s ease;
    z-index: 500; display: flex; align-items: center; justify-content: center;
  `;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 500 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 500 ? 'auto' : 'none';
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

createBackToTop();


