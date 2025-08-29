// DOM Elements
const navHeader = document.getElementById('nav-header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const contactForm = document.getElementById('contact-form');

// Navigation functionality
function initNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Handle special case for home link
            if (targetId === '#hero') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = navHeader.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky navigation on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navHeader.classList.add('scrolled');
        } else {
            navHeader.classList.remove('scrolled');
        }
        
        updateActiveNavLink();
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = navHeader.offsetHeight;
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY - headerHeight - 100;
        const sectionBottom = sectionTop + section.offsetHeight;
        const currentScroll = window.scrollY;
        
        if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${section.id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}

// Countdown timer
function initCountdown() {
    const countdownDate = new Date('January 24, 2026 18:00:00').getTime();
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

            if (daysElement) daysElement.textContent = days;
            if (hoursElement) hoursElement.textContent = hours;
            if (minutesElement) minutesElement.textContent = minutes;
        } else {
            if (daysElement) daysElement.textContent = '0';
            if (hoursElement) hoursElement.textContent = '0';
            if (minutesElement) minutesElement.textContent = '0';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 60000); // Update every minute
}

// Tab functionality for travel section - Fixed implementation
function initTabs() {
    console.log('Initializing tabs...'); // Debug log
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Tab clicked:', btn.getAttribute('data-tab')); // Debug log
            
            const targetTab = btn.getAttribute('data-tab');
            
            // Remove active class from all tabs and content
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Content switched to:', targetTab); // Debug log
            } else {
                console.log('Target content not found:', targetTab); // Debug log
            }
        });
    });
}

// External link functionality - Fixed implementation
function initExternalLinks() {
    // Handle all external links and ticket buttons
    const externalLinks = document.querySelectorAll('a[href^="http"], button[onclick*="window.open"]');
    
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href') || 'https://in.bookmyshow.com/';
            
            // Open external link
            window.open(href, '_blank', 'noopener,noreferrer');
            
            // Visual feedback
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 150);
        });
    });

    // Specifically handle ticket buttons
    const ticketButtons = document.querySelectorAll('.ticket-card .btn, .hero-actions .btn--primary');
    ticketButtons.forEach(btn => {
        // Remove any existing onclick handlers
        btn.removeAttribute('onclick');
        
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Visual feedback
            btn.style.transform = 'scale(0.95)';
            const originalText = btn.textContent;
            btn.textContent = 'Opening BookMyShow...';
            btn.style.opacity = '0.8';
            
            // Open BookMyShow
            window.open('https://in.bookmyshow.com/', '_blank', 'noopener,noreferrer');
            
            // Reset button
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
                btn.textContent = originalText;
                btn.style.opacity = '1';
            }, 1000);
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.info-card, .ticket-card, .act-card, .checklist-category');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Contact form handling
function initContactForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const service = contactForm.querySelector('select').value;
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for your inquiry! We\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">&times;</button>
        </div>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius-base);
        padding: var(--space-16);
        box-shadow: var(--shadow-lg);
        max-width: 400px;
        transform: translateX(100%);
        transition: transform var(--duration-normal) var(--ease-standard);
        font-family: var(--font-family-base);
        color: var(--color-text);
    `;
    
    if (type === 'success') {
        notification.style.borderColor = 'var(--color-success)';
        notification.style.background = 'rgba(var(--color-success-rgb), 0.1)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--color-error)';
        notification.style.background = 'rgba(var(--color-error-rgb), 0.1)';
    }
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    const autoRemoveTimeout = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        clearTimeout(autoRemoveTimeout);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Checklist functionality
function initChecklist() {
    const checklistItems = document.querySelectorAll('.checklist-item');
    
    checklistItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const itemText = item.textContent.trim();
        
        // Load saved state from localStorage (with error handling)
        try {
            const savedState = localStorage.getItem(`checklist-${itemText}`);
            if (savedState === 'true') {
                checkbox.checked = true;
            }
        } catch (e) {
            console.log('LocalStorage not available');
        }
        
        // Save state on change
        checkbox.addEventListener('change', () => {
            try {
                localStorage.setItem(`checklist-${itemText}`, checkbox.checked);
            } catch (e) {
                console.log('LocalStorage not available');
            }
            
            if (checkbox.checked) {
                showChecklistProgress();
            }
        });
    });
}

function showChecklistProgress() {
    const totalItems = document.querySelectorAll('.checklist-item input[type="checkbox"]').length;
    const checkedItems = document.querySelectorAll('.checklist-item input[type="checkbox"]:checked').length;
    const progress = Math.round((checkedItems / totalItems) * 100);
    
    if (progress === 100) {
        showNotification('🎉 Congratulations! You\'ve completed your concert preparation checklist!', 'success');
    } else if (progress >= 50 && progress < 100) {
        showNotification(`Great progress! You're ${progress}% ready for the concert.`, 'info');
    }
}

// Smooth reveal animations
function initScrollAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        .info-card, .ticket-card, .act-card, .checklist-category {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .info-card.animate-in, .ticket-card.animate-in, .act-card.animate-in, .checklist-category.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-12);
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
            font-size: var(--font-size-lg);
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .notification-close:hover {
            color: var(--color-text);
        }
    `;
    document.head.appendChild(style);
}

// Social sharing functionality
function initSocialSharing() {
    // Add social sharing buttons dynamically
    const heroActions = document.querySelector('.hero-actions');
    if (heroActions) {
        const shareBtn = document.createElement('button');
        shareBtn.className = 'btn btn--secondary btn--lg';
        shareBtn.innerHTML = '📱 Share';
        shareBtn.addEventListener('click', shareContent);
        heroActions.appendChild(shareBtn);
    }
}

function shareContent() {
    const shareData = {
        title: 'Linkin Park India Debut 2026',
        text: 'Linkin Park is finally coming to India! Get your tickets for Lollapalooza India 2026 in Mumbai.',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(shareData).catch(err => {
            console.log('Share failed:', err);
            fallbackShare(shareData);
        });
    } else {
        fallbackShare(shareData);
    }
}

function fallbackShare(shareData) {
    const shareText = `${shareData.title} - ${shareData.text} ${shareData.url}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to copy link. Please copy manually.', 'error');
        });
    } else {
        showNotification('Sharing not supported. Please copy the URL manually.', 'info');
    }
}

// Search functionality for setlist
function initSetlistSearch() {
    const setlistSection = document.getElementById('setlist');
    if (setlistSection) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'setlist-search';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Search songs..." class="form-control" id="song-search">
        `;
        searchContainer.style.cssText = `
            margin: 0 0 var(--space-24);
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        `;
        
        const setlistIntro = setlistSection.querySelector('.setlist-intro');
        setlistIntro.after(searchContainer);
        
        const searchInput = document.getElementById('song-search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const songItems = document.querySelectorAll('.song-list li');
            
            songItems.forEach(item => {
                const songName = item.textContent.toLowerCase();
                if (songName.includes(searchTerm) || searchTerm === '') {
                    item.style.display = 'block';
                    item.style.background = songName.includes(searchTerm) && searchTerm !== '' ? 
                        'rgba(var(--color-primary-rgb, var(--color-teal-500-rgb)), 0.1)' : '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Linkin Park Guide...'); // Debug log
    
    initNavigation();
    initCountdown();
    initTabs();
    initExternalLinks(); // New function for external links
    initAnimations();
    initContactForm();
    initChecklist();
    initScrollAnimations();
    initSocialSharing();
    initSetlistSearch();
    initLazyLoading();
    
    // Initial call to set active nav link
    updateActiveNavLink();
    
    // Add a welcome message
    setTimeout(() => {
        showNotification('Welcome to the ultimate Linkin Park India 2026 guide! 🎸', 'info');
    }, 2000);
    
    console.log('Linkin Park Guide initialized successfully!'); // Debug log
});

// Handle page visibility change
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Refresh countdown when page becomes visible
        initCountdown();
    }
});

// Handle resize events
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // Arrow keys for tab navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeTab = document.querySelector('.tab-btn.active');
        if (activeTab) {
            const tabs = Array.from(document.querySelectorAll('.tab-btn'));
            const currentIndex = tabs.indexOf(activeTab);
            let nextIndex;
            
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[nextIndex].click();
        }
    }
});

// Export functions for potential external use
window.LinkinParkGuide = {
    showNotification,
    shareContent,
    updateActiveNavLink
};