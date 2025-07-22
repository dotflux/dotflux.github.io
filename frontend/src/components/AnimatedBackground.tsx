import { useRef, useEffect } from "react";

const STAR_COUNT = 32;
const LINE_DISTANCE = 120;
const STAR_SIZE = 2.2;
const STAR_COLOR = "rgba(255,255,255,0.85)";
const LINE_COLOR = "rgba(255,255,255,0.13)";
const VELOCITY_SCALE = 0.25;
const FREEZE_AFTER = 1000;

function randomVelocity() {
  return (Math.random() - 0.5) * 0.18 * VELOCITY_SCALE;
}

const NEBULA_COLORS = [
  "rgba(56,189,248,0.10)",
  "rgba(167,139,250,0.10)",
  "rgba(236,72,153,0.08)",
];

const PARTICLE_COUNT = 16;
const PARTICLE_COLORS = ["#a78bfa", "#38bdf8", "#fff", "#4ade80", "#f87171"];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef(
    Array.from({ length: STAR_COUNT }, () => {
      const y = Math.random();
      const x = Math.random();
      return {
        x,
        baseX: x,
        y,
        baseY: y,
        vx: randomVelocity(),
        vy: randomVelocity(),
        pulse: Math.random() * Math.PI * 2,
        twinkle: 0,
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 18000 + Math.random() * 10000,
        floatAmpY: 0.025 + Math.random() * 0.025,
        floatAmpX: 0.012 + Math.random() * 0.012,
      };
    })
  );
  const lines = useRef<{ a: number; b: number; phase: number }[]>([]);
  const frozen = useRef(false);
  const lastLineUpdate = useRef(0);
  const LINE_UPDATE_INTERVAL = 100;
  const nebulaRef = useRef<
    { x: number; y: number; r: number; color: string }[]
  >([]);

  const scrollParticles = useRef(
    Array.from({ length: PARTICLE_COUNT }, () => {
      const color =
        PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      return {
        x0: Math.random(),
        y0: Math.random(),
        x1: Math.random(),
        y1: Math.random(),
        color,
        phase: Math.random() * Math.PI * 2,
        speed: 2000 + Math.random() * 2000,
      };
    })
  );
  const scrollProgress = useRef(0);
  const lastScrollY = useRef(window.scrollY || 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      if (frozen.current) draw(0);
      // Nebula positions (static)
      nebulaRef.current = Array.from({ length: 3 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 220 + Math.random() * 200,
        color: NEBULA_COLORS[i],
      }));
    }

    // Precompute lines for static mode
    function computeLines() {
      const arr: { a: number; b: number; phase: number }[] = [];
      for (let i = 0; i < stars.current.length; i++) {
        for (let j = i + 1; j < stars.current.length; j++) {
          const a = stars.current[i];
          const b = stars.current[j];
          const dx = (a.x - b.x) * width;
          const dy = (a.y - b.y) * height;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DISTANCE) {
            arr.push({ a: i, b: j, phase: Math.random() * Math.PI * 2 });
          }
        }
      }
      lines.current = arr;
    }

    function onScroll() {
      const maxScroll = Math.max(
        1,
        document.body.scrollHeight - window.innerHeight
      );
      const y = window.scrollY || 0;
      scrollProgress.current = Math.max(0, Math.min(1, y / maxScroll));
      lastScrollY.current = y;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // --- Nebula/gradient background (static) ---
      nebulaRef.current.forEach((n) => {
        const grad = ctx.createRadialGradient(
          n.x,
          n.y,
          n.r * 0.2,
          n.x,
          n.y,
          n.r
        );
        grad.addColorStop(0, n.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.filter = "blur(32px)";
        ctx.fill();
        ctx.filter = "none";
        ctx.restore();
      });
      // --- End nebula ---

      // --- Scroll-reactive particles ---
      const t = scrollProgress.current;
      for (const p of scrollParticles.current) {
        const px = lerp(p.x0, p.x1, t) * width;
        const py = lerp(p.y0, p.y1, t) * height;
        // Twinkle effect
        const twinkle =
          0.7 + 0.6 * Math.abs(Math.sin((time + p.phase * 1000) / p.speed));
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, 2 * Math.PI);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 12 * twinkle;
        ctx.globalAlpha = 0.5 + 0.5 * twinkle;
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.restore();
      }
      // --- End scroll-reactive particles ---

      // --- Draw stars and lines (no scroll/rotate) ---
      // Batch star rendering
      ctx.save();
      ctx.shadowColor = "#38bdf8";

      // Animate stars
      for (let i = 0; i < stars.current.length; i++) {
        const star = stars.current[i];
        let glow = 1;
        let y = star.y;
        let x = star.x;

        if (frozen.current) {
          // Wavy float after freeze
          y =
            star.baseY +
            star.floatAmpY * Math.sin(time / star.floatSpeed + star.floatPhase);
          x =
            star.baseX +
            star.floatAmpX *
              Math.cos(time / (star.floatSpeed * 0.7) + star.floatPhase * 1.3);
          star.y = y;
          star.x = x;

          // Pulse glow
          glow = 0.5 + 1.0 * Math.sin(time / 500 + star.pulse);

          // Occasional twinkle (reduced frequency)
          if (star.twinkle > 0) {
            glow += star.twinkle;
            star.twinkle -= 0.025;
            if (star.twinkle < 0) star.twinkle = 0;
          } else if (Math.random() < 0.001) {
            star.twinkle = 1.5 + Math.random() * 1.0;
          }
        }

        // Reduced shadow blur for better performance
        ctx.shadowBlur = 8 * glow;
        ctx.globalAlpha = 0.7 * Math.max(0.5, glow);

        ctx.beginPath();
        ctx.arc(x * width, y * height, STAR_SIZE, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.fill();
      }

      ctx.restore();

      // Animate lines with reduced frequency
      if (frozen.current) {
        // Only update lines periodically instead of every frame
        if (time - lastLineUpdate.current > LINE_UPDATE_INTERVAL) {
          computeLines();
          lastLineUpdate.current = time;
        }

        // Draw cached lines
        ctx.save();
        ctx.shadowColor = "#38bdf8";

        for (const line of lines.current) {
          const a = stars.current[line.a];
          const b = stars.current[line.b];

          // Pulse opacity
          const phase = (line.a * 13 + line.b * 7) % 100;
          const pulse = 0.5 + 0.5 * Math.abs(Math.sin(time / 700 + phase));

          ctx.beginPath();
          ctx.moveTo(a.x * width, a.y * height);
          ctx.lineTo(b.x * width, b.y * height);
          ctx.strokeStyle = LINE_COLOR;
          ctx.globalAlpha = 0.32 * pulse;
          ctx.lineWidth = 2.1;
          ctx.shadowBlur = 12 * pulse;
          ctx.stroke();
        }

        ctx.restore();
      } else {
        // Draw static lines
        ctx.save();
        ctx.globalAlpha = 0.13;
        ctx.lineWidth = 1.1;

        for (let i = 0; i < stars.current.length; i++) {
          for (let j = i + 1; j < stars.current.length; j++) {
            const a = stars.current[i];
            const b = stars.current[j];
            const dx = (a.x - b.x) * width;
            const dy = (a.y - b.y) * height;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINE_DISTANCE) {
              ctx.beginPath();
              ctx.moveTo(a.x * width, a.y * height);
              ctx.lineTo(b.x * width, b.y * height);
              ctx.strokeStyle = LINE_COLOR;
              ctx.stroke();
            }
          }
        }

        ctx.restore();
      }
      // --- End scroll/rotate transform ---
      ctx.restore();
    }

    resize();
    window.addEventListener("resize", resize);

    // Freeze animation after a delay
    setTimeout(() => {
      frozen.current = true;
      computeLines();
    }, FREEZE_AFTER);

    function animate(time: number) {
      if (!ctx) return;
      if (!frozen.current) {
        // Move and draw stars
        for (const star of stars.current) {
          star.x += star.vx;
          star.y += star.vy;
          // Bounce off edges
          if (star.x < 0 || star.x > 1) star.vx *= -1;
          if (star.y < 0 || star.y > 1) star.vy *= -1;
        }
      }
      draw(time);
      animationId = requestAnimationFrame(animate);
    }
    animate(0);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: "#0a0a0a" }}
    />
  );
};

export default AnimatedBackground;
