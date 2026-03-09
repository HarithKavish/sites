document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('removal-form');
    const responseMessage = document.getElementById('form-response');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const repositoryName = document.getElementById('repository-name').value;
        const githubUsername = document.getElementById('github-username').value;
        const reason = document.getElementById('reason').value;
        const contactEmail = document.getElementById('contact-email').value;

        // Simulate form submission with a delay to mimic API call
        setTimeout(() => {
            const successMessage = `
                <p>Thank you for submitting your removal request! We will review your request shortly.</p>
                <p>Repository: <strong>${repositoryName}</strong></p>
                <p>GitHub Username: <strong>${githubUsername}</strong></p>
                <p>Reason: <strong>${reason.substring(0, 100)}...</strong></p>
                <p>Contact Email: <strong>${contactEmail}</strong></p>
                <p>You will receive an email confirmation shortly.</p>
            `;

            responseMessage.innerHTML = successMessage;
            responseMessage.classList.remove('hidden');
            form.classList.add('submitted');
            form.style.opacity = '0.6';
        }, 1000);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add animation on form submission
    form.addEventListener('transitionend', function() {
        if (this.classList.contains('submitted')) {
            this.style.opacity = '1';
            setTimeout(() => {
                this.style.opacity = '0';
                form.reset();
                responseMessage.classList.add('hidden');
            }, 300);
        }
    });
});