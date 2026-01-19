/* =====================================================
   LAS COMADRES - MAIN JAVASCRIPT
   Animations and Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', function() {
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  
  function handleNavbarScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll(); // Check initial state

  // ===== MOBILE MENU TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  navToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== SCROLL TO TOP BUTTON =====
  const scrollTopBtn = document.getElementById('scrollTop');
  
  function handleScrollTop() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', handleScrollTop);
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ===== FADE IN ON SCROLL ANIMATION =====
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  fadeElements.forEach(element => {
    fadeInObserver.observe(element);
  });

  // ===== CATEGORY CARDS HOVER EFFECT =====
  const categoryCards = document.querySelectorAll('.category-card');
  
  categoryCards.forEach(card => {
    card.addEventListener('click', function() {
      // Could link to specific menu section or trigger modal
      // For now, just scroll to call section
      const locationSection = document.getElementById('locations');
      locationSection.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===== DISH CARDS STAGGER ANIMATION =====
  const dishCards = document.querySelectorAll('.dish-card');
  
  dishCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
  });

  // ===== PARALLAX EFFECT FOR HERO (subtle) =====
  const heroBackground = document.querySelector('.hero-background img');
  
  if (heroBackground && window.innerWidth > 768) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroBackground.style.transform = `translateY(${rate}px) scale(1.1)`;
    });
  }

  // ===== ACTIVE NAV LINK HIGHLIGHTING =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-link');
  
  function highlightNavLink() {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavLink);

  // ===== ANIMATED COUNTER (for future use) =====
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    updateCounter();
  }

  // ===== LOADING COMPLETE =====
  document.body.classList.add('loaded');
  
  console.log('🌮 Las Comadres website loaded successfully!');
});

// ===== PRELOAD IMAGES =====
function preloadImages(urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

// Preload hero image for smoother experience
preloadImages([
  'assets/images/hero.png',
  'assets/images/logo.png'
]);
