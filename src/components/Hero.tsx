import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import github from "../assets/github.svg";
import gmail from "../assets/gmail.svg";
import linkedIn from "../assets/linkedin.svg";
import fiverr from "../assets/fiverr-svgrepo-com.svg";
import x from "../assets/x.svg";

const headingWords = ["Welcome to my world."];

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: false });

      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-heading-word",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", stagger: 0.15 }
      );
      gsap.fromTo(
        ".hero-desc",
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.8 }
      );
      gsap.fromTo(
        ".hero-social",
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.15,
          delay: 1.1,
        }
      );
      gsap.fromTo(
        ".hero-img",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={heroRef}
      className="relative z-10 min-h-[90vh] flex flex-col md:flex-row items-center justify-center w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 gap-12 text-left mt-24 md:mt-12"
    >
      <div className="flex-1 flex flex-col gap-6 items-start max-w-xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 flex flex-wrap gap-x-3">
          {headingWords.map((word, i) => (
            <span key={i} className="hero-heading-word inline-block relative">
              {word}
            </span>
          ))}
        </h1>

        <p className="hero-desc text-lg text-gray-400 max-w-md leading-relaxed">
          Hey, I’m <span className="text-blue-400 font-semibold">Anirudh</span>,
          or <span className="text-red-400 font-semibold">Dotflux</span>, a
          developer who has experience building{" "}
          <span className="text-green-400 font-semibold">
            full-stack applications
          </span>{" "}
          with NestJS, React/Next.js, and more tools and skills under my belt.
        </p>

        <div className="hero-cta flex gap-4 mt-4">
          <button
            onClick={() => handleNavClick("projects")}
            className="px-6 py-3 rounded-lg bg-white text-black font-semibold text-base shadow-lg transition-all duration-200 hover:bg-gray-300"
          >
            View My Work
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="px-6 py-3 rounded-lg border border-gray-400 text-gray-200 font-semibold text-base shadow-md hover:bg-white hover:text-black transition-all duration-200"
          >
            Contact
          </button>
        </div>

        <div className="flex gap-5 mt-6">
          <a
            href="https://github.com/dotflux"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <img src={github} width={26} height={26} />
          </a>
          <a
            href="https://www.linkedin.com/in/anirudh-dhar-33b2a3373/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <img src={linkedIn} width={26} height={26} />
          </a>
          <a
            href="mailto:dotflux56@gmail.com"
            className="hero-social text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <img src={gmail} width={26} height={26} />
          </a>
          <a
            href="https://www.fiverr.com/dotflux_"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <img src={fiverr} width={26} height={26} />
          </a>
          <a
            href="https://x.com/dotflux56"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
          >
            <img src={x} width={26} height={26} />
          </a>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
        <img
          src="/storyset_1.svg"
          alt="Hero Animation"
          className="hero-img w-[350px] md:w-[500px] h-auto"
        />
      </div>
    </section>
  );
};

export default Hero;
