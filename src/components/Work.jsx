import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Grad = function (x, y, z) {
  this.x = x; this.y = y; this.z = z;
};
Grad.prototype.dot2 = function (x, y) {
  return this.x * x + this.y * y;
};

class Noise {
  constructor(seed = 0) {
    this.grad3 = [
      new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0),
      new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1),
      new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)
    ];
    this.p = [...Array(256).keys()].map(i => i); // simplified permutation
    this.perm = new Array(512);
    this.gradP = new Array(512);
    this.seed(seed);
  }
  seed(seed) {
    if (seed > 0 && seed < 1) seed *= 65536;
    seed = Math.floor(seed);
    if (seed < 256) seed |= seed << 8;
    for (let i = 0; i < 256; i++) {
      const v = (i & 1) ? (this.p[i] ^ (seed & 255)) : (this.p[i] ^ ((seed >> 8) & 255));
      this.perm[i] = this.perm[i + 256] = v;
      this.gradP[i] = this.gradP[i + 256] = this.grad3[v % 12];
    }
  }
  fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  lerp(a, b, t) { return (1 - t) * a + t * b; }
  perlin2(x, y) {
    const X = Math.floor(x), Y = Math.floor(y);
    x -= X; y -= Y;
    const gi00 = this.gradP[X + this.perm[Y]];
    const gi01 = this.gradP[X + this.perm[Y + 1]];
    const gi10 = this.gradP[X + 1 + this.perm[Y]];
    const gi11 = this.gradP[X + 1 + this.perm[Y + 1]];
    const n00 = gi00.dot2(x, y);
    const n10 = gi10.dot2(x - 1, y);
    const n01 = gi01.dot2(x, y - 1);
    const n11 = gi11.dot2(x - 1, y - 1);
    const u = this.fade(x);
    const v = this.fade(y);
    return this.lerp(this.lerp(n00, n10, u), this.lerp(n01, n11, u), v);
  }
}

const Work = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const noise = useRef(new Noise(Math.random()));
  const lines = useRef([]);
  const mouse = useRef({ x: -10, y: 0, sx: 0, sy: 0, v: 0, vs: 0, lx: 0, ly: 0, a: 0, set: false });
  const frameId = useRef(null);

  const config = {
    lineColor: 'rgba(255,255,255,0.08)',
    waveSpeedX: 0.0125,
    waveSpeedY: 0.005,
    waveAmpX: 32,
    waveAmpY: 16,
    xGap: 10,
    yGap: 32,
    friction: 0.925,
    tension: 0.005,
    maxCursorMove: 100
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    ctxRef.current = canvas.getContext('2d');

    function resize() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;

      const width = canvas.width;
      const height = canvas.height;
      lines.current = [];
      const xStart = (width - config.xGap * Math.ceil((width + 200) / config.xGap)) / 2;
      const yStart = (height - config.yGap * Math.ceil((height + 30) / config.yGap)) / 2;
      for (let i = 0; i <= Math.ceil((width + 200) / config.xGap); i++) {
        const pts = [];
        for (let j = 0; j <= Math.ceil((height + 30) / config.yGap); j++) {
          pts.push({
            x: xStart + config.xGap * i,
            y: yStart + config.yGap * j,
            wave: { x: 0, y: 0 },
            cursor: { x: 0, y: 0, vx: 0, vy: 0 }
          });
        }
        lines.current.push(pts);
      }
    }

    function moved(p, withCursor = true) {
      return {
        x: p.x + p.wave.x + (withCursor ? p.cursor.x : 0),
        y: p.y + p.wave.y + (withCursor ? p.cursor.y : 0),
      };
    }

    function drawLines() {
      const ctx = ctxRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = config.lineColor;
      ctx.beginPath();
      lines.current.forEach((row) => {
        const p1 = moved(row[0], false);
        ctx.moveTo(p1.x, p1.y);
        row.forEach((p, i) => {
          const next = row[i + 1] || p;
          const c1 = moved(p, i !== row.length - 1);
          const c2 = moved(next, i !== row.length - 1);
          ctx.lineTo(c1.x, c1.y);
          if (i === row.length - 1) ctx.moveTo(c2.x, c2.y);
        });
      });
      ctx.stroke();
    }

    function movePoints(t) {
      lines.current.forEach((pts) => {
        pts.forEach((p) => {
          const n = noise.current.perlin2((p.x + t * config.waveSpeedX) * 0.002, (p.y + t * config.waveSpeedY) * 0.0015) * 12;
          p.wave.x = Math.cos(n) * config.waveAmpX;
          p.wave.y = Math.sin(n) * config.waveAmpY;

          const dx = p.x - mouse.current.sx;
          const dy = p.y - mouse.current.sy;
          const dist = Math.hypot(dx, dy);
          const l = Math.max(175, mouse.current.vs);
          if (dist < l) {
            const s = 1 - dist / l;
            const f = Math.cos(dist * 0.001) * s;
            p.cursor.vx += Math.cos(mouse.current.a) * f * l * mouse.current.vs * 0.00065;
            p.cursor.vy += Math.sin(mouse.current.a) * f * l * mouse.current.vs * 0.00065;
          }

          p.cursor.vx += (0 - p.cursor.x) * config.tension;
          p.cursor.vy += (0 - p.cursor.y) * config.tension;
          p.cursor.vx *= config.friction;
          p.cursor.vy *= config.friction;
          p.cursor.x += p.cursor.vx * 2;
          p.cursor.y += p.cursor.vy * 2;
        });
      });
    }

    function animate(t) {
      mouse.current.sx += (mouse.current.x - mouse.current.sx) * 0.1;
      mouse.current.sy += (mouse.current.y - mouse.current.sy) * 0.1;
      const dx = mouse.current.x - mouse.current.lx;
      const dy = mouse.current.y - mouse.current.ly;
      const d = Math.hypot(dx, dy);
      mouse.current.v = d;
      mouse.current.vs += (d - mouse.current.vs) * 0.1;
      mouse.current.vs = Math.min(100, mouse.current.vs);
      mouse.current.lx = mouse.current.x;
      mouse.current.ly = mouse.current.y;
      mouse.current.a = Math.atan2(dy, dx);

      movePoints(t);
      drawLines();
      frameId.current = requestAnimationFrame(animate);
    }

    function updateMouse(e) {
      const bounds = container.getBoundingClientRect();
      mouse.current.x = e.clientX - bounds.left;
      mouse.current.y = e.clientY - bounds.top;
      if (!mouse.current.set) {
        mouse.current.sx = mouse.current.x;
        mouse.current.sy = mouse.current.y;
        mouse.current.lx = mouse.current.x;
        mouse.current.ly = mouse.current.y;
        mouse.current.set = true;
      }
    }

    window.addEventListener('mousemove', updateMouse);
    window.addEventListener('resize', resize);
    resize();
    frameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateMouse);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId.current);
    };
  }, []);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.fade-in');
    gsap.fromTo(
      elements,
      { opacity: 0, y: 40, filter: 'blur(10px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out', stagger: 0.2 }
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#101010] flex flex-col items-center justify-center text-white h-screen w-full px-4 text-center overflow-hidden"
    >
      {/* 👇 Canvas for waves */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />

      {/* 👇 Content */}
      <div className="relative z-8">
        <h1 className="fade-in text-[2.5rem] md:text-[3rem] max-w-3xl font-bold leading-tight tracking-wide glow-text">
          Still cooking the code — <br />
          real projects coming soon!
        </h1>

        <a
          href="https://github.com/divyanshukmwt"
          target="_blank"
          rel="noopener noreferrer"
          className="fade-in mt-6 text-[#fdfffe] hover:underline text-lg tracking-wide block"
        >
          Check out my progress on GitHub
        </a>
      </div>
    </div>
  );
};

export default Work;
