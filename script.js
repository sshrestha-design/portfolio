const projectLinks = document.querySelectorAll('.project-list a');
const hoverImageWrapper = document.getElementById('hover-image-wrapper');
const hoverImage = document.getElementById('hover-image');
const themeToggle = document.getElementById('theme-toggle');

// Project hover image reveal
if (projectLinks.length > 0 && hoverImageWrapper) {
    const hoverDesc = document.getElementById('hover-desc');

    projectLinks.forEach(link => {
        link.addEventListener('mouseenter', (e) => {
            const imgSrc = e.currentTarget.getAttribute('data-img');
            const desc = e.currentTarget.getAttribute('data-desc');
            
            if (imgSrc) {
                hoverImage.src = imgSrc;
                
                // Add dynamic alt text for SEO and accessibility
                const linkTitle = e.currentTarget.textContent.split('[')[0].trim();
                hoverImage.alt = linkTitle ? `${linkTitle} Gameplay Preview` : "Project Preview";
                
                if (hoverDesc && desc) {
                    hoverDesc.textContent = desc;
                    hoverDesc.style.display = 'block';
                } else if (hoverDesc) {
                    hoverDesc.style.display = 'none';
                }

                hoverImageWrapper.classList.add('active');
                
                // Randomize rotation between -6deg and 6deg
                currentRotation = Math.random() * 12 - 6;
                hoverImageWrapper.style.transform = `scale(1) rotate(${currentRotation}deg)`;
                
                // Position fixed on the bottom left of the screen to avoid overlapping the archive list
                hoverImageWrapper.style.right = 'auto';
                hoverImageWrapper.style.top = 'auto';
                hoverImageWrapper.style.left = '2rem';
                hoverImageWrapper.style.bottom = '4rem';
            }
        });

        link.addEventListener('mouseleave', () => {
            hoverImageWrapper.classList.remove('active');
            hoverImageWrapper.style.transform = `scale(0.8) rotate(${currentRotation - 10}deg)`;
        });
    });
}

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

// Tab Navigation Logic
const navBtns = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.dashboard-section');

if (navBtns.length > 0 && sections.length > 0) {
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            navBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            // Hide all sections
            sections.forEach(s => s.classList.remove('active'));

            // Show target section
            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

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
        
        // Brutalist AI
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
        // AI Collision
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
