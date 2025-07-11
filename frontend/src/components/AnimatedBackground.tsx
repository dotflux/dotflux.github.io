import { useRef, useEffect } from "react";

const STAR_COUNT = 48;
const LINE_DISTANCE = 120;
const STAR_SIZE = 2.2;
const STAR_COLOR = "rgba(255,255,255,0.85)";
const LINE_COLOR = "rgba(255,255,255,0.13)";
const VELOCITY_SCALE = 0.25; // Lower = slower
const FREEZE_AFTER = 1000; // ms (2 seconds)

function randomVelocity() {
  return (Math.random() - 0.5) * 0.18 * VELOCITY_SCALE;
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
        pulse: Math.random() * Math.PI * 2, // phase offset for pulsing
        twinkle: 0, // twinkle state
        floatPhase: Math.random() * Math.PI * 2,
        floatSpeed: 18000 + Math.random() * 10000, // slower, wavier
        floatAmpY: 0.025 + Math.random() * 0.025, // more pronounced Y
        floatAmpX: 0.012 + Math.random() * 0.012, // subtle X
      };
    })
  );
  const lines = useRef<{ a: number; b: number; phase: number }[]>([]);
  const frozen = useRef(false);

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

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Animate stars
      for (let i = 0; i < stars.current.length; i++) {
        const star = stars.current[i];
        let glow = 1;
        let y = star.y;
        let x = star.x;
        if (frozen.current) {
          // Wavy float after freeze (update x and y)
          y =
            star.baseY +
            star.floatAmpY * Math.sin(time / star.floatSpeed + star.floatPhase);
          x =
            star.baseX +
            star.floatAmpX *
              Math.cos(time / (star.floatSpeed * 0.7) + star.floatPhase * 1.3);
          star.y = y;
          star.x = x;
          // Pulse glow (more intense and faster)
          glow = 0.5 + 1.0 * Math.sin(time / 500 + star.pulse);
          // Occasional twinkle (less frequent, lasts longer)
          if (star.twinkle > 0) {
            glow += star.twinkle;
            star.twinkle -= 0.025;
            if (star.twinkle < 0) star.twinkle = 0;
          } else if (Math.random() < 0.002) {
            star.twinkle = 1.5 + Math.random() * 1.0;
          }
        }
        ctx.save();
        ctx.beginPath();
        ctx.arc(x * width, y * height, STAR_SIZE, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = "#38bdf8"; // blue tint
        ctx.shadowBlur = 16 * glow;
        ctx.globalAlpha = 0.7 * Math.max(0.5, glow);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.restore();
      }
      // Animate lines
      if (frozen.current) {
        // Recompute lines every frame based on floating positions
        for (let i = 0; i < stars.current.length; i++) {
          for (let j = i + 1; j < stars.current.length; j++) {
            const a = stars.current[i];
            const b = stars.current[j];
            const dx = (a.x - b.x) * width;
            const dy = (a.y - b.y) * height;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < LINE_DISTANCE) {
              // Pulse opacity (stronger and faster)
              const phase = (i * 13 + j * 7) % 100;
              const pulse = 0.5 + 0.5 * Math.abs(Math.sin(time / 700 + phase));
              ctx.save();
              ctx.beginPath();
              ctx.moveTo(a.x * width, a.y * height);
              ctx.lineTo(b.x * width, b.y * height);
              ctx.strokeStyle = LINE_COLOR;
              ctx.globalAlpha = 0.32 * pulse; // more visible
              ctx.lineWidth = 2.1; // thicker
              ctx.shadowColor = "#38bdf8";
              ctx.shadowBlur = 18 * pulse;
              ctx.stroke();
              ctx.globalAlpha = 1;
              ctx.shadowBlur = 0;
              ctx.restore();
            }
          }
        }
      } else {
        // Draw lines between close stars (static alpha)
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
              ctx.lineWidth = 1.1;
              ctx.globalAlpha = 0.13;
              ctx.stroke();
              ctx.globalAlpha = 1;
            }
          }
        }
      }
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
