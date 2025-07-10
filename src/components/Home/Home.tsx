import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Home = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".home-heading", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from(".home-lead", {
        x: -40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
      });
      gsap.from(".home-cta", {
        scale: 0.7,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(1.7)",
        delay: 0.6,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 min-h-[60vh] flex flex-col items-center justify-center px-8 py-24 overflow-hidden"
    >
      {/* Blurred glassy orb accent */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-white/10 via-blue-400/10 to-purple-400/10 blur-3xl opacity-80 shadow-2xl animate-pulse pointer-events-none"
        style={{ filter: "blur(48px)" }}
      ></div>
      <h1 className="home-heading text-5xl md:text-6xl font-extrabold text-white mb-6 text-center relative z-10">
        Welcome to My Portfolio
      </h1>
      <p className="home-lead text-xl text-gray-300 mb-8 max-w-2xl text-center relative z-10">
        Explore my work, skills, and experience in building high-quality, modern
        web applications with a focus on performance, design, and innovation.
      </p>
      <a
        href="#projects"
        className="home-cta px-10 py-4 rounded-lg bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-800 hover:to-purple-800 text-white font-semibold text-lg shadow-lg transition-all duration-200 relative overflow-hidden group z-10"
      >
        <span className="relative z-10">View Projects</span>
        <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300 z-0"></span>
      </a>
    </section>
  );
};

export default Home;
