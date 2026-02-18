/*I figured I had time to experiment with JavaScript a bit
 * The eventlistener is actively listening for mouse movements
 * Dynamic DOM Manipulation creates a new <div> with every mouse movement allowing the trail to follow the cursor
 * Mapping of X and Y helps create the trail illusion as well as Memory Management and its 500ms time limit
 */

/*
 * CANVAS ANIMATION: Matrix-style falling particles
 * This creates a cyberpunk background effect using HTML5 Canvas
 */
window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-canvas');

    if (canvas) {
        const ctx = canvas.getContext('2d');

        // Set canvas size to window size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Particle configuration
        const particles = [];
        const particleCount = 50;
        const colors = ['#ff0000', '#8b0000', '#00ff41'];

        // Particle class
        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height - canvas.height;
                this.speed = Math.random() * 2 + 1;
                this.size = Math.random() * 3 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.opacity = Math.random() * 0.5 + 0.3;
            }

            update() {
                this.y += this.speed;

                // Reset particle when it goes off screen
                if (this.y > canvas.height) {
                    this.reset();
                }
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.globalAlpha = this.opacity;
                ctx.fillRect(this.x, this.y, this.size, this.size);
                ctx.globalAlpha = 1;
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        function animate() {
            // Create fade effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        }

        animate();

        // Resize canvas when window resizes
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});

/*
 * Mouse trail effect
 * Dynamic DOM Manipulation creates a new <div> with every mouse movement
 * allowing the trail to follow the cursor
 */
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 500);
});

/*
 * Contact Form Validation (Bootstrap)
 */
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // Bootstrap validation check
        if (contactForm.checkValidity()) {
            alert("TRANSMISSION SUCCESSFUL: Data stored in the Shadow Archive.");
            contactForm.classList.remove('was-validated');
            this.reset();
        } else {
            contactForm.classList.add('was-validated');
        }
    });
}

/*
 * Background Music with Fade-in Effect
 * Auto-plays on first user interaction
 */
document.addEventListener('click', () => {
    const currentMusic = document.getElementById('bg-music');

    if (currentMusic && currentMusic.paused) {
        currentMusic.volume = 0;

        const playPromise = currentMusic.play();

        if (playPromise !== undefined) {
            playPromise
            .then(() => {
                console.log('Audio playback started');

                // Fade in effect
                let vol = 0;
                const fadeIn = setInterval(() => {
                    if (vol < 0.3) {
                        vol += 0.05;
                        currentMusic.volume = Math.min(vol, 0.3);
                    } else {
                        clearInterval(fadeIn);
                    }
                }, 200);
            })
            .catch(error => {
                console.error('Audio playback failed:', error);
                console.log('Check if the audio file exists in the music/ folder');
            });
        }
    }
}, { once: true });

/*
 * Audio Error Handling
 */
window.addEventListener('DOMContentLoaded', () => {
    const bgMusic = document.getElementById('bg-music');

    if (bgMusic) {
        bgMusic.addEventListener('error', (e) => {
            console.error('Audio loading error:', e);
            console.log('Make sure your audio file exists at:', bgMusic.querySelector('source').src);
        });

        bgMusic.addEventListener('canplay', () => {
            console.log('Audio loaded successfully and ready to play');
        });
    }
});

/*
 * Hamburger Menu Toggle (Mobile Navigation)
 */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/*
 * Login Form with Terminal Effect
 */
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Login attempt:', username);

        const terminalBody = document.querySelector('.terminal-body');
        const originalContent = terminalBody.innerHTML;

        terminalBody.innerHTML = `
        <p class="terminal-prompt">> Verifying credentials...</p>
        <p class="terminal-prompt">> Establishing encrypted connection...</p>
        <p class="terminal-prompt">> Bypassing firewall...</p>
        <p class="terminal-prompt terminal-blink">> ACCESS GRANTED_</p>
        `;

        setTimeout(() => {
            alert('ACCESS GRANTED\n\nWelcome to the Shadow Canvas, ' + username + '\n\n[This is a demo - no actual authentication]');
            terminalBody.innerHTML = originalContent;
            loginForm.reset();
        }, 2000);
    });
}

/*
 * Carousel Functionality
 */
document.addEventListener('DOMContentLoaded', () => {
    const carouselImages = document.querySelectorAll('.carousel-img');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dots = document.querySelectorAll('.carousel-dots .dot');

    if (carouselImages.length === 0) return; // Exit if no carousel on this page

    let currentSlide = 0;
    const totalSlides = carouselImages.length;
    let autoSlideInterval;

    // Function to show specific slide
    function showSlide(n) {
        // Remove active class from all images and dots
        carouselImages.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Handle wrapping
        if (n >= totalSlides) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = n;
        }

        // Add active class to current slide and dot
        carouselImages[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    // Stop auto-slide
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners for buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide(); // Restart auto-slide after manual navigation
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoSlide();
            startAutoSlide();
        });
    });

    // Pause auto-advance on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Swipe left
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            }
            if (touchEndX > touchStartX + 50) {
                // Swipe right
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            }
        }
    }

    // Start auto-slide on page load
    showSlide(0);
    startAutoSlide();
});
