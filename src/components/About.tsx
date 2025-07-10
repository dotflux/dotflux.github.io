import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import github from "../assets/github.svg";
import linkedin from "../assets/linkedin.svg";
import fiverr from "../assets/fiverr-svgrepo-com.svg";
import gmail from "../assets/gmail.svg";
import x from "../assets/x.svg";

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

const headingWords = [
  "Digital",
  "Wizard,",
  "At",
  "Your",
  "Service: ",
  "Name's",
  "Anirudh",
];

const funFacts = [
  "I love building stuff that could have a <span class='text-blue-300 font-bold'>Interactive Experience</span> or gameplay related to the shows i have watched",
  "I once built a <span class='text-blue-300 font-bold'>Discord bot game</span> with similar mechanics to pokemon but for one piece and its vast world",
  "I think <span class='text-blue-300 font-bold'>Glassmorphism</span> is the best thing to happen to web design since flexbox.",
];

const About = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [fact, setFact] = useState(funFacts[0]);

  useEffect(() => {
    setFact(funFacts[Math.floor(Math.random() * funFacts.length)]);
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
      gsap.fromTo(
        ".about-info-card",
        { y: 40, opacity: 0, rotate: -8, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          scale: 1,
          duration: 1.1,
          ease: "back.out(1.7)",
          delay: 0.7,
        }
      );
      gsap.to(".about-info-card-glow", {
        boxShadow: "0 0 32px 8px #f472b6, 0 0 64px 16px #818cf8",
        repeat: -1,
        yoyo: true,
        duration: 2.5,
        ease: "sine.inOut",
        delay: 1.2,
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
          Hey, I’m <span className="text-cyan-400 font-bold">Anirudh</span> OR{" "}
          <span className="text-red-400 font-bold">Dotflux</span> a 17 year old
          developer who codes, designs, and obsesses over the little things. I
          love turning ideas into interactive experiences, especially when I get
          to play with technology magic doing so. If you catch me staring at a
          landing page, I’m probably thinking up the next improvement possible.
          I believe the best projects are the ones that make people say “whoa,
          how’d you do that?”
        </p>
        <div className="about-hero-socials flex flex-wrap gap-3 mt-2 opacity-100">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#23232a] text-white text-xl hover:bg-blue-500/80 hover:text-white transition-all duration-200 shadow-md about-hero-social-icon"
              style={{ boxShadow: "0 0 0 0 #60a5fa" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 16px 2px #60a5fa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 0 #60a5fa")
              }
            >
              <img src={s.icon} alt={s.label} className="w-6 h-6" />
            </a>
          ))}
        </div>
        <div className="about-hero-cta flex gap-6 mt-4 opacity-100">
          <a
            href="#projects"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-700 to-blue-700 hover:from-purple-800 hover:to-blue-800 text-white font-semibold text-lg shadow-lg transition-all duration-200 relative overflow-hidden group"
          >
            <span className="relative z-10">PROJECTS</span>
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300 z-0"></span>
          </a>
          <a
            href="#contact"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg shadow-lg transition-all duration-200 relative overflow-hidden group"
          >
            <span className="relative z-10">CONTACT ME</span>
            <span className="absolute left-0 bottom-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300 z-0"></span>
          </a>
        </div>
      </div>
      {/* Right: Animated blurred orb accent + Info Card */}
      <div className="flex-1 flex items-center justify-center w-full relative">
        <div
          className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-white/10 via-gray-400/10 to-black/10 blur-3xl opacity-80 shadow-2xl animate-pulse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ filter: "blur(48px)" }}
        ></div>
        {/* Glassmorphic Fun Fact Card - Dark/Blue Glow Style */}
        <div
          className="about-info-card relative z-10 w-[340px] max-w-full p-[3px] rounded-3xl overflow-visible about-info-card-glow"
          style={{
            background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
          }}
        >
          <div
            className="relative w-full h-full bg-[#101624]/80 backdrop-blur-2xl rounded-[22px] p-7 flex flex-col items-center gap-3 shadow-2xl overflow-hidden"
            style={{
              boxShadow: "0 4px 32px 0 #0ea5e966, 0 1.5px 8px 0 #6366f166",
            }}
          >
            {/* Animated Sparkle Overlay */}
            <div
              className="absolute left-1/2 top-0 -translate-x-1/2 w-32 h-32 pointer-events-none opacity-60 animate-pulse"
              style={{ filter: "blur(8px)" }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 128 128"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="64"
                  cy="32"
                  r="12"
                  fill="#38bdf8"
                  fillOpacity="0.5"
                />
                <circle
                  cx="100"
                  cy="80"
                  r="8"
                  fill="#6366f1"
                  fillOpacity="0.4"
                />
                <circle
                  cx="32"
                  cy="96"
                  r="6"
                  fill="#38bdf8"
                  fillOpacity="0.3"
                />
                <circle
                  cx="80"
                  cy="110"
                  r="4"
                  fill="#6366f1"
                  fillOpacity="0.2"
                />
              </svg>
            </div>
            <div className="text-5xl text-cyan-400 mb-1 drop-shadow-lg animate-bounce-slow">
              <i className="fa-solid fa-wand-magic-sparkles"></i>
            </div>
            <div className="text-base uppercase tracking-widest text-cyan-200 font-extrabold mb-1 drop-shadow">
              Did you know?
            </div>
            <div
              className="text-lg text-white font-semibold text-center leading-snug drop-shadow"
              dangerouslySetInnerHTML={{ __html: fact }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
