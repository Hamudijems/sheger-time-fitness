// Immediate fixes for tab and form functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying immediate fixes for About and Contact sections');
    
    // Fix About section tabs
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Make sure first tab is active
    if (tabItems.length > 0 && tabPanes.length > 0) {
        // Reset all tabs and panes
        tabItems.forEach(item => item.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Set first tab and pane as active
        tabItems[0].classList.add('active');
        tabPanes[0].classList.add('active');
        
        // Set basic click handlers for tabs
        tabItems.forEach(tab => {
            tab.addEventListener('click', function() {
                // Get the tab ID
                const tabId = this.getAttribute('data-tab');
                
                // Reset active classes
                tabItems.forEach(item => item.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Set active classes
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Fix Contact section form selectors
    const formSelectors = document.querySelectorAll('.form-selector');
    const formContents = document.querySelectorAll('.form-content');
    
    // Make sure first form is active
    if (formSelectors.length > 0 && formContents.length > 0) {
        // Reset all selectors and forms
        formSelectors.forEach(item => item.classList.remove('active'));
        formContents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });
        
        // Set first selector and form as active
        formSelectors[0].classList.add('active');
        formContents[0].classList.add('active');
        formContents[0].style.display = 'block';
        
        // Set basic click handlers for form selectors
        formSelectors.forEach(selector => {
            selector.addEventListener('click', function() {
                // Get the form ID
                const formId = this.getAttribute('data-form');
                
                // Reset active classes
                formSelectors.forEach(item => item.classList.remove('active'));
                formContents.forEach(content => {
                    content.classList.remove('active');
                    content.style.display = 'none';
                });
                
                // Set active classes
                this.classList.add('active');
                const activeForm = document.getElementById(formId + '-form');
                if (activeForm) {
                    activeForm.classList.add('active');
                    activeForm.style.display = 'block';
                }
            });
        });
    }
    
    // Make sure all form submissions are handled
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submission successful! We will contact you soon.');
            this.reset();
        });
    });
    
    // Add special highlight for About and Contact nav items to draw attention
    const aboutNavLink = document.querySelector('a[href="#about"]');
    const contactNavLink = document.querySelector('a[href="#contact"]');
    
    if (aboutNavLink) {
        aboutNavLink.style.color = 'var(--primary-color)';
        aboutNavLink.style.fontWeight = 'bold';
        aboutNavLink.innerHTML = '<span>✨ About ✨</span>';
    }
    
    if (contactNavLink) {
        contactNavLink.style.color = 'var(--primary-color)';
        contactNavLink.style.fontWeight = 'bold';
        contactNavLink.innerHTML = '<span>✨ Contact ✨</span>';
    }
    
    // Add automatic scrolling to About and Contact when page loads
    // Check if URL has hash
    const hash = window.location.hash;
    if (hash === '#about' || hash === '#contact') {
        // Wait a bit for page to load
        setTimeout(() => {
            const section = document.querySelector(hash);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
                
                // Flash the section
                section.style.animation = 'flash-highlight 1s 3';
            }
        }, 1000);
    } else {
        // If no hash, add buttons at the top to navigate to these sections
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            const quickNavButtons = document.createElement('div');
            quickNavButtons.className = 'quick-nav-buttons';
            quickNavButtons.style.marginTop = '30px';
            quickNavButtons.style.display = 'flex';
            quickNavButtons.style.justifyContent = 'center';
            quickNavButtons.style.gap = '20px';
            
            quickNavButtons.innerHTML = `
                <button id="goto-about" style="padding: 10px 20px; background: var(--primary-color); color: white; border: none; cursor: pointer; font-weight: bold; border-radius: 5px;">Explore About</button>
                <button id="goto-contact" style="padding: 10px 20px; background: var(--primary-color); color: white; border: none; cursor: pointer; font-weight: bold; border-radius: 5px;">View Contact</button>
            `;
            
            heroContent.appendChild(quickNavButtons);
            
            // Add click handlers
            document.getElementById('goto-about').addEventListener('click', function() {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
            
            document.getElementById('goto-contact').addEventListener('click', function() {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }
    
    // Add flash animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes flash-highlight {
            0% { background-color: transparent; }
            50% { background-color: rgba(255, 0, 0, 0.2); }
            100% { background-color: transparent; }
        }
    `;
    document.head.appendChild(style);
    
    console.log('Fixes applied successfully');
});

// Animation initialization with anime.js
document.addEventListener('DOMContentLoaded', function() {
    // Run only if anime.js is available
    if (typeof anime !== 'undefined') {
        // Hero section animations
        anime({
            targets: '.hero-content',
            opacity: [0, 1],
            translateY: [50, 0],
            easing: 'easeOutExpo',
            duration: 1500,
            delay: 300
        });
        
        // Animate logo
        anime({
            targets: '.logo-container',
            opacity: [0, 1],
            translateX: [-50, 0],
            easing: 'easeOutExpo',
            duration: 1200
        });
        
        // Animate nav links with staggered delay
        anime({
            targets: '.nav-item',
            opacity: [0, 1],
            translateY: [-20, 0],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(100, {start: 500})
        });
    }
    
    // Fallback for browsers without proper backdrop-filter support
    if (!CSS.supports('backdrop-filter', 'blur(10px)') && !CSS.supports('-webkit-backdrop-filter', 'blur(10px)')) {
        const glassElements = document.querySelectorAll('.glass-nav, .hero-content');
        
        glassElements.forEach(element => {
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        });
    }
    
    // Fix for testimonial slider if no testimony is shown
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0 && window.getComputedStyle(testimonialCards[0]).display === 'none') {
        testimonialCards[0].style.display = 'block';
    }
    
    // Fix for Safari flex gap support
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
        document.body.classList.add('safari');
        
        // Add margin to elements that should have gap
        const elementsWithGap = document.querySelectorAll('.cta-buttons, .services-grid, .trainers-grid, .pricing-grid, .footer-links');
        elementsWithGap.forEach(element => {
            const children = element.children;
            for (let i = 0; i < children.length; i++) {
                if (i > 0) {
                    children[i].style.marginLeft = '20px';
                }
                children[i].style.marginBottom = '20px';
            }
        });
    }
    
    // Form validation and submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            if (name.value.trim() === '') {
                markInvalid(name);
                isValid = false;
            } else {
                markValid(name);
            }
            
            if (email.value.trim() === '' || !validateEmail(email.value)) {
                markInvalid(email);
                isValid = false;
            } else {
                markValid(email);
            }
            
            if (message.value.trim() === '') {
                markInvalid(message);
                isValid = false;
            } else {
                markValid(message);
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Simulate network request
                setTimeout(function() {
                    submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                    contactForm.reset();
                    
                    // Reset button after 3 seconds
                    setTimeout(function() {
                        submitButton.innerHTML = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                }, 2000);
            }
        });
        
        // Add input event listeners for real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                if (input.value.trim() !== '') {
                    input.classList.remove('invalid');
                    input.classList.add('valid');
                }
            });
        });
    }
    
    function markInvalid(element) {
        element.classList.add('invalid');
        element.classList.remove('valid');
        
        // Shake animation
        element.animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(-5px)' },
            { transform: 'translateX(5px)' },
            { transform: 'translateX(0)' }
        ], {
            duration: 300,
            easing: 'ease-in-out'
        });
    }
    
    function markValid(element) {
        element.classList.remove('invalid');
        element.classList.add('valid');
    }
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

// PowerFit Gym Website - Core JavaScript Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.querySelector('.hamburger').classList.toggle('active');
        });
    }
    
    // Change navigation style on scroll
    const nav = document.querySelector('.glass-nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Testimonial Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    
   
    
    // Handle dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });
    

  
   
    
    // Handle form submissions
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message. We will get back to you soon!');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for the fixed header
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Add active class to nav links based on scroll position
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Set active link on page load and scroll
    window.addEventListener('scroll', setActiveNavLink);
    window.addEventListener('load', setActiveNavLink);
    
    // Enable accessibility keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Handle escape key for mobile menu
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            navToggle.querySelector('.hamburger').classList.remove('active');
        }
    });
    
    // Add focus visible class for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
}); 