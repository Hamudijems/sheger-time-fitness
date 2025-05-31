// PowerFit Gym - Advanced Animation System
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing advanced animation system');
    
    // Initialize all animation systems
    initParallaxSystem();
    initMouseFollowEffects();
    initScrollAnimations();
    init3DEffects();
    initParticleSystem();
    initTextAnimations();
    initMagneticElements();
    initLiquidEffects();
    initRevealEffects();
    
    // Advanced parallax scrolling system
    function initParallaxSystem() {
        // Select all elements with parallax data attribute
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        // Add parallax class for styling
        parallaxElements.forEach(el => el.classList.add('parallax-element'));
        
        // Add CSS for parallax elements
        const parallaxStyle = document.createElement('style');
        parallaxStyle.textContent = `
            .parallax-element {
                position: relative;
                will-change: transform;
                transition: transform 0.1s linear;
            }
        `;
        document.head.appendChild(parallaxStyle);
        
        // Create parallax effect on scroll
        window.addEventListener('scroll', function() {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(el => {
                const speed = el.getAttribute('data-parallax') || 0.2;
                const reverseDirection = el.hasAttribute('data-parallax-reverse');
                const direction = reverseDirection ? -1 : 1;
                const yPosition = scrollY * speed * direction;
                
                // Apply transform with 3D acceleration
                el.style.transform = `translate3d(0, ${yPosition}px, 0)`;
            });
        });
        
        // Add data-parallax attributes to appropriate elements
        addParallaxToElements();
        
        function addParallaxToElements() {
            // Hero content parallax
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.setAttribute('data-parallax', '0.2');
            }
            
            // About image parallax
            const aboutImages = document.querySelectorAll('.about-image-container img');
            aboutImages.forEach((img, index) => {
                const speed = 0.1 + (index * 0.05);
                img.setAttribute('data-parallax', speed.toString());
                if (index % 2 === 1) {
                    img.setAttribute('data-parallax-reverse', 'true');
                }
            });
            
            // Services cards staggered parallax
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                const speed = 0.05 + (index * 0.02);
                card.setAttribute('data-parallax', speed.toString());
            });
            
            // Section headers parallax
            const sectionHeaders = document.querySelectorAll('.section-header');
            sectionHeaders.forEach(header => {
                header.setAttribute('data-parallax', '0.1');
            });
        }
    }
    
    // Mouse follow animation system
    function initMouseFollowEffects() {
        // Create a floating element that follows the mouse
        const cursorFollower = document.createElement('div');
        cursorFollower.className = 'cursor-follower';
        document.body.appendChild(cursorFollower);
        
        // Style the cursor follower
        const followerStyle = document.createElement('style');
        followerStyle.textContent = `
            .cursor-follower {
                position: fixed;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(255,0,0,0.5) 0%, rgba(255,0,0,0) 70%);
                pointer-events: none;
                z-index: 9999;
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
                transition: transform 0.1s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease;
                mix-blend-mode: screen;
                will-change: transform;
            }
            
            .cursor-follower.active {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            
            .cursor-follower.hover {
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 70%);
                transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
            }
            
            /* Hide on mobile */
            @media (max-width: 768px) {
                .cursor-follower {
                    display: none;
                }
            }
        `;
        document.head.appendChild(followerStyle);
        
        // Variables for smooth following
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const ease = 0.15; // Easing factor (0-1)
        
        // Track mouse position
        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Show cursor follower when mouse moves
            if (!cursorFollower.classList.contains('active')) {
                cursorFollower.classList.add('active');
            }
        });
        
        // Hide when mouse leaves window
        document.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
        
        // Animate the follower
        function animateFollower() {
            // Calculate smooth movement with easing
            cursorX += (mouseX - cursorX) * ease;
            cursorY += (mouseY - cursorY) * ease;
            
            // Apply position with transform for better performance
            cursorFollower.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) scale(1)`;
            
            requestAnimationFrame(animateFollower);
        }
        
        animateFollower();
        
        // Add hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .service-card, .trainer-card, .gallery-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('hover');
            });
        });
    }
    
    // Advanced scroll animations using Intersection Observer
    function initScrollAnimations() {
        // Define animation types
        const animations = {
            fadeIn: {
                start: { opacity: 0, transform: 'translateY(40px)' },
                end: { opacity: 1, transform: 'translateY(0)' }
            },
            fadeInLeft: {
                start: { opacity: 0, transform: 'translateX(-60px)' },
                end: { opacity: 1, transform: 'translateX(0)' }
            },
            fadeInRight: {
                start: { opacity: 0, transform: 'translateX(60px)' },
                end: { opacity: 1, transform: 'translateX(0)' }
            },
            zoomIn: {
                start: { opacity: 0, transform: 'scale(0.8)' },
                end: { opacity: 1, transform: 'scale(1)' }
            },
            flipIn: {
                start: { opacity: 0, transform: 'rotateX(90deg)' },
                end: { opacity: 1, transform: 'rotateX(0)' }
            },
            rotateIn: {
                start: { opacity: 0, transform: 'rotate(180deg) scale(0.8)' },
                end: { opacity: 1, transform: 'rotate(0) scale(1)' }
            }
        };
        
        // Add data attributes to elements for animation
        assignAnimations();
        
        function assignAnimations() {
            // Service cards - staggered zoom in
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                card.setAttribute('data-animation', 'zoomIn');
                card.setAttribute('data-delay', (index * 0.1).toString());
            });
            
            // Trainer cards - alternate left/right
            const trainerCards = document.querySelectorAll('.trainer-card');
            trainerCards.forEach((card, index) => {
                card.setAttribute('data-animation', index % 2 === 0 ? 'fadeInLeft' : 'fadeInRight');
                card.setAttribute('data-delay', (index * 0.1).toString());
            });
            
            // Pricing cards - flip in
            const pricingCards = document.querySelectorAll('.pricing-card');
            pricingCards.forEach((card, index) => {
                card.setAttribute('data-animation', 'flipIn');
                card.setAttribute('data-delay', (index * 0.15).toString());
            });
            
            // Gallery items - rotate in
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach((item, index) => {
                item.setAttribute('data-animation', 'rotateIn');
                item.setAttribute('data-delay', (index * 0.08).toString());
            });
            
            // Section headers - fade in
            const sectionHeaders = document.querySelectorAll('.section-header');
            sectionHeaders.forEach(header => {
                header.setAttribute('data-animation', 'fadeIn');
            });
        }
        
        // Apply initial animation states
        const animatedElements = document.querySelectorAll('[data-animation]');
        
        animatedElements.forEach(el => {
            const animationType = el.getAttribute('data-animation');
            if (animations[animationType]) {
                Object.entries(animations[animationType].start).forEach(([property, value]) => {
                    el.style[property] = value;
                });
            }
            
            el.style.transition = `all 0.8s cubic-bezier(0.16, 1, 0.3, 1)`;
        });
        
        // Create intersection observer for scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animationType = el.getAttribute('data-animation');
                    const delay = parseFloat(el.getAttribute('data-delay') || '0');
                    
                    if (animations[animationType]) {
                        setTimeout(() => {
                            Object.entries(animations[animationType].end).forEach(([property, value]) => {
                                el.style[property] = value;
                            });
                            el.classList.add('animated');
                        }, delay * 1000);
                    }
                    
                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -10% 0px'
        });
        
        // Observe all animated elements
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // 3D transform effects
    function init3DEffects() {
        // Add 3D perspective to sectional elements
        const container = document.createElement('style');
        container.textContent = `
            .has-3d-effect {
                transform-style: preserve-3d;
                perspective: 1000px;
            }
            
            .rotate-3d {
                transition: transform 0.5s ease;
                transform-style: preserve-3d;
            }
            
            .rotate-3d:hover {
                transform: rotateY(10deg) rotateX(5deg);
            }
            
            .depth-element {
                transform: translateZ(20px);
                transform-style: preserve-3d;
            }
            
            .depth-container {
                perspective: 1000px;
                transform-style: preserve-3d;
            }
            
            .shadow-3d {
                position: relative;
            }
            
            .shadow-3d::after {
                content: '';
                position: absolute;
                bottom: -15px;
                left: 0;
                width: 100%;
                height: 15px;
                background: linear-gradient(transparent, rgba(0,0,0,0.2));
                transform: rotateX(90deg) translateZ(-15px);
                transform-origin: bottom;
                z-index: -1;
            }
        `;
        document.head.appendChild(container);
        
        // Apply 3D effects to pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            card.classList.add('has-3d-effect', 'rotate-3d', 'shadow-3d');
            
            // Add hover listener for dynamic rotation
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate rotation based on cursor position
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = ((x - centerX) / centerX) * 10; // Max 10deg
                const rotateX = ((centerY - y) / centerY) * 10; // Max 10deg
                
                this.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
            });
            
            // Reset transform when mouse leaves
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'rotateY(0deg) rotateX(0deg)';
            });
        });
        
        // Apply 3D effects to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach(card => {
            card.classList.add('depth-container');
            
            // Make icon float above card
            const icon = card.querySelector('.service-icon');
            if (icon) {
                icon.classList.add('depth-element');
            }
        });
    }
    
    // Particle system for dynamic backgrounds
    function initParticleSystem() {
        // Create particle container for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const particleContainer = document.createElement('div');
            particleContainer.className = 'particle-container';
            hero.appendChild(particleContainer);
            
            // Style the particle container
            const particleStyle = document.createElement('style');
            particleStyle.textContent = `
                .particle-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: 1;
                }
                
                .particle {
                    position: absolute;
                    background-color: rgba(255, 255, 255, 0.5);
                    pointer-events: none;
                    border-radius: 50%;
                    will-change: transform;
                }
                
                @media (max-width: 768px) {
                    .particle {
                        display: none;
                    }
                }
            `;
            document.head.appendChild(particleStyle);
            
            // Generate particles
            const particleCount = 30;
            const particles = [];
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                
                // Random size (1-5px)
                const size = Math.random() * 4 + 1;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random starting position
                const x = Math.random() * 100;
                const y = Math.random() * 100;
                particle.style.left = `${x}%`;
                particle.style.top = `${y}%`;
                
                // Random opacity
                particle.style.opacity = (Math.random() * 0.6 + 0.2).toString();
                
                // Save particle data
                particles.push({
                    element: particle,
                    x: x,
                    y: y,
                    speedX: (Math.random() - 0.5) * 0.3, // Speed between -0.15 and 0.15
                    speedY: (Math.random() - 0.5) * 0.3,
                    size: size
                });
                
                // Add to container
                particleContainer.appendChild(particle);
            }
            
            // Animate particles
            function animateParticles() {
                particles.forEach(p => {
                    // Update position
                    p.x += p.speedX;
                    p.y += p.speedY;
                    
                    // Check boundaries and wrap around
                    if (p.x > 100) p.x = 0;
                    if (p.x < 0) p.x = 100;
                    if (p.y > 100) p.y = 0;
                    if (p.y < 0) p.y = 100;
                    
                    // Update element position
                    p.element.style.transform = `translate3d(${p.x}%, ${p.y}%, 0)`;
                });
                
                requestAnimationFrame(animateParticles);
            }
            
            animateParticles();
        }
    }
    
    // Text animations for headings
    function initTextAnimations() {
        // Get main headings for animation
        const heroHeading = document.querySelector('.hero-content h1');
        
        if (heroHeading) {
            // Split text into characters
            const text = heroHeading.textContent;
            heroHeading.textContent = '';
            
            // Create wrapper for better positioning
            const wrapper = document.createElement('span');
            wrapper.className = 'text-animation-wrapper';
            heroHeading.appendChild(wrapper);
            
            // Add each character with animation
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                const span = document.createElement('span');
                span.className = 'animated-char';
                span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
                span.style.animationDelay = `${i * 0.05}s`;
                wrapper.appendChild(span);
            }
            
            // Add animation styles
            const textAnimStyle = document.createElement('style');
            textAnimStyle.textContent = `
                .text-animation-wrapper {
                    display: inline-block;
                }
                
                .animated-char {
                    display: inline-block;
                    opacity: 0;
                    transform: translateY(50px) rotateX(90deg);
                    animation: charReveal 0.7s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    transform-origin: bottom;
                }
                
                @keyframes charReveal {
                    0% {
                        opacity: 0;
                        transform: translateY(50px) rotateX(90deg);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0) rotateX(0);
                    }
                }
            `;
            document.head.appendChild(textAnimStyle);
        }
        
        // Animate section headings when in viewport
        const sectionHeadings = document.querySelectorAll('.section-header h2');
        
        sectionHeadings.forEach(heading => {
            const text = heading.textContent;
            heading.innerHTML = '';
            
            // Create wrapper
            const wrapper = document.createElement('span');
            wrapper.className = 'section-heading-wrapper';
            heading.appendChild(wrapper);
            
            // Create masking effect with two layers
            const textLayer = document.createElement('span');
            textLayer.className = 'text-layer';
            textLayer.textContent = text;
            
            const maskLayer = document.createElement('span');
            maskLayer.className = 'mask-layer';
            
            wrapper.appendChild(textLayer);
            wrapper.appendChild(maskLayer);
            
            // Add styles for section heading animation
            const headingStyle = document.createElement('style');
            headingStyle.textContent = `
                .section-heading-wrapper {
                    display: inline-block;
                    position: relative;
                    overflow: hidden;
                }
                
                .text-layer {
                    display: block;
                    transform: translateY(100%);
                    transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
                }
                
                .mask-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: var(--primary-color);
                    transform: translateY(0);
                    transition: transform 0.8s cubic-bezier(0.19, 1, 0.22, 1) 0.1s;
                }
                
                .animate-heading .text-layer {
                    transform: translateY(0);
                }
                
                .animate-heading .mask-layer {
                    transform: translateY(-100%);
                }
            `;
            document.head.appendChild(headingStyle);
        });
        
        // Intersection Observer to trigger section heading animations
        const headingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const wrapper = entry.target.querySelector('.section-heading-wrapper');
                    if (wrapper) {
                        wrapper.classList.add('animate-heading');
                        headingObserver.unobserve(entry.target);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        sectionHeadings.forEach(heading => {
            headingObserver.observe(heading);
        });
    }
    
    // Magnetic effect for buttons and interactive elements
    function initMagneticElements() {
        // Select all buttons for magnetic effect
        const magneticElements = document.querySelectorAll('.btn, .service-icon');
        
        magneticElements.forEach(el => {
            el.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calculate distance from center
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Calculate magnetic pull (stronger when closer to button)
                const maxPull = 15; // Maximum pixel movement
                const pullX = ((x - centerX) / centerX) * maxPull;
                const pullY = ((y - centerY) / centerY) * maxPull;
                
                // Apply transform
                this.style.transform = `translate(${pullX}px, ${pullY}px)`;
            });
            
            // Reset position when mouse leaves
            el.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }
    
    // Liquid/fluid animations for shape morphing
    function initLiquidEffects() {
        // Create fluid shapes in the background
        const sections = [
            document.querySelector('.services'),
            document.querySelector('.testimonials')
        ];
        
        sections.forEach((section, index) => {
            if (!section) return;
            
            // Create fluid blob container
            const blobContainer = document.createElement('div');
            blobContainer.className = `blob-container blob-${index}`;
            section.style.position = 'relative';
            section.style.overflow = 'hidden';
            section.insertBefore(blobContainer, section.firstChild);
            
            // Create blob SVG
            const blob = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            blob.setAttribute('viewBox', '0 0 200 200');
            blob.classList.add('blob');
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.classList.add('blob-path');
            blob.appendChild(path);
            
            blobContainer.appendChild(blob);
            
            // Style the blobs
            const blobStyle = document.createElement('style');
            blobStyle.textContent = `
                .blob-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                    pointer-events: none;
                    overflow: hidden;
                }
                
                .blob {
                    position: absolute;
                    width: ${index === 0 ? '60%' : '70%'};
                    height: ${index === 0 ? '60%' : '70%'};
                    top: ${index === 0 ? '-10%' : '40%'};
                    left: ${index === 0 ? '70%' : '-20%'};
                    fill: rgba(255, 0, 0, ${index === 0 ? '0.03' : '0.07'});
                    transform-origin: center;
                }
                
                .blob-path {
                    animation: blob-morph 25s linear infinite alternate;
                }
                
                @keyframes blob-morph {
                    0% {
                        d: path("M40.4,-67.1C50.5,-59.5,55.3,-43.6,62.3,-28.5C69.3,-13.4,78.4,0.8,78,15.3C77.5,29.7,67.3,44.4,54.1,53.9C40.8,63.4,24.4,67.9,8.4,68.3C-7.6,68.7,-23.1,65,-36,57C-49,48.9,-59.3,36.5,-65,22C-70.7,7.4,-71.7,-9.3,-67.2,-24.9C-62.7,-40.4,-52.7,-54.8,-39.9,-61.8C-27.2,-68.7,-11.6,-68.2,2.6,-72.3C16.7,-76.4,30.3,-74.7,40.4,-67.1Z");
                    }
                    25% {
                        d: path("M43.4,-71.7C54.9,-64.5,61.8,-49.5,67.7,-34.9C73.6,-20.2,78.6,-5.9,76.5,7.2C74.4,20.4,65.2,32.3,54.9,42.2C44.5,52,33,59.8,19.7,65.2C6.4,70.6,-8.8,73.5,-23.9,70.9C-39,68.2,-54,60,-64,47.5C-74,35.1,-79,18.5,-78.1,2.5C-77.3,-13.5,-70.7,-26.9,-62.3,-39.3C-54,-51.7,-44,-62.9,-31.8,-69.5C-19.6,-76,-9.8,-77.8,3,-82.7C15.8,-87.6,31.9,-78.8,43.4,-71.7Z");
                    }
                    50% {
                        d: path("M31.9,-54.1C41.3,-46.9,48.8,-37.3,54.9,-26.2C61,-15.1,65.7,-2.5,64.6,9.7C63.6,21.9,56.8,33.9,47.4,41.9C38,49.9,26,54,13.2,57.7C0.5,61.4,-13.1,64.7,-25.1,61.5C-37.1,58.4,-47.5,48.8,-55.3,37.5C-63.2,26.3,-68.5,13.1,-68.9,-0.2C-69.3,-13.5,-64.8,-27,-57,-39C-49.2,-50.9,-38,-61.4,-25.6,-66.7C-13.3,-71.9,0.3,-72.1,11.9,-68C23.6,-63.9,22.6,-61.2,31.9,-54.1Z");
                    }
                    75% {
                        d: path("M30.7,-52.8C38.9,-43.9,43.9,-32.7,50.2,-21.2C56.6,-9.6,64.3,2.4,64,14.4C63.7,26.4,55.4,38.5,44.3,47.6C33.1,56.6,19,62.6,4.1,63.3C-10.7,64.1,-26.2,59.6,-38.2,50.8C-50.2,42,-58.7,28.9,-63.3,14C-67.8,-0.9,-68.5,-17.8,-62.4,-31.5C-56.4,-45.3,-43.7,-56,-30.8,-62.9C-17.8,-69.8,-4.5,-72.9,6,-68.6C16.5,-64.2,22.6,-61.6,30.7,-52.8Z");
                    }
                    100% {
                        d: path("M40.4,-67.1C50.5,-59.5,55.3,-43.6,62.3,-28.5C69.3,-13.4,78.4,0.8,78,15.3C77.5,29.7,67.3,44.4,54.1,53.9C40.8,63.4,24.4,67.9,8.4,68.3C-7.6,68.7,-23.1,65,-36,57C-49,48.9,-59.3,36.5,-65,22C-70.7,7.4,-71.7,-9.3,-67.2,-24.9C-62.7,-40.4,-52.7,-54.8,-39.9,-61.8C-27.2,-68.7,-11.6,-68.2,2.6,-72.3C16.7,-76.4,30.3,-74.7,40.4,-67.1Z");
                    }
                }
            `;
            document.head.appendChild(blobStyle);
            
            // Set initial path
            updateBlobPath(path);
            
            // Animate blob on scroll
            window.addEventListener('scroll', () => {
                const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
                updateBlobRotation(blob, scrollPercent * 360);
            });
        });
        
        function updateBlobPath(pathElement) {
            pathElement.setAttribute('d', "M40.4,-67.1C50.5,-59.5,55.3,-43.6,62.3,-28.5C69.3,-13.4,78.4,0.8,78,15.3C77.5,29.7,67.3,44.4,54.1,53.9C40.8,63.4,24.4,67.9,8.4,68.3C-7.6,68.7,-23.1,65,-36,57C-49,48.9,-59.3,36.5,-65,22C-70.7,7.4,-71.7,-9.3,-67.2,-24.9C-62.7,-40.4,-52.7,-54.8,-39.9,-61.8C-27.2,-68.7,-11.6,-68.2,2.6,-72.3C16.7,-76.4,30.3,-74.7,40.4,-67.1Z");
        }
        
        function updateBlobRotation(blob, rotation) {
            blob.style.transform = `rotate(${rotation}deg)`;
        }
    }
    
    // Content reveal effects for sections
    function initRevealEffects() {
        // Create reveal masks for sections
        const revealSections = document.querySelectorAll('section');
        
        // Add reveal styles
        const revealStyle = document.createElement('style');
        revealStyle.textContent = `
            .reveal-section {
                position: relative;
            }
            
            .reveal-mask {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: var(--primary-color);
                transform: scaleY(1);
                transform-origin: bottom;
                z-index: 10;
                pointer-events: none;
                transition: transform 1.2s cubic-bezier(0.83, 0, 0.17, 1);
            }
            
            .reveal-section.revealed .reveal-mask {
                transform: scaleY(0);
            }
            
            .reveal-content {
                opacity: 0;
                transition: opacity 0.5s ease 0.8s;
            }
            
            .reveal-section.revealed .reveal-content {
                opacity: 1;
            }
        `;
        document.head.appendChild(revealStyle);
        
        // Add reveal wrappers and masks
        revealSections.forEach((section, index) => {
            // Skip first sections (hero, about)
            if (index < 2) return;
            
            // Make section a reveal container
            section.classList.add('reveal-section');
            
            // Create mask
            const mask = document.createElement('div');
            mask.className = 'reveal-mask';
            
            // Wrap content
            const content = document.createElement('div');
            content.className = 'reveal-content';
            
            // Move section's children to content wrapper
            while (section.firstChild) {
                content.appendChild(section.firstChild);
            }
            
            // Append mask and content to section
            section.appendChild(mask);
            section.appendChild(content);
        });
        
        // Create intersection observer for reveal effects
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        // Observe reveal sections
        document.querySelectorAll('.reveal-section').forEach(section => {
            revealObserver.observe(section);
        });
    }
});

// Initialize animations when document loads
// Check if the DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimationsOnLoad);
} else {
    initAnimationsOnLoad();
}

// Initialize features on load
function initAnimationsOnLoad() {
    console.log('PowerFit advanced animations loaded');
    
    // Add data attributes needed for advanced animations
    addDataAttributes();
    
    // Apply advanced animations to elements that need them
    function addDataAttributes() {
        // Add parallax attributes to various elements
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.querySelectorAll('*:not(script)').forEach((el, index) => {
                if (index % 2 === 0) {
                    el.setAttribute('data-parallax', '0.05');
                }
            });
        }
        
        // Add animation types to sections
        document.querySelectorAll('section').forEach((section, index) => {
            const animations = ['fadeIn', 'fadeInLeft', 'fadeInRight', 'zoomIn', 'flipIn', 'rotateIn'];
            section.setAttribute('data-animation', animations[index % animations.length]);
        });
        
        // Add 3D effect to cards
        document.querySelectorAll('.card, .service-card, .trainer-card, .pricing-card').forEach(card => {
            card.classList.add('has-3d-effect');
        });
    }
} 