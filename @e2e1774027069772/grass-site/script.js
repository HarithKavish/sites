// Simple interactive enhancements for the grass website

document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Add subtle animation to cards on scroll
  const cards = document.querySelectorAll('.card, .tip');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  // Add click effect to grass list items
  const grassItems = document.querySelectorAll('.grass-list li');
  grassItems.forEach(item => {
    item.addEventListener('click', function() {
      this.style.backgroundColor = '#f1f8e9';
      setTimeout(() => {
        this.style.backgroundColor = '#fff';
      }, 200);
    });
  });
});