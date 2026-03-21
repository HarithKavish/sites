// Simple interactions for the introvert blog

document.addEventListener('DOMContentLoaded', () => {
  // Smooth reveal for post cards on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.post-card').forEach(card => {
    observer.observe(card);
  });

  // Optional: Add reading time estimate
  document.querySelectorAll('.post-card').forEach(card => {
    const text = card.innerText;
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    const timeEl = card.querySelector('time');
    const readTime = document.createElement('span');
    readTime.textContent = ` ·  min read`;
    readTime.style.color = 'var(--color-muted)';
    readTime.style.fontSize = '0.8rem';
    timeEl.appendChild(readTime);
  });
});