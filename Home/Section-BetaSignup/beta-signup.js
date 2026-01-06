/* ========================================
   BETA SIGNUP (ANDROID STEPS) - JS
   ======================================== */

(function() {
    'use strict';

    // Optional: Add simple scroll reveal animation for steps
    const steps = document.querySelectorAll('.st-step-card');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add a staggered delay based on index
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(step);
        });

        // Helper class for animation
        const style = document.createElement('style');
        style.innerHTML = `
            .st-step-card.is-visible {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        `;
        document.head.appendChild(style);
    }

})();