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
            // Trigger Massive Screen Shake
            document.body.classList.add('shake');
            setTimeout(() => document.body.classList.remove('shake'), 800);
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
