document.addEventListener('DOMContentLoaded', function() {
    // Toggle sections with smooth animations
    function openInfo(sectionId) {
        const sections = document.querySelectorAll('.hidden');
        const currentSection = document.getElementById(sectionId);

        // Hide all sections
        sections.forEach(section => {
            section.classList.add('hidden');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });

        // Show the selected section with animation
        currentSection.classList.remove('hidden');
        currentSection.style.opacity = '1';
        currentSection.style.transform = 'translateY(0)';

        // Set a timeout to ensure the animation completes before hiding the other sections
        setTimeout(() => {
            sections.forEach(section => {
                if (section !== currentSection) {
                    section.style.opacity = '0';
                    section.style.transform = 'translateY(20px)';
                }
            });
        }, 300);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation on scroll for sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('smooth-animate');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Initialize animations
    document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.classList.add('smooth-animate');
        });

        setTimeout(() => {
            sections.forEach(section => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }, 100);
    });
});