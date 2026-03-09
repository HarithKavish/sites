// Deployment and Hosting Utility Script
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to current section in navigation
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.main-nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Initialize loading state (placeholder for future dynamic content)
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    document.body.appendChild(loadingSpinner);

    // Simulate loading delay for demonstration
    setTimeout(() => {
        loadingSpinner.style.display = 'none';
    }, 1000);

    // Hosting comparison toggle functionality
    const comparisonCards = document.querySelectorAll('.comparison-card');
    comparisonCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle expanded state (placeholder for future implementation)
            console.log('Comparison card clicked:', this.querySelector('h3').textContent);
        });
    });

    // Best practices accordion (placeholder implementation)
    const practiceItems = document.querySelectorAll('.practice-item');
    practiceItems.forEach(item => {
        item.addEventListener('click', function() {
            // Toggle expanded state (placeholder for future implementation)
            console.log('Best practice clicked:', this.querySelector('h3').textContent);
        });
    });
});