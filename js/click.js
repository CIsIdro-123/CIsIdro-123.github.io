class ClickEffects {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;

    const style = this.canvas.style;
    style.position = 'fixed';
    style.top = style.left = 0;
    style.zIndex = '999999';
    style.pointerEvents = 'none'; 
    style.width = this.canvas.width = window.innerWidth;
    style.height = this.canvas.height = window.innerHeight;
    document.body.append(this.canvas);

    // 监听指针事件，同时覆盖鼠标和触屏
    window.addEventListener('pointerdown', this.handleClick.bind(this));
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  handleClick(e) {
    const x = e.clientX, y = e.clientY;
    const colors = ['#00ccff', '#ff6a9d', '#88ff88', '#ffffff']; 
    
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 1.5 + Math.random() * 2.5;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1
      });
    }
    if (!this.running) this.run();
  }

  run() {
    this.running = true;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.03; // 轻微重力
      p.alpha -= 0.025; // 消散速度
      if (p.alpha <= 0) { this.particles.splice(i, 1); continue; }
      
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1;
    if (this.particles.length > 0) {
      requestAnimationFrame(this.run.bind(this));
    } else {
      this.running = false;
    }
  }
}

window.addEventListener('DOMContentLoaded', () => new ClickEffects());