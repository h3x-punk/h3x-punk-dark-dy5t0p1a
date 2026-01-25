/*I figured I had time to experiment with JavaScript a bit
 * The eventlistener is actively listening for mouse movements
 * Dynamic DOM Manipulation creates a new <div> with every mouse movement allowing the trail to follow the cursor
 * Mapping of X and Y helps create the trail illusion as well as Memory Management and its 500ms time limit
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


const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert("TRANSMISSION SUCCESSFUL: Data stored in the Shadow Archive.");
        this.reset();
    });
}

document.addEventListener('click', () => {
    const currentMusic = document.getElementById('bg-music');

    if (currentMusic && currentMusic.paused) {
        currentMusic.volume = 0;


        const playPromise = currentMusic.play();

        if (playPromise !== undefined) {
            playPromise
            .then(() => {

                console.log('Audio playback started');


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


const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}


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
