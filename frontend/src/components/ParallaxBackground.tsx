import { useEffect, useRef } from "react";

const STAR_COUNT = 32;
const LINE_DISTANCE = 120;
const STAR_SIZE = 2.2;
const STAR_COLOR = "rgba(255,255,255,0.85)";
const LINE_COLOR = "rgba(255,255,255,0.13)";
const VELOCITY_SCALE = 0.25;
const FREEZE_AFTER = 1000;
const ZONE_HEIGHT = 1200;
const ZONE_FADE = 400;
const NEBULA_COLORS = [
  "rgba(56,189,248,0.10)",
  "rgba(167,139,250,0.10)",
  "rgba(236,72,153,0.08)",
];

function randomVelocity() {
  return (Math.random() - 0.5) * 0.18 * VELOCITY_SCALE;
}

function createStars(count = STAR_COUNT) {
  return Array.from({ length: count }, () => {
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
  });
}

function computeLines(stars: any[], width: number, height: number) {
  const arr: { a: number; b: number; phase: number }[] = [];
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const a = stars[i];
      const b = stars[j];
      const dx = (a.x - b.x) * width;
      const dy = (a.y - b.y) * height;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < LINE_DISTANCE) {
        arr.push({ a: i, b: j, phase: Math.random() * Math.PI * 2 });
      }
    }
  }
  return arr;
}

export default function ParallaxBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const zoneCache = useRef<{ stars: any[]; lines: any[] }[]>([]);
  const nebulaRef = useRef<
    { x: number; y: number; r: number; color: string }[]
  >([]);
  const frozen = useRef(false);
  const lastLineUpdate = useRef(0);
  const LINE_UPDATE_INTERVAL = 100;

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
      nebulaRef.current = Array.from({ length: 3 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 220 + Math.random() * 200,
        color: NEBULA_COLORS[i],
      }));
      zoneCache.current = [];
    }

    function getZone(idx: number) {
      if (!zoneCache.current[idx]) {
        const stars = createStars();
        zoneCache.current[idx] = {
          stars,
          lines: computeLines(stars, width, height),
        };
      }
      return zoneCache.current[idx];
    }

    function draw(time: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
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
      const scrollY = window.scrollY;
      const zoneIdx = Math.floor(scrollY / ZONE_HEIGHT);
      const blend = (scrollY % ZONE_HEIGHT) / ZONE_FADE;
      for (let z = zoneIdx; z <= zoneIdx + 1; z++) {
        const zone = getZone(z);
        const fade = z === zoneIdx ? 1 - blend : blend;
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, fade));
        ctx.shadowColor = "#38bdf8";
        for (let i = 0; i < zone.stars.length; i++) {
          const star = zone.stars[i];
          let glow = 1;
          let y = star.y;
          let x = star.x;
          if (frozen.current) {
            y =
              star.baseY +
              star.floatAmpY *
                Math.sin(time / star.floatSpeed + star.floatPhase);
            x =
              star.baseX +
              star.floatAmpX *
                Math.cos(
                  time / (star.floatSpeed * 0.7) + star.floatPhase * 1.3
                );
            star.y = y;
            star.x = x;
            glow = 0.5 + 1.0 * Math.sin(time / 500 + star.pulse);
            if (star.twinkle > 0) {
              glow += star.twinkle;
              star.twinkle -= 0.025;
              if (star.twinkle < 0) star.twinkle = 0;
            } else if (Math.random() < 0.001) {
              star.twinkle = 1.5 + Math.random() * 1.0;
            }
          }
          ctx.shadowBlur = 8 * glow;
          ctx.globalAlpha =
            0.7 * Math.max(0.5, glow) * Math.max(0, Math.min(1, fade));
          ctx.beginPath();
          ctx.arc(x * width, y * height, STAR_SIZE, 0, 2 * Math.PI);
          ctx.fillStyle = STAR_COLOR;
          ctx.fill();
        }
        ctx.restore();
        if (frozen.current) {
          if (time - lastLineUpdate.current > LINE_UPDATE_INTERVAL) {
            zone.lines = computeLines(zone.stars, width, height);
            lastLineUpdate.current = time;
          }
          ctx.save();
          ctx.shadowColor = "#38bdf8";
          for (const line of zone.lines) {
            const a = zone.stars[line.a];
            const b = zone.stars[line.b];
            const phase = (line.a * 13 + line.b * 7) % 100;
            const pulse = 0.5 + 0.5 * Math.abs(Math.sin(time / 700 + phase));
            ctx.beginPath();
            ctx.moveTo(a.x * width, a.y * height);
            ctx.lineTo(b.x * width, b.y * height);
            ctx.strokeStyle = LINE_COLOR;
            ctx.globalAlpha = 0.32 * pulse * Math.max(0, Math.min(1, fade));
            ctx.lineWidth = 2.1;
            ctx.shadowBlur = 12 * pulse;
            ctx.stroke();
          }
          ctx.restore();
        } else {
          ctx.save();
          ctx.globalAlpha = 0.13 * Math.max(0, Math.min(1, fade));
          ctx.lineWidth = 1.1;
          for (let i = 0; i < zone.stars.length; i++) {
            for (let j = i + 1; j < zone.stars.length; j++) {
              const a = zone.stars[i];
              const b = zone.stars[j];
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
      }
    }

    resize();
    window.addEventListener("resize", resize);
    setTimeout(() => {
      frozen.current = true;
    }, FREEZE_AFTER);

    function animate(time: number) {
      if (!ctx) return;
      if (!frozen.current) {
        for (let z = 0; z < zoneCache.current.length; z++) {
          const zone = zoneCache.current[z];
          if (!zone) continue;
          for (const star of zone.stars) {
            star.x += star.vx;
            star.y += star.vy;
            if (star.x < 0 || star.x > 1) star.vx *= -1;
            if (star.y < 0 || star.y > 1) star.vy *= -1;
          }
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
      className="pointer-events-none fixed inset-0 w-full h-full z-0"
      style={{ background: "#0a0a0a" }}
    />
  );
}
