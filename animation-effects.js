// Master animation system for the entire website
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing master animation system');
    
    // Preloader animation
    initPreloader();
    
    // Initialize hero section animations
    initHeroAnimations();
    
    // Initialize scroll-triggered animations
    initScrollAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Initialize section transitions
    initSectionTransitions();
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize cursor effects
    initCustomCursor();
    
    // Initialize page transitions
    initPageTransitions();
    
    // Initialize text animations
    initTextAnimations();
    
    // Initialize background effects
    initBackgroundEffects();
    
    // Preloader animation
    function initPreloader() {
        // Create preloader element
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="logo-container">
                    <div class="logo-icon"><i class="fas fa-fire"></i></div>
                </div>
                <div class="loading-bar"><div class="loading-progress"></div></div>
            </div>
        `;
        document.body.appendChild(preloader);
        
        // Style preloader
        const style = document.createElement('style');
        style.textContent = `
            .preloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #000;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: opacity 0.5s, visibility 0.5s;
            }
            .preloader-content {
                text-align: center;
            }
            .preloader .logo-icon {
                width: 80px;
                height: 80px;
                font-size: 40px;
                margin-bottom: 30px;
                animation: preloader-pulse 1s infinite alternate;
            }
            .loading-bar {
                width: 200px;
                height: 4px;
                background: rgba(255, 255, 255, 0.2);
                margin: 0 auto;
                position: relative;
                overflow: hidden;
            }
            .loading-progress {
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 0%;
                background: var(--primary-color);
                animation: loading 2s ease forwards;
            }
            @keyframes preloader-pulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.2); }
            }
            @keyframes loading {
                0% { width: 0%; }
                100% { width: 100%; }
            }
        `;
        document.head.appendChild(style);
        
        // Hide preloader after loading
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove preloader after fade out
            setTimeout(() => {
                document.body.removeChild(preloader);
            }, 500);
        }, 2000);
    }
    
    // Hero section animations
    function initHeroAnimations() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        // Add 3D parallax effect to hero section
        const heroContent = heroSection.querySelector('.hero-content');
        const heroBackground = heroSection.querySelector('.hero');
        
        // Create parallax effect on mouse move
        heroSection.addEventListener('mousemove', function(e) {
            const xPos = (window.innerWidth / 2 - e.clientX) / 30;
            const yPos = (window.innerHeight / 2 - e.clientY) / 30;
            
            if (heroContent) {
                heroContent.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
            }
            
            if (heroBackground) {
                heroBackground.style.backgroundPositionX = `calc(50% + ${xPos}px)`;
                heroBackground.style.backgroundPositionY = `calc(50% + ${yPos}px)`;
            }
        });
        
        // Create animated particles in hero background
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'hero-particles';
        heroSection.appendChild(particlesContainer);
        
        // Add particle styling
        const particleStyle = document.createElement('style');
        particleStyle.textContent = `
            .hero-particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .particle {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                pointer-events: none;
            }
        `;
        document.head.appendChild(particleStyle);
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size
            const size = Math.random() * 8 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Random position
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.top = `${Math.random() * 100}%`;
            
            // Random opacity
            particle.style.opacity = Math.random() * 0.5 + 0.1;
            
            // Add animation
            particle.style.animation = `float-particle ${Math.random() * 10 + 10}s infinite linear`;
            
            // Add to container
            particlesContainer.appendChild(particle);
        }
        
        // Add keyframes for floating particles
        const keyframes = document.createElement('style');
        keyframes.textContent = `
            @keyframes float-particle {
                0% {
                    transform: translateY(0) translateX(0);
                }
                25% {
                    transform: translateY(-${heroSection.offsetHeight/3}px) translateX(${heroSection.offsetWidth/5}px);
                }
                50% {
                    transform: translateY(-${heroSection.offsetHeight/2}px) translateX(-${heroSection.offsetWidth/5}px);
                }
                75% {
                    transform: translateY(-${heroSection.offsetHeight/4}px) translateX(${heroSection.offsetWidth/4}px);
                }
                100% {
                    transform: translateY(0) translateX(0);
                }
            }
        `;
        document.head.appendChild(keyframes);
        
        // Animate hero headings with split text effect
        const heroHeading = heroSection.querySelector('h1');
        if (heroHeading) {
            const originalText = heroHeading.textContent;
            let animatedText = '';
            
            // Split text into spans for individual animation
            for (let i = 0; i < originalText.length; i++) {
                const char = originalText[i] === ' ' ? '&nbsp;' : originalText[i];
                animatedText += `<span style="animation: text-reveal 0.5s ${i * 0.05}s forwards; 
                                        opacity: 0; 
                                        display: inline-block; 
                                        transform: translateY(20px);">${char}</span>`;
            }
            
            heroHeading.innerHTML = animatedText;
            
            // Add text reveal keyframes
            const textKeyframes = document.createElement('style');
            textKeyframes.textContent = `
                @keyframes text-reveal {
                    0% {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(textKeyframes);
        }
    }
    
    // Scroll animations
    function initScrollAnimations() {
        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll('.section-header, .service-card, .trainer-card, .pricing-card, .gallery-item, .testimonial-card, .contact-form');
        
        // Create intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Add animation base styles
        const scrollStyles = document.createElement('style');
        scrollStyles.textContent = `
            .section-header, .service-card, .trainer-card, .pricing-card, .gallery-item, .testimonial-card, .contact-form {
                opacity: 0;
                transform: translateY(50px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .service-card.animate-in, .trainer-card.animate-in, .pricing-card.animate-in {
                animation: card-pop 0.5s forwards;
            }
            
            @keyframes card-pop {
                0% {
                    transform: scale(0.8);
                }
                40% {
                    transform: scale(1.05);
                }
                100% {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(scrollStyles);
        
        // Observe all animated elements
        animatedElements.forEach(element => {
            observer.observe(element);
        });
        
        // Create staggered animation for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Create staggered animation for trainer cards
        const trainerCards = document.querySelectorAll('.trainer-card');
        trainerCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Create staggered animation for pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Gallery animate-in effect
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.05}s`;
        });
    }
    
    // Hover effects
    function initHoverEffects() {
        // Add hover effect to buttons
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Create ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // Add button ripple styles
        const rippleStyles = document.createElement('style');
        rippleStyles.textContent = `
            .btn {
                position: relative;
                overflow: hidden;
            }
            
            .btn-ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.4);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(rippleStyles);
        
        // Enhanced hover effects for service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hover');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hover');
            });
        });
        
        // Add service card hover styles
        const cardHoverStyles = document.createElement('style');
        cardHoverStyles.textContent = `
            .service-card {
                transition: transform 0.4s ease, box-shadow 0.4s ease;
            }
            
            .service-card.hover {
                transform: translateY(-15px) scale(1.03);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            }
            
            .service-card.hover .service-icon {
                transform: rotateY(360deg);
                background-color: var(--primary-color);
            }
            
            .service-card.hover .service-icon i {
                color: white;
            }
        `;
        document.head.appendChild(cardHoverStyles);
    }
    
    // Section transitions
    function initSectionTransitions() {
        // Add transition effect between sections
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                // Only prevent default for same-page links (starting with #)
                if (targetId.startsWith('#')) {
                e.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Create a pulsating highlight effect
                    const highlightElement = document.createElement('div');
                    highlightElement.className = 'section-transition-highlight';
                    document.body.appendChild(highlightElement);
                    
                    // Position the highlight
                    const rect = targetSection.getBoundingClientRect();
                    highlightElement.style.top = `${rect.top + window.scrollY}px`;
                    highlightElement.style.left = `${rect.left}px`;
                    highlightElement.style.width = `${rect.width}px`;
                    highlightElement.style.height = `${rect.height}px`;
                    
                    // Animate the highlight
                    setTimeout(() => {
                        highlightElement.classList.add('active');
                        
                        // Scroll to the section
                        window.scrollTo({
                            top: rect.top + window.scrollY - 100,
                            behavior: 'smooth'
                        });
                        
                        // Remove the highlight after animation
                        setTimeout(() => {
                            highlightElement.remove();
                        }, 500);
                    }, 100);
                
                // Update active nav link
                navLinks.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                    }
                }
            });
        });
        
        // Add section transition styles
        const transitionStyles = document.createElement('style');
        transitionStyles.textContent = `
            .section-transition-highlight {
                position: absolute;
                pointer-events: none;
                z-index: 9999;
                border: 2px solid var(--primary-color);
                opacity: 0;
                border-radius: 5px;
                transform: scale(0.95);
                transition: all 0.5s ease;
            }
            
            .section-transition-highlight.active {
                opacity: 1;
                transform: scale(1);
                box-shadow: 0 0 30px var(--primary-color);
            }
        `;
        document.head.appendChild(transitionStyles);
    }
    
    // Floating elements animation
    function initFloatingElements() {
        // Add floating animation to specific elements
        const elementsToFloat = [
            '.hero .btn',
            '.logo-icon',
            '.service-icon',
            '.pricing-header'
        ];
        
        elementsToFloat.forEach((selector, index) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Add different animation to each element type
                const duration = 3 + index + Math.random() * 2;
                const delay = Math.random() * 2;
                element.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
            });
        });
        
        // Add floating animation keyframes
        const floatStyles = document.createElement('style');
        floatStyles.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0);
                }
                50% {
                    transform: translateY(-10px);
                }
                100% {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(floatStyles);
    }
    
    // Custom cursor effect
    function initCustomCursor() {
        // Create custom cursor elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        
        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);
        
        // Add cursor styles
        const cursorStyles = document.createElement('style');
        cursorStyles.textContent = `
            .custom-cursor {
                position: fixed;
                width: 40px;
                height: 40px;
                border: 2px solid rgba(255, 0, 0, 0.5);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                transition: width 0.3s, height 0.3s, background 0.3s;
                z-index: 9999;
                mix-blend-mode: difference;
            }
            
            .cursor-dot {
                position: fixed;
                width: 6px;
                height: 6px;
                background-color: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                transform: translate(-50%, -50%);
                z-index: 9999;
                transition: transform 0.1s;
            }
            
            .custom-cursor.hover {
                width: 80px;
                height: 80px;
                background: rgba(255, 0, 0, 0.1);
                mix-blend-mode: normal;
            }
            
            .cursor-dot.hover {
                transform: translate(-50%, -50%) scale(1.5);
            }
            
            @media (max-width: 768px) {
                .custom-cursor, .cursor-dot {
                    display: none;
                }
            }
        `;
        document.head.appendChild(cursorStyles);
        
        // Track cursor position
        document.addEventListener('mousemove', e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
            
            // Add small delay to dot for trailing effect
            setTimeout(() => {
                cursorDot.style.left = `${e.clientX}px`;
                cursorDot.style.top = `${e.clientY}px`;
            }, 50);
        });
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .trainer-card, .pricing-card, .gallery-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorDot.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorDot.classList.remove('hover');
            });
        });
        
        // Hide cursor when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
            cursorDot.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
            cursorDot.style.display = 'block';
        });
    }
    
    // Page transition effects
    function initPageTransitions() {
        // Create page transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
        
        // Add overlay styles
        const overlayStyles = document.createElement('style');
        overlayStyles.textContent = `
            .page-transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--primary-color);
                z-index: 9999;
                transform: scaleX(0);
                transform-origin: right;
                transition: transform 0.5s ease;
                pointer-events: none;
            }
            
            .page-transition-overlay.active {
                transform: scaleX(1);
                transform-origin: left;
            }
            
            .page-transition-overlay.reverse {
                transform: scaleX(1);
                transform-origin: right;
            }
            
            .page-transition-overlay.reverse.active {
                transform: scaleX(0);
            }
        `;
        document.head.appendChild(overlayStyles);
        
        // Handle page transitions
        document.addEventListener('click', e => {
            // Find if a parent element is an anchor tag
            let anchorElement = e.target;
            while (anchorElement && anchorElement.tagName !== 'A') {
                anchorElement = anchorElement.parentElement;
            }
            
            if (!anchorElement) return;
            
            const href = anchorElement.getAttribute('href');
            
            // Check if clicked element is an external link or a page link (not anchor link)
            if (href && 
                ((href.startsWith('http') && !href.includes(window.location.hostname)) || 
                 (!href.startsWith('#') && !href.startsWith('javascript') && href.includes('.html')))) {
                e.preventDefault();
                
                // Show overlay
                overlay.classList.add('active');
                
                // Navigate to the link after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
        
        // Add transition when page loads
        window.addEventListener('load', () => {
            overlay.classList.add('reverse');
            
            setTimeout(() => {
                overlay.classList.add('active');
                
                // Remove overlay after animation
                setTimeout(() => {
                    overlay.remove();
                }, 500);
            }, 100);
        });
    }
    
    // Text animations
    function initTextAnimations() {
        // Add text reveal animation to headings
        const headings = document.querySelectorAll('.section-header h2');
        
        headings.forEach(heading => {
            // Apply animation only when in viewport
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Split text animation
                        const text = heading.textContent;
                        heading.innerHTML = '';
                        heading.style.opacity = '1';
                        
                        // Create wrapper for text
                        const wrapper = document.createElement('span');
                        wrapper.className = 'text-animation-wrapper';
                        heading.appendChild(wrapper);
                        
                        // Add each letter with delay
                        for (let i = 0; i < text.length; i++) {
                            const letter = document.createElement('span');
                            letter.className = 'animated-letter';
                            letter.innerHTML = text[i] === ' ' ? '&nbsp;' : text[i];
                            letter.style.animationDelay = `${i * 0.03}s`;
                            wrapper.appendChild(letter);
                        }
                        
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(heading);
        });
        
        // Add text animation styles
        const textStyles = document.createElement('style');
        textStyles.textContent = `
            .section-header h2 {
                opacity: 0; /* Hide headings initially */
            }
            
            .animated-letter {
                display: inline-block;
                opacity: 0;
                transform: translateY(20px);
                animation: letterReveal 0.5s forwards;
            }
            
            @keyframes letterReveal {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(textStyles);
    }
    
    // Background effects
    function initBackgroundEffects() {
        // Add background animation to sections
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            // Create background animation div
            const bgAnimation = document.createElement('div');
            bgAnimation.className = 'bg-animation';
            
            // Create different animations for different sections
            if (section.id === 'services') {
                bgAnimation.classList.add('dots-bg');
            } else if (section.id === 'trainers') {
                bgAnimation.classList.add('lines-bg');
            } else if (section.id === 'pricing') {
                bgAnimation.classList.add('gradient-bg');
            } else if (section.id === 'testimonials') {
                bgAnimation.classList.add('wave-bg');
            }
            
            // Add to section
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.insertBefore(bgAnimation, section.firstChild);
        });
        
        // Add background animation styles
        const bgStyles = document.createElement('style');
        bgStyles.textContent = `
            .bg-animation {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                pointer-events: none;
            }
            
            .dots-bg {
                background-image: radial-gradient(circle at 25% 25%, rgba(255, 0, 0, 0.1) 1px, transparent 1px),
                                 radial-gradient(circle at 75% 75%, rgba(255, 0, 0, 0.1) 1px, transparent 1px);
                background-size: 30px 30px;
                animation: moveDots 60s linear infinite;
            }
            
            .lines-bg {
                background: linear-gradient(90deg, transparent 95%, rgba(255, 0, 0, 0.1) 1px),
                           linear-gradient(0deg, transparent 95%, rgba(0, 0, 0, 0.1) 1px);
                background-size: 30px 30px;
                animation: moveLines 60s linear infinite;
            }
            
            .gradient-bg {
                background: linear-gradient(135deg, rgba(255, 0, 0, 0.05) 0%, transparent 50%, rgba(255, 0, 0, 0.05) 100%);
                animation: rotateGradient 15s infinite linear;
            }
            
            .wave-bg {
                opacity: 0.2;
                background: radial-gradient(ellipse at center, rgba(255, 0, 0, 0.2) 0%, transparent 70%);
                animation: pulseWave 8s infinite ease-in-out;
            }
            
            @keyframes moveDots {
                0% { background-position: 0 0; }
                100% { background-position: 100px 100px; }
            }
            
            @keyframes moveLines {
                0% { background-position: 0 0; }
                100% { background-position: 100px 100px; }
            }
            
            @keyframes rotateGradient {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes pulseWave {
                0% { transform: scale(0.8); opacity: 0.1; }
                50% { transform: scale(1.2); opacity: 0.3; }
                100% { transform: scale(0.8); opacity: 0.1; }
            }
        `;
        document.head.appendChild(bgStyles);
    }
}); 