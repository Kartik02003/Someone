/* ===================================
   PAGE NAVIGATION
   =================================== */

function goToPage(pageNumber) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // Show target page
    const targetPage = document.getElementById(`page-${pageNumber}`);
    if (targetPage) {
        setTimeout(() => {
            targetPage.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 50);
    }
}

/* ===================================
   NO BUTTON - MOVES AWAY
   =================================== */

function moveButton(button) {
    const noBtn = document.getElementById('no-btn');
    
    // Check if touch event (mobile)
    const isTouchEvent = event.type.startsWith('touch');
    
    // Only move on hover (desktop), not on touch start (mobile)
    if (isTouchEvent) {
        return;
    }

    // Get current button position
    const rect = noBtn.getBoundingClientRect();
    const buttonWidth = rect.width;
    const buttonHeight = rect.height;

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Generate random position
    let randomX = Math.random() * (viewportWidth - buttonWidth);
    let randomY = Math.random() * (viewportHeight - buttonHeight);

    // Ensure button stays within viewport
    randomX = Math.max(0, Math.min(randomX, viewportWidth - buttonWidth));
    randomY = Math.max(0, Math.min(randomY, viewportHeight - buttonHeight));

    // Apply position change
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

/* ===================================
   FINAL MESSAGE REVEAL
   =================================== */

function showFinalMessage() {
    const finalMessage = document.getElementById('final-message');
    finalMessage.classList.remove('hidden');
    
    // Add scroll animation to bring it into view
    setTimeout(() => {
        finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

/* ===================================
   PAGE LOAD INITIALIZATION
   =================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize with Page 1 active
    const page1 = document.getElementById('page-1');
    if (page1) {
        page1.classList.add('active');
    }

    // Smooth scroll behavior for navigation
    document.documentElement.style.scrollBehavior = 'smooth';

    // Optional: Log for debugging
    console.log('Website initialized. Welcome! ❤️');
});

/* ===================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   =================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

// Observe gallery cards for staggered animation
document.querySelectorAll('.gallery-card').forEach(card => {
    observer.observe(card);
});

// Observe other elements for fade-in animation
document.querySelectorAll('.message-section, .roses-message, .roses-display, .roses-subtitle, .roses-final-message, .quote').forEach(element => {
    observer.observe(element);
});

/* ===================================
   MOBILE OPTIMIZATIONS
   =================================== */

// Disable button movement on mobile
function detectMobileAndOptimize() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        const noBtn = document.getElementById('no-btn');
        if (noBtn) {
            noBtn.style.cursor = 'pointer';
            noBtn.removeAttribute('onmouseover');
            noBtn.removeAttribute('ontouchstart');
            
            // Add touch prevention
            noBtn.addEventListener('touchstart', function(e) {
                e.preventDefault();
            });
        }
    }
}

detectMobileAndOptimize();

/* ===================================
   KEYBOARD NAVIGATION
   =================================== */

document.addEventListener('keydown', function(e) {
    // Allow Tab key for accessibility
    if (e.key === 'Tab') {
        return;
    }

    // Optional: Add keyboard shortcuts if desired
    // ArrowRight to go next, ArrowLeft to go previous
    // Left as example - can be customized
});

/* ===================================
   PREVENT SCROLL WHILE ANIMATING
   =================================== */

let isTransitioning = false;

function setTransitionState(state) {
    isTransitioning = state;
    if (state) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

/* ===================================
   PERFORMANCE OPTIMIZATIONS
   =================================== */

// Lazy load images if needed
const images = document.querySelectorAll('img');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // Image already has src, so this is mainly for tracking
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/* ===================================
   SMOOTH PAGE TRANSITIONS
   =================================== */

// Override goToPage to include smooth transition state
const originalGoToPage = goToPage;
goToPage = function(pageNumber) {
    setTransitionState(true);
    
    setTimeout(() => {
        originalGoToPage(pageNumber);
        setTimeout(() => {
            setTransitionState(false);
        }, 600);
    }, 100);
};

/* ===================================
   HELPFUL CONSOLE MESSAGE
   =================================== */

console.log('%c❤️ This beautiful website was created with love ❤️', 
    'font-size: 16px; color: #d4a5d4; font-weight: bold; font-family: Georgia, serif;');
console.log('%cEnjoy every moment! 🌹', 
    'font-size: 14px; color: #e8b4d4; font-family: Georgia, serif;');
