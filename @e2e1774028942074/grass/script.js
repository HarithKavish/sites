// Grass Website Interactive Features
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scrolling for internal links
  const smoothScroll = function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
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
  };

  // Add subtle animations on scroll
  const animateOnScroll = function() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, observerOptions);

    // Observe cards and benefit items
    const elementsToAnimate = document.querySelectorAll('.card, .benefit-item, .tip');
    elementsToAnimate.forEach(el => observer.observe(el));
  };

  // Add hover effects to cards
  const enhanceCardInteractions = function() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-2px)';
      });
    });
  };

  // Create a simple grass facts rotation
  const grassFactsRotation = function() {
    const facts = [
      "Grass covers about 40% of Earth's land surface",
      "A single grass plant can have over 300 miles of roots",
      "Grass produces more oxygen than trees per square foot",
      "Grass supports over 1,000 species of insects",
      "Grass can cool surrounding air by up to 10°F",
      "Grass roots can extend 6 feet or more underground",
      "There are over 10,000 different species of grass",
      "One square foot of grass can contain 50+ insects"
    ];

    // Find a good spot for the fact rotator
    const heroSection = document.querySelector('.hero .container');
    if (heroSection) {
      const factElement = document.createElement('div');
      factElement.className = 'grass-fact';
      factElement.style.cssText = `
        margin-top: 1.5rem;
        padding: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        font-size: 0.9rem;
        opacity: 0.9;
        transition: opacity 0.3s ease;
        text-align: center;
      `;
      
      let currentFactIndex = 0;
      factElement.textContent = facts[currentFactIndex];
      heroSection.appendChild(factElement);

      // Rotate facts every 5 seconds
      setInterval(() => {
        currentFactIndex = (currentFactIndex + 1) % facts.length;
        factElement.style.opacity = '0';
        
        setTimeout(() => {
          factElement.textContent = facts[currentFactIndex];
          factElement.style.opacity = '0.9';
        }, 300);
      }, 5000);
    }
  };

  // Add CSS for fade-in animation
  const addAnimationStyles = function() {
    const style = document.createElement('style');
    style.textContent = `
      .fade-in {
        opacity: 0;
        transform: translateY(20px);
        animation: fadeInUp 0.6s ease forwards;
      }
      
      @keyframes fadeInUp {
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .grass-fact {
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0%, 100% { opacity: 0.9; }
        50% { opacity: 1; }
      }
    `;
    document.head.appendChild(style);
  };

  // Initialize all features
  const init = function() {
    smoothScroll();
    animateOnScroll();
    enhanceCardInteractions();
    grassFactsRotation();
    addAnimationStyles();
    
    console.log('Grass website loaded and ready!');
  };

  // Start the party
  init();
});