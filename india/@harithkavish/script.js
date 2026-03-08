document.addEventListener('DOMContentLoaded', function() {
    // Explore Button Functionality
    const exploreBtn = document.getElementById('exploreBtn');
    exploreBtn.addEventListener('click', function() {
        document.querySelector('.hero').style.display = 'none';
        document.querySelector('.hero-content').style.display = 'none';
        document.querySelector('.hero-image').style.display = 'none';
        document.querySelector('main').style.display = 'block';
    });

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    document.body.appendChild(backToTopBtn);

    // Show Back to Top Button on Scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Smooth Scroll for Section Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Fade-in Effect for Sections
    const sections = document.querySelectorAll('.section');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (pageYOffset >= (sectionTop - 100)) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    });

    // Initialize opacity and transform
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease`;
    });
});