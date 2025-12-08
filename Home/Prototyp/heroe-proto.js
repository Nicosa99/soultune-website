document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.st-hero');
    const phone = document.getElementById('heroPhone');

    if (!hero || !phone) return;

    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate rotation based on mouse position relative to center
        // Limit rotation to small angles for subtlety
        const xRotation = ((clientY - innerHeight / 2) / innerHeight) * -15; // Invert axis
        const yRotation = ((clientX - innerWidth / 2) / innerWidth) * 15;

        // Apply style directly for performance
        phone.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
    });

    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        phone.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        phone.style.transition = 'transform 0.5s ease-out';
    });

    hero.addEventListener('mouseenter', () => {
        phone.style.transition = 'transform 0.1s linear';
    });
});