/**
 * Features Section Animations
 * SoulTune Website
 */

(function() {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFeatures);
    } else {
        initFeatures();
    }

    function initFeatures() {
        // Check if IntersectionObserver is supported
        if (!('IntersectionObserver' in window)) {
            console.warn('IntersectionObserver not supported, skipping animations.');
            return;
        }

        const featureCards = document.querySelectorAll('.st-feature-card');

        if (featureCards.length === 0) {
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        featureCards.forEach((card, index) => {
            // Add a transition delay for the staggered effect
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });
    }

})();
