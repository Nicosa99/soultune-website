/**

 * Hero Section Interactive Features

 * SoulTune Website

 */

 

(function() {

    'use strict';

 

    // Wait for DOM to be ready

    if (document.readyState === 'loading') {

        document.addEventListener('DOMContentLoaded', initHero);

    } else {

        initHero();

    }

 

    function initHero() {

        const hero = document.querySelector('.st-hero');

        const phone = document.getElementById('heroPhone');

 

        if (!hero || !phone) {

            console.warn('Hero elements not found');

            return;

        }

 

        // Detect if device supports touch

        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

 

        // Only enable parallax on non-touch devices

        if (!isTouchDevice) {

            initParallax(hero, phone);

        }

 

        // Smooth scroll for navigation links

        initSmoothScroll();

 

        // Optional: Add intersection observer for animations

        initScrollAnimations();

    }

 

    /**

     * 3D Parallax Effect for Phone Mockup

     */

    function initParallax(hero, phone) {

        let isHovering = false;

 

        hero.addEventListener('mouseenter', function() {

            isHovering = true;

            phone.style.transition = 'transform 0.1s linear';

        });

 

        hero.addEventListener('mousemove', function(e) {

            if (!isHovering) return;

 

            const { clientX, clientY } = e;

            const { innerWidth, innerHeight } = window;

 

            // Calculate rotation based on mouse position

            // Center of screen = 0 degrees, edges = ±15 degrees

            const xRotation = ((clientY - innerHeight / 2) / innerHeight) * -15;

            const yRotation = ((clientX - innerWidth / 2) / innerWidth) * 15;

 

            // Apply 3D transform

            phone.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;

        });

 

        hero.addEventListener('mouseleave', function() {

            isHovering = false;

            phone.style.transition = 'transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1)';

            phone.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';

        });

    }

 

    /**

     * Smooth Scroll for Internal Links

     */

    function initSmoothScroll() {

        const links = document.querySelectorAll('a[href^="#"]');

 

        links.forEach(link => {

            link.addEventListener('click', function(e) {

                const href = this.getAttribute('href');

 

                // Ignore if href is just "#"

                if (href === '#') {

                    e.preventDefault();

                    return;

                }

 

                const target = document.querySelector(href);

 

                if (target) {

                    e.preventDefault();

 

                    const headerOffset = 80;

                    const elementPosition = target.getBoundingClientRect().top;

                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

 

                    window.scrollTo({

                        top: offsetPosition,

                        behavior: 'smooth'

                    });

                }

            });

        });

    }

 

    /**

     * Scroll-triggered Animations

     * Optional: Add 'data-animate' attribute to elements you want to animate

     */

    function initScrollAnimations() {

        // Check if IntersectionObserver is supported

        if (!('IntersectionObserver' in window)) {

            return;

        }

 

        const animatedElements = document.querySelectorAll('[data-animate]');

 

        if (animatedElements.length === 0) {

            return;

        }

 

        const observerOptions = {

            threshold: 0.1,

            rootMargin: '0px 0px -50px 0px'

        };

 

        const observer = new IntersectionObserver(function(entries) {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add('animate-in');

                    observer.unobserve(entry.target);

                }

            });

        }, observerOptions);

 

        animatedElements.forEach(element => {

            observer.observe(element);

        });

    }

 

    /**

     * Optional: Dynamic gradient animation

     * Uncomment to enable subtle gradient shift on mouse move

     */

    /*

    function initDynamicGradient() {

        const hero = document.querySelector('.st-hero');

        const blobs = document.querySelectorAll('.st-blob');

 

        if (!hero || blobs.length === 0) return;

 

        hero.addEventListener('mousemove', function(e) {

            const { clientX, clientY } = e;

            const { innerWidth, innerHeight } = window;

 

            const xPercent = (clientX / innerWidth) * 100;

            const yPercent = (clientY / innerHeight) * 100;

 

            blobs.forEach((blob, index) => {

                const speed = (index + 1) * 0.5;

                const x = (xPercent - 50) * speed;

                const y = (yPercent - 50) * speed;

 

                blob.style.transform = `translate(${x}px, ${y}px)`;

            });

        });

    }

    */

 

})();

 