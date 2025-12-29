/* ============================================
   ABHISHEK KUMAR - PORTFOLIO WEBSITE
   JavaScript - FIXED VERSION
   Version: 1.1.0 (Preloader Fixed)
============================================ */

'use strict';

/* ============================================
   1. DOM ELEMENTS & VARIABLES
============================================ */

// Preloader
const preloader = document.getElementById('preloader');

// Cursor
const cursorDot = document.getElementById('cursorDot');
const cursorOutline = document.getElementById('cursorOutline');

// Navigation
const header = document.getElementById('header');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');
const navLinks = document.querySelectorAll('.nav-link');

// Theme
const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');

// Scroll Progress
const scrollProgress = document.getElementById('scrollProgress');

// Typing Animation
const typingText = document.getElementById('typingText');
const typingPhrases = [
    'Building Cool Projects 🚀',
    'Learning Cybersecurity 🛡️',
    'Exploring AI & ML 🤖',
    'Writing Clean Code 💻',
    'Solving Problems 🎯'
];

// Counters
const counterNumbers = document.querySelectorAll('.counter-number[data-target]');

// Skill Bars
const skillBars = document.querySelectorAll('.skill-progress');

// Project Filters
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Profile Card
const profileCard = document.getElementById('profileCard');

// Back to Top
const backToTop = document.getElementById('backToTop');

// Floating Contact
const floatingContact = document.getElementById('floatingContact');
const floatingMainBtn = document.getElementById('floatingMainBtn');

// Modals
const ageModal = document.getElementById('ageModal');
const verifyAgeBtn = document.getElementById('verifyAgeBtn');
const ageConfirm = document.getElementById('ageConfirm');
const ageDeny = document.getElementById('ageDeny');

// Toast Container
const toastContainer = document.getElementById('toastContainer');

// Contact Form
const contactForm = document.getElementById('contactForm');

// Copy Buttons
const copyBtns = document.querySelectorAll('.copy-btn');

// Timeline
const timelineProgress = document.getElementById('timelineProgress');

// Current Year
const currentYear = document.getElementById('currentYear');

/* ============================================
   2. PRELOADER - FIXED VERSION
============================================ */

let preloaderHidden = false;

function hidePreloader() {
    if (preloaderHidden) return; // Prevent multiple calls
    preloaderHidden = true;
    
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        preloader.classList.add('loaded');
        document.body.classList.remove('no-scroll');
        
        // Remove preloader from DOM after animation
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
    
    // Initialize animations
    setTimeout(() => {
        if (typeof initAOS === 'function') initAOS();
        if (typeof startTypingAnimation === 'function') startTypingAnimation();
        if (typeof initParticles === 'function') initParticles();
        if (typeof initGSAPAnimations === 'function') initGSAPAnimations();
    }, 100);
    
    console.log('✅ Preloader hidden successfully');
}

// Multiple fallback methods to ensure preloader hides

// Method 1: After DOMContentLoaded + small delay
document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded');
    setTimeout(hidePreloader, 1500);
});

// Method 2: After full page load
window.addEventListener('load', () => {
    console.log('🌐 Window Loaded');
    setTimeout(hidePreloader, 300);
});

// Method 3: Ultimate fallback - always hide after 4 seconds
setTimeout(() => {
    console.log('⏰ Fallback timer triggered');
    hidePreloader();
}, 4000);

/* ============================================
   3. CUSTOM CURSOR
============================================ */

let cursorX = 0;
let cursorY = 0;
let outlineX = 0;
let outlineY = 0;

function initCustomCursor() {
    if (!cursorDot || !cursorOutline) return;
    
    // Check if device supports hover (not touch device)
    if (window.matchMedia('(hover: none)').matches) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        // Update dot immediately
        cursorDot.style.left = `${cursorX}px`;
        cursorDot.style.top = `${cursorY}px`;
    });
    
    // Smooth outline following
    function animateOutline() {
        outlineX += (cursorX - outlineX) * 0.15;
        outlineY += (cursorY - outlineY) * 0.15;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        requestAnimationFrame(animateOutline);
    }
    animateOutline();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .tech-icon');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
    
    // Click effect
    document.addEventListener('mousedown', () => {
        cursorOutline.classList.add('click');
    });
    
    document.addEventListener('mouseup', () => {
        cursorOutline.classList.remove('click');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '0.5';
    });
}

// Initialize cursor after a short delay
setTimeout(initCustomCursor, 100);

/* ============================================
   4. THEME TOGGLE (DARK/LIGHT)
============================================ */

function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    showToast('success', 'Theme Changed', `Switched to ${newTheme} mode`);
}

// Initialize theme immediately
initTheme();

// Theme toggle click handlers
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

if (themeToggleMobile) {
    themeToggleMobile.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    }
});

/* ============================================
   5. NAVIGATION & MOBILE MENU
============================================ */

function openMobileMenu() {
    if (navMenu) navMenu.classList.add('show');
    if (navToggle) navToggle.classList.add('active');
    document.body.classList.add('no-scroll');
}

function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('show');
    if (navToggle) navToggle.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('show')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
}

// Close mobile menu
if (navClose) {
    navClose.addEventListener('click', closeMobileMenu);
}

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show') && 
        !navMenu.contains(e.target) && 
        navToggle && !navToggle.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
        closeMobileMenu();
    }
});

/* ============================================
   6. SCROLL PROGRESS BAR
============================================ */

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    
    if (scrollProgress) {
        scrollProgress.style.width = `${scrollPercent}%`;
    }
    
    // Update back to top button progress ring
    if (backToTop) {
        const circle = backToTop.querySelector('.progress-ring-circle');
        if (circle) {
            const circumference = 283;
            const offset = circumference - (scrollPercent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
    }
}

window.addEventListener('scroll', updateScrollProgress);

/* ============================================
   7. HEADER SCROLL EFFECT
============================================ */

function handleHeaderScroll() {
    if (!header) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

/* ============================================
   8. SMOOTH SCROLLING
============================================ */

function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Handle anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            smoothScroll(href);
        }
    });
});

/* ============================================
   9. ACTIVE NAVIGATION LINK
============================================ */

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

/* ============================================
   10. TYPING ANIMATION
============================================ */

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let typingStarted = false;

function typeText() {
    if (!typingText) return;
    
    const currentPhrase = typingPhrases[typingIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typingDelay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingPhrases.length;
        typingDelay = 500;
    }
    
    setTimeout(typeText, typingDelay);
}

function startTypingAnimation() {
    if (typingStarted) return;
    typingStarted = true;
    setTimeout(typeText, 1000);
}

/* ============================================
   11. COUNTER ANIMATION
============================================ */

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    if (isNaN(target)) return;
    
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += step;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };
    
    updateCounter();
}

function initCounterAnimation() {
    if (counterNumbers.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counterNumbers.forEach(counter => observer.observe(counter));
}

initCounterAnimation();

/* ============================================
   12. SKILL BAR ANIMATION
============================================ */

function animateSkillBars() {
    if (skillBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute('data-progress');
                entry.target.style.setProperty('--progress', `${progress}%`);
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => observer.observe(bar));
}

animateSkillBars();

/* ============================================
   13. PROJECT FILTERING
============================================ */

function filterProjects(category) {
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        
        if (category === 'all' || cardCategory.includes(category)) {
            card.classList.remove('hidden');
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 50);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.classList.add('hidden');
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Filter button click handlers
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        filterProjects(filter);
    });
});

/* ============================================
   14. TESTIMONIALS SWIPER
============================================ */

function initTestimonialsSwiper() {
    if (typeof Swiper === 'undefined') {
        console.log('Swiper not loaded');
        return;
    }
    
    const swiperContainer = document.querySelector('.testimonialsSwiper');
    if (!swiperContainer) return;
    
    new Swiper('.testimonialsSwiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
    
    console.log('✅ Swiper initialized');
}

// Initialize after DOM is ready
document.addEventListener('DOMContentLoaded', initTestimonialsSwiper);

/* ============================================
   15. TIMELINE ANIMATION
============================================ */

function animateTimeline() {
    const timeline = document.querySelector('.timeline');
    const timelineProgress = document.getElementById('timelineProgress');
    
    if (!timeline || !timelineProgress) return;
    
    function updateTimeline() {
        const rect = timeline.getBoundingClientRect();
        const timelineTop = rect.top;
        const timelineHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (timelineTop < windowHeight && timelineTop + timelineHeight > 0) {
            const scrollPercent = Math.min(
                Math.max(((windowHeight - timelineTop) / (timelineHeight + windowHeight)) * 100, 0),
                100
            );
            timelineProgress.style.height = `${scrollPercent}%`;
        }
    }
    
    window.addEventListener('scroll', updateTimeline);
    updateTimeline();
}

animateTimeline();

/* ============================================
   16. AGE VERIFICATION MODAL
============================================ */

function showAgeModal() {
    if (ageModal) {
        ageModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }
}

function hideAgeModal() {
    if (ageModal) {
        ageModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
    }
}

function handleAgeVerification(verified) {
    hideAgeModal();
    
    if (verified) {
        const adultContent = document.getElementById('adultProjectContent');
        const blurOverlay = document.querySelector('.fun-card-blur');
        
        if (adultContent) adultContent.classList.remove('hidden');
        if (blurOverlay) blurOverlay.classList.add('hidden');
        
        sessionStorage.setItem('ageVerified', 'true');
        showToast('success', 'Verified', 'Age verification successful');
    } else {
        showToast('info', 'Access Denied', 'You must be 18+ to view this content');
    }
}

// Event listeners
if (verifyAgeBtn) {
    verifyAgeBtn.addEventListener('click', showAgeModal);
}

if (ageConfirm) {
    ageConfirm.addEventListener('click', () => handleAgeVerification(true));
}

if (ageDeny) {
    ageDeny.addEventListener('click', () => handleAgeVerification(false));
}

if (ageModal) {
    const overlay = ageModal.querySelector('.modal-overlay');
    if (overlay) {
        overlay.addEventListener('click', hideAgeModal);
    }
}

// Check if already verified
if (sessionStorage.getItem('ageVerified') === 'true') {
    const adultContent = document.getElementById('adultProjectContent');
    const blurOverlay = document.querySelector('.fun-card-blur');
    
    if (adultContent) adultContent.classList.remove('hidden');
    if (blurOverlay) blurOverlay.classList.add('hidden');
}

/* ============================================
   17. COPY TO CLIPBOARD
============================================ */

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        
        try {
            document.execCommand('copy');
            document.body.removeChild(textarea);
            return true;
        } catch (e) {
            document.body.removeChild(textarea);
            return false;
        }
    }
}

// Copy button handlers
copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy');
        const success = await copyToClipboard(textToCopy);
        
        if (success) {
            const originalIcon = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i><span class="copy-tooltip">Copied!</span>';
            
            showToast('success', 'Copied!', 'Text copied to clipboard');
            
            setTimeout(() => {
                btn.innerHTML = originalIcon;
            }, 2000);
        } else {
            showToast('error', 'Failed', 'Could not copy to clipboard');
        }
    });
});

/* ============================================
   18. TOAST NOTIFICATIONS
============================================ */

function showToast(type = 'info', title = '', message = '', duration = 4000) {
    const container = document.getElementById('toastContainer');
    if (!container) {
        console.log('Toast:', type, title, message);
        return;
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check',
        error: 'fa-times',
        info: 'fa-info',
        warning: 'fa-exclamation'
    };
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    container.appendChild(toast);
    
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => removeToast(toast));
    }
    
    setTimeout(() => removeToast(toast), duration);
}

function removeToast(toast) {
    if (!toast) return;
    toast.classList.add('removing');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 300);
}

// Make showToast globally available
window.showToast = showToast;

/* ============================================
   19. BACK TO TOP BUTTON
============================================ */

function handleBackToTop() {
    if (!backToTop) return;
    
    const scrollY = window.scrollY;
    
    if (scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

if (backToTop) {
    window.addEventListener('scroll', handleBackToTop);
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   20. FLOATING CONTACT BUTTON
============================================ */

if (floatingMainBtn && floatingContact) {
    floatingMainBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        floatingContact.classList.toggle('active');
    });
    
    document.addEventListener('click', (e) => {
        if (!floatingContact.contains(e.target)) {
            floatingContact.classList.remove('active');
        }
    });
}

/* ============================================
   21. PARALLAX EFFECTS
============================================ */

function initParallax() {
    const blobs = document.querySelectorAll('.gradient-blob');
    
    if (blobs.length === 0 || window.innerWidth < 768) return;
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 15;
            blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

initParallax();

/* ============================================
   22. PROFILE CARD TILT EFFECT
============================================ */

function initProfileCardTilt() {
    if (!profileCard || window.innerWidth < 1024) return;
    
    profileCard.addEventListener('mousemove', (e) => {
        const rect = profileCard.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        profileCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        
        const glow = profileCard.querySelector('.card-glow');
        if (glow) {
            glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(102, 126, 234, 0.4), transparent 50%)`;
        }
    });
    
    profileCard.addEventListener('mouseleave', () => {
        profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        
        const glow = profileCard.querySelector('.card-glow');
        if (glow) {
            glow.style.background = '';
        }
    });
}

initProfileCardTilt();

/* ============================================
   23. EASTER EGG (KONAMI CODE)
============================================ */

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

function activateEasterEgg() {
    document.body.classList.add('easter-egg-active');
    createConfetti();
    showToast('success', '🎉 Easter Egg Found!', 'You discovered the secret!');
    
    setTimeout(() => {
        document.body.classList.remove('easter-egg-active');
    }, 10000);
}

function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#00d4ff', '#f5576c', '#fbbf24'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            pointer-events: none;
            z-index: 10000;
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
    
    if (!document.getElementById('confetti-style')) {
        const style = document.createElement('style');
        style.id = 'confetti-style';
        style.textContent = `
            @keyframes confetti-fall {
                to {
                    transform: translateY(100vh) rotate(720deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

/* ============================================
   24. CONTACT FORM HANDLING
============================================ */

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.btn-submit');
        
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
        
        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showToast('success', 'Message Sent!', 'Thank you! I\'ll get back to you soon.');
            contactForm.reset();
            
        } catch (error) {
            showToast('error', 'Error', 'Something went wrong. Please try again.');
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }
    });
}

/* ============================================
   25. AOS INITIALIZATION
============================================ */

function initAOS() {
    if (typeof AOS === 'undefined') {
        console.log('AOS not loaded');
        return;
    }
    
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50,
        delay: 0,
        disable: window.innerWidth < 768 ? 'mobile' : false
    });
    
    console.log('✅ AOS initialized');
}

/* ============================================
   26. GSAP ANIMATIONS
============================================ */

function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        console.log('GSAP not loaded');
        return;
    }
    
    // Hero animations
    gsap.from('.hero-tag', { opacity: 0, y: 30, duration: 0.8, delay: 0.2 });
    gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.4 });
    gsap.from('.hero-role', { opacity: 0, y: 30, duration: 0.8, delay: 0.6 });
    gsap.from('.hero-typing', { opacity: 0, duration: 0.8, delay: 0.8 });
    gsap.from('.hero-description', { opacity: 0, y: 20, duration: 0.8, delay: 1 });
    gsap.from('.hero-buttons .btn', { opacity: 0, y: 20, duration: 0.6, stagger: 0.2, delay: 1.2 });
    gsap.from('.hero-socials', { opacity: 0, y: 20, duration: 0.6, delay: 1.6 });
    gsap.from('.profile-card', { opacity: 0, scale: 0.8, duration: 1, delay: 0.5, ease: 'back.out(1.7)' });
    gsap.from('.floating-badge', { opacity: 0, scale: 0, duration: 0.5, stagger: 0.1, delay: 1.5, ease: 'back.out(1.7)' });
    
    console.log('✅ GSAP initialized');
}

/* ============================================
   27. PARTICLES EFFECT
============================================ */

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 20;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(102, 126, 234, ${Math.random() * 0.5 + 0.1});
            border-radius: 50%;
            left: ${x}%;
            bottom: -10px;
            pointer-events: none;
            animation: particle-float ${duration}s linear ${delay}s infinite;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add particle animation if not exists
    if (!document.getElementById('particle-style')) {
        const style = document.createElement('style');
        style.id = 'particle-style';
        style.textContent = `
            @keyframes particle-float {
                0%, 100% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% {
                    transform: translateY(-100vh) translateX(50px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    console.log('✅ Particles initialized');
}

/* ============================================
   28. UTILITY FUNCTIONS
============================================ */

// Get current year for footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Console easter egg
console.log(`
%c╔═══════════════════════════════════════════╗
║   👋 Hello, Developer!                    ║
║   Built with ❤️ by Abhishek Kumar         ║
║   📧 abhishekyadav954698@gmail.com        ║
╚═══════════════════════════════════════════╝
`, 'color: #667eea; font-weight: bold;');

/* ============================================
   INITIALIZATION ON DOM READY
============================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio initializing...');
    
    // Add no-scroll for preloader
    document.body.classList.add('no-scroll');
    
    // Initialize theme
    initTheme();
    
    // Initialize scroll-based features
    handleHeaderScroll();
    updateActiveNavLink();
    handleBackToTop();
    updateScrollProgress();
    
    console.log('✅ Initial setup complete');
});
/* ============================================
   PROJECT SHARE FEATURE - COMPLETE JAVASCRIPT
============================================ */

// Share Quotes Array
const shareQuotes = [
    "Check out this amazing project! 🚀",
    "This is what creativity looks like! ✨",
    "Wow! You need to see this project! 🔥",
    "Built with passion and code! 💻",
    "Innovation at its finest! 🌟",
    "This project blew my mind! 🤯",
    "Talent + Hard work = This masterpiece! 💪",
    "From idea to reality - Check this out! 💡",
    "When coding becomes art! 🎨",
    "Future developer in action! 🎯",
    "This deserves your attention! 👀",
    "Impressive work by a student developer! 📚",
    "Simple yet powerful! ⚡",
    "Clean code, beautiful design! 🎭",
    "Technology meets creativity! 🔮"
];

// DOM Elements
const shareModal = document.getElementById('shareModal');
const shareModalClose = document.getElementById('shareModalClose');
const shareProjectName = document.getElementById('shareProjectName');
const shareQuoteEl = document.getElementById('shareQuote');
const refreshQuoteBtn = document.getElementById('refreshQuote');
const sharePreviewImg = document.getElementById('sharePreviewImg');
const sharePreviewTitle = document.getElementById('sharePreviewTitle');
const sharePreviewDesc = document.getElementById('sharePreviewDesc');
const shareLinkInput = document.getElementById('shareLink');
const copyShareLinkBtn = document.getElementById('copyShareLink');
const shareWhatsApp = document.getElementById('shareWhatsApp');
const shareTwitter = document.getElementById('shareTwitter');
const shareFacebook = document.getElementById('shareFacebook');
const shareLinkedIn = document.getElementById('shareLinkedIn');
const shareTelegram = document.getElementById('shareTelegram');
const shareNative = document.getElementById('shareNative');

// Current Project Data
let currentProject = {
    id: '',
    name: '',
    desc: '',
    url: '',
    image: ''
};

// Get Random Quote
function getRandomQuote() {
    return shareQuotes[Math.floor(Math.random() * shareQuotes.length)];
}

// Generate Share URL
function generateShareURL(projectId) {
    const baseURL = window.location.origin + window.location.pathname;
    return `${baseURL}?project=${projectId}#project-${projectId}`;
}

// Open Share Modal
function openShareModal(projectData) {
    currentProject = projectData;
    
    // Set modal data
    shareProjectName.textContent = projectData.name;
    sharePreviewTitle.textContent = projectData.name;
    sharePreviewDesc.textContent = projectData.desc;
    
    // Set share link
    const shareURL = generateShareURL(projectData.id);
    shareLinkInput.value = shareURL;
    currentProject.url = shareURL;
    
    // Set preview image
    const projectCard = document.getElementById(`project-${projectData.id}`);
    if (projectCard) {
        const img = projectCard.querySelector('.project-image img');
        if (img) {
            currentProject.image = img.src;
            sharePreviewImg.innerHTML = `<img src="${img.src}" alt="${projectData.name}">`;
        }
    }
    
    // Set random quote
    shareQuoteEl.textContent = getRandomQuote();
    
    // Show modal
    shareModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close Share Modal
function closeShareModal() {
    shareModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Copy Share Link
async function copyShareLink() {
    try {
        await navigator.clipboard.writeText(shareLinkInput.value);
        
        // Update button
        copyShareLinkBtn.classList.add('copied');
        copyShareLinkBtn.innerHTML = '<i class="fas fa-check"></i><span>Copied!</span>';
        
        showToast('success', 'Link Copied!', 'Share link copied to clipboard');
        
        setTimeout(() => {
            copyShareLinkBtn.classList.remove('copied');
            copyShareLinkBtn.innerHTML = '<i class="fas fa-copy"></i><span>Copy</span>';
        }, 2000);
    } catch (err) {
        // Fallback
        shareLinkInput.select();
        document.execCommand('copy');
        showToast('success', 'Link Copied!', 'Share link copied to clipboard');
    }
}

// Generate Share Text
function getShareText() {
    const quote = shareQuoteEl.textContent;
    return `${quote}\n\n🚀 ${currentProject.name}\n${currentProject.desc}\n\n👨‍💻 By Abhishek Kumar\n🔗 `;
}

// Share Functions
function shareToWhatsApp() {
    const text = encodeURIComponent(getShareText() + currentProject.url);
    window.open(`https://wa.me/?text=${text}`, '_blank');
}

function shareToTwitter() {
    const text = encodeURIComponent(`${shareQuoteEl.textContent} 🚀\n\n${currentProject.name} by @abhishek\n`);
    const url = encodeURIComponent(currentProject.url);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareToFacebook() {
    const url = encodeURIComponent(currentProject.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareToLinkedIn() {
    const url = encodeURIComponent(currentProject.url);
    const title = encodeURIComponent(currentProject.name);
    const summary = encodeURIComponent(currentProject.desc);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function shareToTelegram() {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent(currentProject.url);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
}

async function shareNativeHandler() {
    if (navigator.share) {
        try {
            await navigator.share({
                title: currentProject.name,
                text: `${shareQuoteEl.textContent} - ${currentProject.name} by Abhishek Kumar`,
                url: currentProject.url
            });
        } catch (err) {
            console.log('Share cancelled');
        }
    } else {
        copyShareLink();
    }
}

// Check for Shared Project on Page Load
function checkSharedProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    
    if (projectId) {
        const projectCard = document.getElementById(`project-${projectId}`);
        
        if (projectCard) {
            // Wait for page to load
            setTimeout(() => {
                // Scroll to project
                const headerHeight = document.getElementById('header')?.offsetHeight || 80;
                const projectPosition = projectCard.getBoundingClientRect().top + window.scrollY - headerHeight - 50;
                
                window.scrollTo({
                    top: projectPosition,
                    behavior: 'smooth'
                });
                
                // Add highlight animation
                setTimeout(() => {
                    projectCard.classList.add('shared-highlight');
                    
                    // Remove highlight class after animation
                    setTimeout(() => {
                        projectCard.classList.remove('shared-highlight');
                        
                        // Clean URL without reloading
                        const cleanURL = window.location.origin + window.location.pathname + '#projects';
                        window.history.replaceState({}, document.title, cleanURL);
                    }, 3500);
                }, 500);
                
            }, 1000);
        }
    }
}

// Event Listeners for Share Buttons
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const projectData = {
            id: btn.dataset.projectId,
            name: btn.dataset.projectName,
            desc: btn.dataset.projectDesc
        };
        
        openShareModal(projectData);
    });
});

// Modal Close Events
if (shareModalClose) {
    shareModalClose.addEventListener('click', closeShareModal);
}

if (shareModal) {
    shareModal.querySelector('.share-modal-overlay').addEventListener('click', closeShareModal);
}

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && shareModal?.classList.contains('active')) {
        closeShareModal();
    }
});

// Refresh Quote
if (refreshQuoteBtn) {
    refreshQuoteBtn.addEventListener('click', () => {
        shareQuoteEl.textContent = getRandomQuote();
        refreshQuoteBtn.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            refreshQuoteBtn.style.transform = '';
        }, 300);
    });
}

// Copy Link Button
if (copyShareLinkBtn) {
    copyShareLinkBtn.addEventListener('click', copyShareLink);
}

// Social Share Buttons
if (shareWhatsApp) shareWhatsApp.addEventListener('click', shareToWhatsApp);
if (shareTwitter) shareTwitter.addEventListener('click', shareToTwitter);
if (shareFacebook) shareFacebook.addEventListener('click', shareToFacebook);
if (shareLinkedIn) shareLinkedIn.addEventListener('click', shareToLinkedIn);
if (shareTelegram) shareTelegram.addEventListener('click', shareToTelegram);
if (shareNative) shareNative.addEventListener('click', shareNativeHandler);

// Check for shared project on load
document.addEventListener('DOMContentLoaded', checkSharedProject);

// Also check after preloader hides
setTimeout(checkSharedProject, 2000);

console.log('✅ Share feature initialized');
