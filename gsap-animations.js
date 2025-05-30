// PowerFit Gym - GSAP Animation System
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.log('GSAP not available. Loading from CDN...');
        loadGSAP();
        return;
    }
    
    console.log('Initializing GSAP animation system');
    initGSAPAnimations();
    
    // Load GSAP from CDN if not available
    function loadGSAP() {
        // Load GSAP core
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/gsap.min.js';
        gsapScript.async = true;
        document.head.appendChild(gsapScript);
        
        // Load ScrollTrigger plugin
        const scrollTriggerScript = document.createElement('script');
        scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.4/ScrollTrigger.min.js';
        scrollTriggerScript.async = true;
        document.head.appendChild(scrollTriggerScript);
        
        // Initialize animations once loaded
        gsapScript.onload = function() {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                gsap.registerPlugin(ScrollTrigger);
                setTimeout(initGSAPAnimations, 100);
            } else {
                scrollTriggerScript.onload = function() {
                    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                        gsap.registerPlugin(ScrollTrigger);
                        setTimeout(initGSAPAnimations, 100);
                    }
                };
            }
        };
    }
    
    // Initialize all GSAP animations
    function initGSAPAnimations() {
        console.log('GSAP animations ready');
        
        // Register ScrollTrigger plugin if available
        if (gsap.registerPlugin && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
        
        // Initialize hero animations
        heroAnimations();
        
        // Initialize scroll-triggered animations
        scrollTriggeredAnimations();
        
        // Initialize card hover animations
        cardHoverAnimations();
        
        // Initialize staggered text animations
        textAnimations();
        
        // Initialize 3D rotations
        init3DRotations();
        
        // Initialize scroll-based timeline
        initScrollTimeline();
    }
    
    // Hero section animations
    function heroAnimations() {
        const heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        
        // Create hero timeline
        const heroTl = gsap.timeline({
            defaults: { 
                ease: "power3.out", 
                duration: 1.2
            }
        });
        
        // Add animations to timeline
        heroTl
            .from(heroContent, { 
                opacity: 0, 
                y: 100, 
                duration: 1.5 
            })
            .from('.hero-content h1', { 
                opacity: 0,
                y: 50,
                skewY: 5,
                stagger: 0.2
            }, "-=1.2")
            .from('.hero-content p', { 
                opacity: 0,
                y: 30 
            }, "-=0.9")
            .from('.cta-buttons .btn', { 
                opacity: 0,
                y: 20,
                stagger: 0.2,
                scale: 0.8
            }, "-=0.7");
        
        // Create parallax effect on hero background
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.to('.hero', {
                backgroundPositionY: "50%",
                ease: "none",
                scrollTrigger: {
                    trigger: '.hero',
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    }
    
    // Scroll-triggered animations for sections
    function scrollTriggeredAnimations() {
        if (typeof ScrollTrigger === 'undefined') return;
        
        // Animate section headers
        gsap.utils.toArray('.section-header').forEach(header => {
            gsap.from(header, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
            
            // Animate line after header
            gsap.from(header.querySelector('h2::after'), {
                width: 0,
                duration: 1.2,
                delay: 0.5,
                scrollTrigger: {
                    trigger: header,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        });
        
        // Animate service cards with stagger
        const serviceCards = document.querySelectorAll('.service-card');
        if (serviceCards.length) {
            gsap.from(serviceCards, {
                opacity: 0,
                y: 100,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: "top 80%"
                }
            });
        }
        
        // Animate trainer cards with stagger
        const trainerCards = document.querySelectorAll('.trainer-card');
        if (trainerCards.length) {
            gsap.from(trainerCards, {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                stagger: 0.2,
                ease: "elastic.out(1, 0.3)",
                scrollTrigger: {
                    trigger: '.trainers-grid',
                    start: "top 80%"
                }
            });
        }
        
        // Animate pricing cards with 3D effect
        const pricingCards = document.querySelectorAll('.pricing-card');
        if (pricingCards.length) {
            gsap.from(pricingCards, {
                opacity: 0,
                rotationX: 90,
                y: 100,
                duration: 1.2,
                stagger: 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: '.pricing-grid',
                    start: "top 80%"
                }
            });
        }
        
        // Gallery items reveal effect
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length) {
            gsap.set(galleryItems, { overflow: 'hidden' });
            gsap.set(galleryItems, { perspective: 1000 });
            
            galleryItems.forEach((item, index) => {
                // Create overlay
                const overlay = document.createElement('div');
                overlay.className = 'gallery-overlay';
                overlay.style.position = 'absolute';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100%';
                overlay.style.height = '100%';
                overlay.style.backgroundColor = 'var(--primary-color)';
                overlay.style.transformOrigin = index % 2 === 0 ? 'left' : 'right';
                item.style.position = 'relative';
                item.appendChild(overlay);
                
                // Animate overlay to reveal image
                gsap.to(overlay, {
                    scaleX: 0,
                    duration: 1.2,
                    ease: "power4.inOut",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%"
                    }
                });
                
                // Animate image
                gsap.from(item.querySelector('img'), {
                    scale: 1.5,
                    duration: 1.5,
                    delay: 0.2,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%"
                    }
                });
            });
        }
        
        // Testimonial reveal animation
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        if (testimonialCards.length) {
            testimonialCards.forEach((card, index) => {
                if (index === 0) {
                    gsap.from(card, {
                        opacity: 0,
                        y: 50,
                        duration: 1,
                        scrollTrigger: {
                            trigger: '.testimonials',
                            start: "top 70%"
                        }
                    });
                }
            });
        }
        
        // Contact form animation
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            const formElements = contactForm.querySelectorAll('input, textarea, button');
            
            gsap.from(contactForm, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: contactForm,
                    start: "top 80%"
                }
            });
            
            gsap.from(formElements, {
                opacity: 0,
                y: 20,
                duration: 0.6,
                stagger: 0.1,
                delay: 0.4,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contactForm,
                    start: "top 80%"
                }
            });
        }
    }
    
    // Card hover animations using GSAP
    function cardHoverAnimations() {
        // Service cards hover effect
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const icon = card.querySelector('.service-icon');
            const title = card.querySelector('h3');
            const content = card.querySelector('p');
            
            // Create hover timeline (paused initially)
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl
                .to(card, { 
                    y: -15, 
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)', 
                    duration: 0.3
                })
                .to(icon, { 
                    backgroundColor: 'var(--primary-color)', 
                    color: 'white', 
                    scale: 1.1,
                    duration: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.2")
                .to(title, { 
                    color: 'var(--primary-color)', 
                    duration: 0.2 
                }, "-=0.2")
                .to(content, { 
                    opacity: 0.9, 
                    duration: 0.2 
                }, "-=0.2");
            
            // Play/reverse timeline on hover
            card.addEventListener('mouseenter', () => hoverTl.play());
            card.addEventListener('mouseleave', () => hoverTl.reverse());
        });
        
        // Trainer cards hover effect
        const trainerCards = document.querySelectorAll('.trainer-card');
        
        trainerCards.forEach(card => {
            const image = card.querySelector('.trainer-img img');
            const socials = card.querySelector('.trainer-socials');
            
            // Create hover timeline (paused initially)
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl
                .to(card, { 
                    y: -15, 
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)', 
                    duration: 0.3
                })
                .to(image, { 
                    scale: 1.1, 
                    duration: 0.4
                }, "-=0.3")
                .to(socials, { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.3
                }, "-=0.2");
            
            // Play/reverse timeline on hover
            card.addEventListener('mouseenter', () => hoverTl.play());
            card.addEventListener('mouseleave', () => hoverTl.reverse());
        });
    }
    
    // Advanced text animations
    function textAnimations() {
        // Split text for hero heading
        const heroHeading = document.querySelector('.hero-content h1');
        if (heroHeading) {
            // Split text by words
            const text = heroHeading.textContent;
            const words = text.split(' ');
            
            // Clear heading and create word spans
            heroHeading.innerHTML = '';
            
            words.forEach(word => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                wordSpan.style.display = 'inline-block';
                wordSpan.style.overflow = 'hidden';
                
                // Create inner span for letter animation
                const innerSpan = document.createElement('span');
                innerSpan.className = 'word-inner';
                innerSpan.style.display = 'inline-block';
                innerSpan.style.willChange = 'transform';
                innerSpan.textContent = word + ' ';
                
                wordSpan.appendChild(innerSpan);
                heroHeading.appendChild(wordSpan);
            });
            
            // Animate each word
            gsap.fromTo('.word-inner', 
                { 
                    y: '100%', 
                    rotation: 5 
                },
                {
                    y: 0,
                    rotation: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power2.out",
                    delay: 0.5
                }
            );
        }
    }
    
    // 3D rotations using GSAP
    function init3DRotations() {
        // Add 3D rotation to pricing cards
        const pricingCards = document.querySelectorAll('.pricing-card');
        pricingCards.forEach(card => {
            // Set 3D properties
            gsap.set(card, { 
                transformPerspective: 1000,
                transformStyle: "preserve-3d"
            });
            
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                
                // Calculate rotation values
                const rotateY = gsap.utils.mapRange(rect.left, rect.left + rect.width, 10, -10, mouseX);
                const rotateX = gsap.utils.mapRange(rect.top, rect.top + rect.height, -10, 10, mouseY);
                
                // Animate to new rotation
                gsap.to(card, {
                    rotationY: rotateY,
                    rotationX: rotateX,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset rotation
                gsap.to(card, {
                    rotationY: 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.3)"
                });
            });
        });
    }
    
    // Scroll-based timeline animation
    function initScrollTimeline() {
        if (typeof ScrollTrigger === 'undefined') return;
        
        // Find timeline in about section
        const timelineSection = document.querySelector('[style*="timeline"]');
        if (!timelineSection) return;
        
        // Get timeline items
        const timelineItems = timelineSection.querySelectorAll('> div');
        const timelineDots = document.querySelectorAll('[style*="position: absolute; left: 50%"][style*="background-color"]');
        
        // Create timeline animation
        const timelineTl = gsap.timeline({
            scrollTrigger: {
                trigger: timelineSection,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1
            }
        });
        
        // Animate timeline line drawing
        gsap.set('[style*="timeline"]::before', { 
            height: 0, 
            opacity: 1
        });
        
        timelineTl.to('[style*="timeline"]::before', {
            height: '100%',
            duration: 1
        });
        
        // Animate timeline items one by one
        timelineItems.forEach((item, index) => {
            const isLeft = index % 2 === 0;
            
            timelineTl.fromTo(item,
                { 
                    opacity: 0,
                    x: isLeft ? -50 : 50
                },
                { 
                    opacity: 1,
                    x: 0,
                    duration: 0.5
                },
                index * 0.3
            );
            
            // Animate dots
            if (timelineDots[index]) {
                timelineTl.fromTo(timelineDots[index],
                    { 
                        scale: 0,
                        opacity: 0
                    },
                    { 
                        scale: 1,
                        opacity: 1,
                        duration: 0.3
                    },
                    index * 0.3 - 0.1
                );
            }
        });
        
        // Create hover effect for timeline items
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    duration: 0.3
                });
            });
            
            item.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                    duration: 0.3
                });
            });
        });
    }
}); 