/* ========================================
   BETA SIGNUP - JavaScript
   ======================================== */

(function() {
    'use strict';

    // --- Configuration ---
    const CONFIG = {
        // Replace this with your actual Google Form URL after creating it
        googleFormURL: 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse',

        // Google Form field entry IDs (you'll get these from inspecting your form)
        formFields: {
            name: 'entry.YOUR_NAME_FIELD_ID',
            email: 'entry.YOUR_EMAIL_FIELD_ID',
            usecase: 'entry.YOUR_USECASE_FIELD_ID'
        }
    };

    // --- DOM Elements ---
    const form = document.getElementById('betaSignupForm');
    const submitBtn = document.getElementById('betaSubmitBtn');
    const successMsg = document.getElementById('betaSuccessMessage');
    const errorMsg = document.getElementById('betaErrorMessage');

    // --- Stats Counter Animation ---
    function animateStats() {
        const statNumbers = document.querySelectorAll('.st-stat-number');

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target);
                    animateValue(entry.target, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        statNumbers.forEach(stat => observer.observe(stat));
    }

    function animateValue(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                element.textContent = end;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // --- Form Validation ---
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateForm(formData) {
        const errors = [];

        if (!formData.get('name') || formData.get('name').trim().length < 2) {
            errors.push('Please enter your full name');
        }

        if (!validateEmail(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }

        if (!formData.get('usecase')) {
            errors.push('Please select your primary use case');
        }

        if (!formData.get('consent')) {
            errors.push('Please accept the beta testing terms');
        }

        return errors;
    }

    // --- Show/Hide Messages ---
    function showMessage(type, message = null) {
        // Hide all messages first
        successMsg.classList.remove('is-visible');
        errorMsg.classList.remove('is-visible');

        if (type === 'success') {
            successMsg.classList.add('is-visible');
        } else if (type === 'error') {
            if (message) {
                errorMsg.querySelector('div').innerHTML = `<strong>Oops!</strong> ${message}`;
            }
            errorMsg.classList.add('is-visible');
        }
    }

    // --- Submit to Google Forms ---
    async function submitToGoogleForms(formData) {
        // Create FormData for Google Forms
        const googleFormData = new FormData();

        googleFormData.append(CONFIG.formFields.name, formData.get('name'));
        googleFormData.append(CONFIG.formFields.email, formData.get('email'));
        googleFormData.append(CONFIG.formFields.usecase, formData.get('usecase'));

        try {
            // Submit to Google Forms (no-cors mode)
            await fetch(CONFIG.googleFormURL, {
                method: 'POST',
                body: googleFormData,
                mode: 'no-cors'
            });

            return { success: true };
        } catch (error) {
            console.error('Google Forms submission error:', error);
            return { success: false, error: error.message };
        }
    }

    // --- Alternative: Direct Email/Backend Integration ---
    // If you want to handle this server-side instead of Google Forms:
    async function submitToBackend(formData) {
        try {
            const response = await fetch('/api/beta-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.get('name'),
                    email: formData.get('email'),
                    usecase: formData.get('usecase'),
                    timestamp: new Date().toISOString()
                })
            });

            if (!response.ok) {
                throw new Error('Server error');
            }

            return await response.json();
        } catch (error) {
            console.error('Backend submission error:', error);
            return { success: false, error: error.message };
        }
    }

    // --- Handle Form Submit ---
    async function handleSubmit(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);

        // Validate
        const errors = validateForm(formData);
        if (errors.length > 0) {
            showMessage('error', errors.join('. '));
            return;
        }

        // Show loading state
        submitBtn.classList.add('is-loading');
        submitBtn.disabled = true;

        // Submit to Google Forms
        const result = await submitToGoogleForms(formData);

        // Hide loading state
        submitBtn.classList.remove('is-loading');
        submitBtn.disabled = false;

        // Show result
        if (result.success) {
            showMessage('success');
            form.reset();

            // Track conversion (optional - Google Analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'beta_signup', {
                    'event_category': 'engagement',
                    'event_label': 'Beta Access Form'
                });
            }

            // Scroll to success message
            successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        } else {
            showMessage('error', 'Something went wrong. Please try again or contact support.');
        }
    }

    // --- Init ---
    function init() {
        if (!form) return;

        // Attach form submit handler
        form.addEventListener('submit', handleSubmit);

        // Animate stats when visible
        animateStats();

        // Add input animations
        const inputs = form.querySelectorAll('.st-form-input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('is-focused');
            });
            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('is-focused');
            });
        });

        console.log('✅ Beta signup form initialized');
    }

    // --- Run on DOM Ready ---
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
