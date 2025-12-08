(function() {
    'use strict';
    // Player Showcase interaction logic
    // Currently using CSS animations for the vinyl rotation and waveform
    // Can be enhanced with intersection observers to trigger animations only when in view
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPlayer);
    } else {
        initPlayer();
    }

    function initPlayer() {
        if (!('IntersectionObserver' in window)) return;

        const features = document.querySelectorAll('.st-p-feature');
        const phone = document.querySelector('.st-phone-mockup--large');

        if (!phone) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });

        // Setup phone animation
        phone.style.opacity = '0';
        phone.style.transform = 'scale(0.9)';
        phone.style.transition = 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        observer.observe(phone);

        // Setup features animation
        features.forEach((feat, i) => {
            feat.style.opacity = '0';
            feat.style.transform = 'translateY(20px)';
            feat.style.transition = `opacity 0.6s ease ${0.2 + (i * 0.1)}s, transform 0.6s ease ${0.2 + (i * 0.1)}s`;
            observer.observe(feat);
        });
    }
})();
