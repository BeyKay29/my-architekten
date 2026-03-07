/* ==========================================================================
   MY-ARCHITEKTEN — Main JavaScript v2.0
   Performance-optimized, accessible
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initAccordion();
    initSmoothScroll();
});

/* ==========================================================================
   Navigation
   ========================================================================== */

function initNavigation() {
    const nav = document.getElementById('main-nav');
    const toggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!nav) return;

    // Scroll — glassmorphism nav on scroll
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                nav.classList.toggle('scrolled', window.scrollY > 50);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Mobile toggle
    if (toggle && mobileMenu) {
        const closeMobile = () => {
            toggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        };

        const openMobile = () => {
            toggle.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        toggle.addEventListener('click', () => {
            mobileMenu.classList.contains('active') ? closeMobile() : openMobile();
        });

        // Close on link click
        mobileMenu.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
            link.addEventListener('click', closeMobile);
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobile();
            }
        });
    }
}

/* ==========================================================================
   Scroll Animations (Intersection Observer)
   ========================================================================== */

function initScrollAnimations() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Accordion (Leistungsphasen / FAQ)
   ========================================================================== */

function initAccordion() {
    const phaseItems = document.querySelectorAll('.phase-item');
    if (!phaseItems.length) return;

    phaseItems.forEach(item => {
        const header = item.querySelector('.phase-header');
        if (!header) return;

        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all
            phaseItems.forEach(i => i.classList.remove('active'));

            // Toggle current
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Smooth Scroll
   ========================================================================== */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
