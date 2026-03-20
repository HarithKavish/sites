// Grass website interactive features

document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add hover effects to cards
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
    });
  });

  // Add interactive grass facts
  const facts = [
    "Grass covers about 20% of the world's land surface",
    "A single grass plant can have up to 387 miles of roots",
    "Grass produces more oxygen than trees per square foot",
    "There are over 10,000 species of grass worldwide",
    "Grass can grow up to 6 inches in a single week under ideal conditions"
  ];

  // Create floating fact element
  const factElement = document.createElement('div');
  factElement.className = 'grass-fact';
  factElement.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2d5016;
    color: white;
    padding: 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    max-width: 300px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1000;
  `;
  document.body.appendChild(factElement);

  // Show random facts every 10 seconds
  function showRandomFact() {
    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    factElement.textContent = randomFact;
    factElement.style.opacity = '1';
    
    setTimeout(() => {
      factElement.style.opacity = '0';
    }, 4000);
  }

  // Start showing facts after 3 seconds
  setTimeout(() => {
    showRandomFact();
    setInterval(showRandomFact, 10000);
  }, 3000);

  // Add click interaction to hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('click', function() {
      this.style.background = `linear-gradient(135deg, # 0%, # 100%)`;
      
      // Reset after 2 seconds
      setTimeout(() => {
        this.style.background = 'linear-gradient(135deg, #2d5016 0%, #7cb342 100%)';
      }, 2000);
    });
  }

  console.log('🌱 Grass website loaded successfully!');
});