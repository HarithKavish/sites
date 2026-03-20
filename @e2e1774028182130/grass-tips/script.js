// Smooth-scroll for nav links
document.querySelectorAll('.nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Optional: add scroll-spy active state (future enhancement)
// Trivial footprint for a static site; keeps JS minimal by design.