import { useRef, useEffect } from "react";

const STAR_COUNT = 48;
const LINE_DISTANCE = 120;
const STAR_SIZE = 2.2;
const STAR_COLOR = "rgba(255,255,255,0.85)";
const LINE_COLOR = "rgba(255,255,255,0.13)";
const VELOCITY_SCALE = 0.25; // Lower = slower
const FREEZE_AFTER = 2000; // ms (2 seconds)

function randomVelocity() {
  return (Math.random() - 0.5) * 0.18 * VELOCITY_SCALE;
}

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef(
    Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: randomVelocity(),
      vy: randomVelocity(),
    }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animationId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frozen = false;

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      if (frozen) draw();
    }

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Draw stars
      for (const star of stars.current) {
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, STAR_SIZE, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      // Draw lines between close stars
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
            ctx.stroke();
          }
        }
      }
    }

    resize();
    window.addEventListener("resize", resize);

    // Freeze animation after a delay
    setTimeout(() => {
      frozen = true;
      draw();
    }, FREEZE_AFTER);

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      // Move and draw stars
      for (const star of stars.current) {
        if (!frozen) {
          star.x += star.vx;
          star.y += star.vy;
          // Bounce off edges
          if (star.x < 0 || star.x > 1) star.vx *= -1;
          if (star.y < 0 || star.y > 1) star.vy *= -1;
        }
      }
      draw();
      if (!frozen) {
        animationId = requestAnimationFrame(animate);
      }
    }
    animate();
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
