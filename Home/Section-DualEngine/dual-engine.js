(function() {
    'use strict';

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDualEngine);
    } else {
        initDualEngine();
    }

    function initDualEngine() {
        if (!('IntersectionObserver' in window)) return;

        const visualizer = document.querySelector('.st-engine-visual');
        const descItems = document.querySelectorAll('.st-desc-item');

        if (!visualizer) return;

        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    
                    // Trigger inner animations if needed
                    if (entry.target.classList.contains('st-engine-visual')) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    } else if (entry.target.classList.contains('st-desc-item')) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Initial style setup for animation
        visualizer.style.opacity = '0';
        visualizer.style.transform = 'translateY(30px)';
        visualizer.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        observer.observe(visualizer);

        descItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.6s ease ${0.2 + (index * 0.1)}s, transform 0.6s ease ${0.2 + (index * 0.1)}s`;
            observer.observe(item);
        });
    }
})();
