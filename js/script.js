const themeToggle = document.getElementById('theme-toggle');

// Theme Toggle
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
    });
}

// Konami Code Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Trigger Brutalist Pong Easter Egg
            triggerPong();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Smooth Scrolling and Active Nav Link Highlighting
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.content-section');

// Highlight active section on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${entry.target.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Smooth scroll to section when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

function triggerPong() {
    if (document.getElementById('pong-canvas')) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'pong-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '9999';
    canvas.style.backgroundColor = 'var(--bg-color)';
    canvas.style.cursor = 'none';
    document.body.appendChild(canvas);
    
    const closeMsg = document.createElement('div');
    closeMsg.innerText = 'PRESS ESC TO EXIT';
    closeMsg.style.position = 'fixed';
    closeMsg.style.bottom = '40px';
    closeMsg.style.width = '100%';
    closeMsg.style.textAlign = 'center';
    closeMsg.style.zIndex = '10000';
    closeMsg.style.color = 'var(--text-color)';
    closeMsg.style.fontFamily = 'var(--font-main)';
    closeMsg.style.fontWeight = '900';
    closeMsg.style.fontSize = '2rem';
    closeMsg.style.pointerEvents = 'none';
    document.body.appendChild(closeMsg);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let gameLoop;
    const paddleWidth = 20;
    const paddleHeight = 150;
    const ballSize = 25;
    
    let playerY = canvas.height / 2 - paddleHeight / 2;
    let aiY = canvas.height / 2 - paddleHeight / 2;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballVX = 12;
    let ballVY = 12;
    
    let upPressed = false;
    let downPressed = false;
    
    const keydown = (e) => {
        if (e.key === 'Escape') endGame();
        if (e.key === 'ArrowUp' || e.key === 'w') upPressed = true;
        if (e.key === 'ArrowDown' || e.key === 's') downPressed = true;
    };
    const keyup = (e) => {
        if (e.key === 'ArrowUp' || e.key === 'w') upPressed = false;
        if (e.key === 'ArrowDown' || e.key === 's') downPressed = false;
    };
    
    window.addEventListener('keydown', keydown);
    window.addEventListener('keyup', keyup);
    
    function endGame() {
        cancelAnimationFrame(gameLoop);
        canvas.remove();
        closeMsg.remove();
        window.removeEventListener('keydown', keydown);
        window.removeEventListener('keyup', keyup);
    }
    
    function update() {
        if (upPressed && playerY > 0) playerY -= 15;
        if (downPressed && playerY < canvas.height - paddleHeight) playerY += 15;
        
        // Opponent logic
        if (aiY + paddleHeight / 2 < ballY) aiY += 10;
        else aiY -= 10;
        
        ballX += ballVX;
        ballY += ballVY;
        
        if (ballY <= 0 || ballY + ballSize >= canvas.height) ballVY = -ballVY;
        
        // Player Collision
        if (ballX <= 50 + paddleWidth && ballY + ballSize >= playerY && ballY <= playerY + paddleHeight) {
            ballVX = -ballVX;
            ballX = 50 + paddleWidth; 
        }
        // Opponent Collision
        if (ballX + ballSize >= canvas.width - 50 - paddleWidth && ballY + ballSize >= aiY && ballY <= aiY + paddleHeight) {
            ballVX = -ballVX;
            ballX = canvas.width - 50 - paddleWidth - ballSize;
        }
        
        if (ballX < 0 || ballX > canvas.width) {
            ballX = canvas.width / 2;
            ballY = canvas.height / 2;
            ballVX = -ballVX;
        }
        
        draw();
        gameLoop = requestAnimationFrame(update);
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const color = getComputedStyle(document.body).getPropertyValue('--text-color').trim() || '#000000';
        ctx.fillStyle = color;
        
        ctx.fillRect(50, playerY, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - 50 - paddleWidth, aiY, paddleWidth, paddleHeight);
        ctx.fillRect(ballX, ballY, ballSize, ballSize);
        
        for (let i = 0; i < canvas.height; i += 60) {
            ctx.fillRect(canvas.width / 2 - 2, i, 4, 30);
        }
    }
    
    update();
}
