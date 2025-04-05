const canvas = document.getElementById('fire-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class FireParticle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 100;
    this.size = Math.random() * 2 + 2;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random();
    this.color = `rgba(${255}, ${Math.floor(Math.random() * 150)}, 0, ${this.opacity})`;
  }

  update() {
    this.y -= this.speed;
    this.opacity -= 0.005;
    if (this.opacity <= 0 || this.y < 0) this.reset();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles(num) {
  particles = [];
  for (let i = 0; i < num; i++) {
    particles.push(new FireParticle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}

initParticles(200);
animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(200);
});