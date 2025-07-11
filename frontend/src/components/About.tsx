import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import fiverr from "../assets/fiverr-svgrepo-com.svg";
import gmail from "../assets/gmail.svg";
import x from "../assets/x.svg";
import About3DShowcase from "./About3DShowcase";
// import icon from "../assets/icon.png";

const socials = [
  { icon: github, url: "https://github.com/dotflux", label: "GitHub" },
  {
    icon: linkedin,
    url: "https://www.linkedin.com/in/anirudh-dhar-33b2a3373/",
    label: "LinkedIn",
  },
  { icon: gmail, url: "mailto:dotflux56@gmail.com", label: "Email" },
  { icon: fiverr, url: "https://www.fiverr.com/dotflux_", label: "Fiverr" },
  { icon: x, url: "https://x.com/dotflux56", label: "X" },
];

const headingWords = ["Digital Wizard,", "At Your Service."];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-hero-heading-word",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.13 }
      );
      gsap.fromTo(
        ".about-hero-desc",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        ".about-hero-socials > *",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: 0.08,
          delay: 0.7,
        }
      );
      gsap.fromTo(
        ".about-hero-cta > *",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.9,
        }
      );
      // Social icon GSAP hover (match Contact)
      const iconEls = gsap.utils.toArray<HTMLElement>(
        ".about-hero-social-icon"
      );
      iconEls.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(el, {
            scale: 1.15,
            boxShadow: "0 0 24px 4px #60a5fa",
            duration: 0.25,
            ease: "power2.out",
          });
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            scale: 1,
            boxShadow: "0 0 0 0 #60a5fa",
            duration: 0.25,
            ease: "power2.in",
          });
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative z-10 min-h-[70vh] flex flex-col md:flex-row items-center justify-center px-8 gap-12 text-left mt-24 md:ml-8"
    >
      {/* Left: Text content */}
      <div className="flex-1 flex flex-col gap-6 items-start max-w-xl">
        <h1 className="about-hero-heading text-5xl md:text-6xl font-extrabold text-white mb-2 flex flex-wrap gap-x-3">
          {headingWords.map((word, i) => (
            <span
              key={i}
              className="about-hero-heading-word inline-block relative"
            >
              {word}
            </span>
          ))}
        </h1>
        <p className="about-hero-desc text-xl text-gray-300 mb-2">
          Hey, I’m <span className="text-cyan-400 font-bold">Anirudh</span>, or{" "}
          <span className="text-red-400 font-bold">Dotflux</span>, a 17-year-old
          developer who has experience building{" "}
          <span className="text-green-400 font-bold">
            full-stack web applications
          </span>{" "}
          with NestJS, React/Next.js, and more tools and skills under my belt.
        </p>
        <div className="about-hero-socials flex flex-wrap gap-3 mt-2 opacity-100">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="about-hero-social-icon w-10 h-10 rounded-full flex items-center justify-center bg-[#23232a] text-white text-xl transition-all duration-200 shadow-md"
              style={{ boxShadow: "0 0 0 0 #60a5fa" }}
            >
              <img src={s.icon} alt={s.label} className="w-6 h-6" />
            </a>
          ))}
        </div>
        <div className="about-hero-cta flex flex-col w-full gap-4 mt-4 opacity-100 md:flex-row md:gap-6 md:w-auto">
          <a
            href="#projects"
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-black font-semibold text-base md:text-lg shadow-lg transition-all duration-200 relative overflow-hidden group text-center hover:bg-[#23232a] hover:text-white"
          >
            <span className="relative z-10">PROJECTS</span>
          </a>
          <a
            href="#contact"
            className="w-full md:w-auto px-6 py-3 rounded-lg bg-white text-black font-semibold text-base md:text-lg shadow-lg transition-all duration-200 relative overflow-hidden group text-center hover:bg-[#23232a] hover:text-white"
          >
            <span className="relative z-10">CONTACT ME</span>
          </a>
        </div>
      </div>
      {/* Right: Animated blurred orb accent + Info Card */}
      <div className="flex-1 flex items-center justify-center w-full relative min-h-[320px]">
        {/* Remove blurred orb and fun fact card, add 3D wizard hat */}
        <About3DShowcase />
      </div>
    </section>
  );
};

export default About;
