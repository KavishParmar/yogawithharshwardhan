document.addEventListener('DOMContentLoaded', () => {

    // --- Beam of Light / Cursor Effect ---
    const cursorLight = document.getElementById('cursor-light');

    // Only active on desktop/mouse devices to save performance on mobile
    if (matchMedia('(pointer:fine)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorLight.style.left = e.clientX + 'px';
            cursorLight.style.top = e.clientY + 'px';
        });

        // Optional: Pulse effect/Intensify on hover of interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, textarea, .service-card');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorLight.style.width = '550px';
                cursorLight.style.height = '550px';
                cursorLight.style.background = 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0) 70%)';
            });
            el.addEventListener('mouseleave', () => {
                cursorLight.style.width = '400px';
                cursorLight.style.height = '400px';
                cursorLight.style.background = 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)';
            });
        });
    } else {
        // Disable on touch devices
        cursorLight.style.display = 'none';
    }

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- Smooth Scroll for Anchors ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-list li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // --- WhatsApp Form Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('user-name').value;
            const phone = document.getElementById('user-phone').value;
            const message = document.getElementById('user-message').value;

            // Format phone number
            const ownerPhone = '918120803821';

            const formattedMessage = `*New Booking Request*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message}`;

            const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(formattedMessage)}`;

            window.open(whatsappUrl, '_blank');

            // Optional: Clear form
            contactForm.reset();
        });
    }
});
