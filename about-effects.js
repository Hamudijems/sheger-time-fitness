// Special 3D effects for the About section
document.addEventListener('DOMContentLoaded', function() {
    // Check if about section exists
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    console.log('Initializing About section special effects');
    
    // Create a tilt effect on the image container
    initTiltEffect();
    
    // Create moving particles background
    createParticlesBackground();
    
    // Create parallax effect for timeline items
    initTimelineParallax();
    
    // Create glowing effect for stats
    initStatsGlow();
    
    // Create magnetic effect for team member cards
    initMagneticCards();
    
    // Timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-item h4');
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
    
    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // milliseconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        const startTime = performance.now();
        
        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            current = Math.min(step * elapsed, target);
            
            if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'k+';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
            
            if (current < target) {
                requestAnimationFrame(updateCounter);
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // About section image parallax effect
    const aboutImages = document.querySelectorAll('.about .image-accent');
    
    function updateImagesPosition() {
        const scrollPosition = window.scrollY;
        
        aboutImages.forEach((img, index) => {
            // Different movement speeds for different images
            const speed = index === 0 ? 0.05 : 0.03;
            const yPos = -scrollPosition * speed;
            img.style.transform = `translateY(${yPos}px) ${index === 0 ? 'rotate(10deg)' : 'rotate(-5deg)'}`;
        });
    }
    
    window.addEventListener('scroll', updateImagesPosition);
    
    // Core values highlight
    const coreValues = document.querySelectorAll('.values-list li');
    
    coreValues.forEach((value, index) => {
        value.style.transition = `transform 0.3s ${index * 0.1}s, opacity 0.3s ${index * 0.1}s`;
        
        const valueObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('highlighted');
                    }, index * 200);
                    valueObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });
        
        valueObserver.observe(value);
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .values-list li {
            opacity: 0.7;
            transform: translateX(-10px);
        }
        
        .values-list li.highlighted {
            opacity: 1;
            transform: translateX(0);
            position: relative;
        }
        
        .values-list li.highlighted::before {
            transform: scale(1.3);
            color: var(--primary-color);
        }
        
        .values-list li.highlighted span {
            font-weight: 700;
        }
    `;
    
    document.head.appendChild(style);
    
    // Image hover effects
    const mainImage = document.querySelector('.about .image-main');
    if (mainImage) {
        mainImage.addEventListener('mouseenter', function() {
            aboutImages.forEach(img => {
                img.style.transform = 'scale(1.1) rotate(0)';
            });
        });
        
        mainImage.addEventListener('mouseleave', function() {
            aboutImages.forEach((img, index) => {
                img.style.transform = index === 0 ? 'scale(1) rotate(10deg)' : 'scale(1) rotate(-5deg)';
            });
        });
    }
    
    // Initialize the tilt effect on the main image
    function initTiltEffect() {
        const imageContainer = aboutSection.querySelector('.about-image-container, [style*="position: relative"]');
        if (!imageContainer) return;
        
        // Configure tilt behavior
        let tiltConfig = {
            max: 15,         // max tilt rotation (degrees)
            perspective: 1000,   // transform perspective, the lower the more extreme the tilt gets
            scale: 1.05,     // 2 = 200%, 1.5 = 150%, etc
            speed: 1000,     // speed of the enter/exit transition
            easing: 'cubic-bezier(.03,.98,.52,.99)'   // easing for the transition
        };
        
        // Track mouse position
        imageContainer.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            // Calculate mouse position relative to the element
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            // Calculate the percentage of the position from the center
            const xPercent = ((x / rect.width) - 0.5) * 2;  // -1 to 1
            const yPercent = ((y / rect.height) - 0.5) * 2; // -1 to 1
            
            // Calculate the tilt based on the position
            const tiltX = tiltConfig.max * yPercent * -1;  // Inverted for natural movement
            const tiltY = tiltConfig.max * xPercent;
            
            // Apply the transform
            this.style.transform = `perspective(${tiltConfig.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${tiltConfig.scale}, ${tiltConfig.scale}, ${tiltConfig.scale})`;
            this.style.transition = `none`;
            
            // Apply dynamic shadow based on tilt
            const mainImage = this.querySelector('.image-main, img');
            if (mainImage) {
                const shadowX = Math.round(tiltY * 1.5);
                const shadowY = Math.round(tiltX * 1.5 * -1);
                mainImage.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(0, 0, 0, 0.3)`;
            }
            
            // Move accent images for parallax effect
            const accentImages = this.querySelectorAll('.image-accent, [style*="position: absolute"]');
            if (accentImages.length) {
                accentImages.forEach((img, i) => {
                    const factor = i === 0 ? 20 : -20;  // Different movement for each image
                    const moveX = xPercent * factor;
                    const moveY = yPercent * factor;
                    img.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${i === 0 ? 10 : -5}deg)`;
                });
            }
        });
        
        // Reset when mouse leaves
        imageContainer.addEventListener('mouseleave', function() {
            // Reset transform with smooth transition
            this.style.transform = `perspective(${tiltConfig.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            this.style.transition = `transform ${tiltConfig.speed}ms ${tiltConfig.easing}`;
            
            // Reset shadow
            const mainImage = this.querySelector('.image-main, img');
            if (mainImage) {
                mainImage.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
            }
            
            // Reset accent images
            const accentImages = this.querySelectorAll('.image-accent, [style*="position: absolute"]');
            if (accentImages.length) {
                accentImages.forEach((img, i) => {
                    img.style.transform = `rotate(${i === 0 ? 10 : -5}deg)`;
                });
            }
        });
    }
    
    // Create animated particles background
    function createParticlesBackground() {
        // Create a canvas element for particles
        const canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.5';
        
        // Insert canvas at the beginning of the about section
        aboutSection.style.position = 'relative';
        aboutSection.insertBefore(canvas, aboutSection.firstChild);
        
        // Set canvas size to match container
        canvas.width = aboutSection.offsetWidth;
        canvas.height = aboutSection.offsetHeight;
        
        // Get canvas context
        const ctx = canvas.getContext('2d');
        
        // Create particles
        const particlesArray = [];
        const numberOfParticles = 50;
        
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 5 + 1,
                speedX: Math.random() * 3 - 1.5,
                speedY: Math.random() * 3 - 1.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
        
        // Update particles and draw
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw each particle
            for (let i = 0; i < particlesArray.length; i++) {
                let p = particlesArray[i];
                
                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 0, 0, ${p.opacity})`;
                ctx.fill();
                
                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                
                // Check boundaries and reverse direction if needed
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
            }
            
            requestAnimationFrame(animateParticles);
        }
        
        // Start animation
        animateParticles();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            canvas.width = aboutSection.offsetWidth;
            canvas.height = aboutSection.offsetHeight;
        });
    }
    
    // Parallax effect for timeline items
    function initTimelineParallax() {
        const timelineContainer = aboutSection.querySelector('[style*="timeline"]');
        if (!timelineContainer) return;
        
        const timelineItems = timelineContainer.querySelectorAll('> div');
        
        // Parallax effect on scroll
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const containerTop = timelineContainer.offsetTop;
            const containerHeight = timelineContainer.offsetHeight;
            
            // Check if timeline container is in viewport
            if (scrollTop > containerTop - window.innerHeight && 
                scrollTop < containerTop + containerHeight) {
                
                const relativeScroll = scrollTop - containerTop + window.innerHeight;
                const percentScrolled = relativeScroll / (containerHeight + window.innerHeight);
                
                // Apply different movement to each item
                timelineItems.forEach((item, i) => {
                    const movement = (i % 2 === 0) ? 20 : -20;
                    const translateY = (percentScrolled * movement) - 10;
                    item.style.transform = `translateY(${translateY}px)`;
                });
            }
        });
    }
    
    // Glowing effect for stats
    function initStatsGlow() {
        const statsContainer = aboutSection.querySelector('[style*="stats"]');
        if (!statsContainer) return;
        
        const statItems = statsContainer.querySelectorAll('[style*="flex: 1"]');
        
        // Create a glow effect when mouseover
        statItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                // Add glow effect
                this.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.3)';
                
                // Scale the icon
                const icon = this.querySelector('[style*="border-radius: 50%"]');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.boxShadow = '0 0 20px rgba(255, 0, 0, 0.6)';
                }
                
                // Animate the number
                const number = this.querySelector('h4');
                if (number) {
                    number.style.transform = 'scale(1.1)';
                    number.style.color = 'var(--primary-color)';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                // Remove glow effect
                this.style.boxShadow = 'none';
                
                // Reset the icon
                const icon = this.querySelector('[style*="border-radius: 50%"]');
                if (icon) {
                    icon.style.transform = '';
                    icon.style.boxShadow = 'none';
                }
                
                // Reset the number
                const number = this.querySelector('h4');
                if (number) {
                    number.style.transform = '';
                    number.style.color = '';
                }
            });
        });
    }
    
    // Magnetic effect for team member cards
    function initMagneticCards() {
        const teamSection = aboutSection.querySelector('[style*="team"]');
        if (!teamSection) return;
        
        const teamCards = teamSection.querySelectorAll('> div');
        
        teamCards.forEach(card => {
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const distanceX = (e.clientX - centerX) / (rect.width / 2);
                const distanceY = (e.clientY - centerY) / (rect.height / 2);
                
                // Calculate the magnetic pull (stronger when closer to center)
                const magneticPull = 15;
                const moveX = distanceX * magneticPull;
                const moveY = distanceY * magneticPull;
                
                // Apply transform
                this.style.transform = `translate(${moveX}px, ${moveY}px)`;
                
                // Add dynamic reflection/highlight effect
                const highlightX = e.clientX - rect.left;
                const highlightY = e.clientY - rect.top;
                
                this.style.background = `radial-gradient(circle at ${highlightX}px ${highlightY}px, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)`;
            });
            
            card.addEventListener('mouseleave', function() {
                // Reset transform with smooth transition
                this.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease, background 0.5s ease';
                this.style.transform = '';
                this.style.background = '';
                
                // Remove transition after animation completes
                setTimeout(() => {
                    this.style.transition = '';
                }, 500);
            });
        });
    }
}); 