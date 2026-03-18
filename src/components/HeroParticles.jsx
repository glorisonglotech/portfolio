import { useEffect, useRef } from "react";

export const HeroParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId;
    let mouse = { x: null, y: null };
    let lastRippleTime = 0;

    // ── Ripple pool ──────────────────────────────────────────────
    const ripples = [];

    class Ripple {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 120 + Math.random() * 60;
        this.speed = 2.2 + Math.random() * 1.2;
        this.alpha = 0.7;
        this.done = false;
      }
      update() {
        this.radius += this.speed;
        this.alpha = 0.7 * (1 - this.radius / this.maxRadius);
        if (this.radius >= this.maxRadius) this.done = true;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(239,68,68,${this.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // inner subtle ring
        if (this.radius > 20) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(239,68,68,${this.alpha * 0.4})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // ── Particle pool ────────────────────────────────────────────
    const PARTICLE_COUNT = 110;
    const MAX_DIST = 130;
    const MOUSE_DIST = 160;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseVx = (Math.random() - 0.5) * 0.55;
        this.baseVy = (Math.random() - 0.5) * 0.55;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.radius = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.45 + 0.25;
      }

      applyRippleForce() {
        for (const r of ripples) {
          const dx = this.x - r.x;
          const dy = this.y - r.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const waveBand = 18; // how thick the wave band is
          const diff = Math.abs(dist - r.radius);
          if (diff < waveBand && dist > 0) {
            // push outward from ripple ring
            const force = (1 - diff / waveBand) * 1.8;
            this.vx += (dx / dist) * force;
            this.vy += (dy / dist) * force;
          }
        }
      }

      update() {
        // dampen back toward base velocity
        this.vx = this.vx * 0.92 + this.baseVx * 0.08;
        this.vy = this.vy * 0.92 + this.baseVy * 0.08;

        // mouse cursor repulsion
        if (mouse.x !== null) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST && dist > 0) {
            const force = (MOUSE_DIST - dist) / MOUSE_DIST;
            this.vx += (dx / dist) * force * 2.5;
            this.vy += (dy / dist) * force * 2.5;
          }
        }

        // ripple wave push
        this.applyRippleForce();

        this.x += this.vx;
        this.y += this.vy;

        // bounce walls
        if (this.x < 0 || this.x > canvas.width) {
          this.baseVx *= -1;
          this.vx *= -1;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.baseVy *= -1;
          this.vy *= -1;
        }
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239,68,68,${this.opacity})`;
        ctx.fill();
      }
    }

    const particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());

    // ── Event listeners ──────────────────────────────────────────
    const spawnRipple = (x, y) => {
      ripples.push(new Ripple(x, y));
      // spawn a tight secondary ring for depth
      if (Math.random() > 0.4) {
        const r2 = new Ripple(x, y);
        r2.speed = 1.4;
        r2.maxRadius = 60 + Math.random() * 40;
        r2.alpha = 0.4;
        ripples.push(r2);
      }
    };

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      // throttle ripple spawning to every ~80ms
      const now = performance.now();
      if (now - lastRippleTime > 80) {
        spawnRipple(mouse.x, mouse.y);
        lastRippleTime = now;
      }
    };

    const onMouseLeave = () => { mouse.x = null; mouse.y = null; };

    const onTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const t = e.touches[0];
      mouse.x = t.clientX - rect.left;
      mouse.y = t.clientY - rect.top;
      const now = performance.now();
      if (now - lastRippleTime > 80) {
        spawnRipple(mouse.x, mouse.y);
        lastRippleTime = now;
      }
    };

    const onTouchEnd = () => { mouse.x = null; mouse.y = null; };

    // ambient random ripples to keep surface alive
    const ambientInterval = setInterval(() => {
      const rx = Math.random() * canvas.width;
      const ry = Math.random() * canvas.height;
      const r = new Ripple(rx, ry);
      r.speed = 1.2;
      r.maxRadius = 50 + Math.random() * 40;
      r.alpha = 0.25;
      ripples.push(r);
    }, 2000);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchmove", onTouchMove, { passive: true });
    canvas.addEventListener("touchend", onTouchEnd);

    // ── Main loop ────────────────────────────────────────────────
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // update & draw ripples, prune finished ones
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].update();
        ripples[i].draw();
        if (ripples[i].done) ripples.splice(i, 1);
      }

      // connecting lines between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(239,68,68,${(1 - dist / MAX_DIST) * 0.28})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // lines to mouse cursor
        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(239,68,68,${(1 - dist / MOUSE_DIST) * 0.5})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => { p.update(); p.draw(); });

      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(ambientInterval);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "all",
        zIndex: 0,
      }}
    />
  );
};