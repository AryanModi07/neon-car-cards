/* =========================
   🌌 PARTICLE BACKGROUND
========================= */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];
const PARTICLE_COUNT = 70;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.8 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }
}
initParticles();

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}
animateParticles();

/* =========================
   🧭 PROFESSIONAL 3D TILT
========================= */
const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {

    document.querySelectorAll(".neon-card").forEach(card => {
        const inner = card.querySelector(".card-inner");

        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const maxTilt = 14;
        const scale = 1.04;
        const ease = 0.12;

        function animate() {
            currentX += (targetX - currentX) * ease;
            currentY += (targetY - currentY) * ease;

            inner.style.transform =
                `rotateX(${currentX}deg) rotateY(${currentY}deg) scale(${scale})`;

            requestAnimationFrame(animate);
        }
        animate();

        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            targetX = -(y * maxTilt);
            targetY = x * maxTilt;
        });

        card.addEventListener("mouseleave", () => {
            targetX = 0;
            targetY = 0;
        });
    });
}
