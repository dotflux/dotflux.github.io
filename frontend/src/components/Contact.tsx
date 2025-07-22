import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import dotfluxLogo from "../assets/dotflux.png";
import github from "../assets/github.svg";
import discord from "../assets/discord.svg";
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

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column group entrance
      gsap.fromTo(
        leftColRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.1 }
      );
      // Heading
      gsap.fromTo(
        ".contact-heading",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
      );
      // Description
      gsap.fromTo(
        ".contact-desc",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 }
      );
      // Social icons
      gsap.fromTo(
        ".contact-social",
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.7,
          ease: "back.out(1.7)",
          stagger: 0.08,
          delay: 0.4,
        }
      );
      // Logo pop-in
      gsap.fromTo(
        logoRef.current,
        { scale: 0.7, rotate: -10, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1.1,
          ease: "back.out(1.7)",
          delay: 0.5,
        }
      );
      // Logo floating
      gsap.to(logoRef.current, {
        y: 18,
        repeat: -1,
        yoyo: true,
        duration: 2.8,
        ease: "sine.inOut",
        delay: 1.2,
      });
      // Logo glow
      gsap.fromTo(
        ".contact-logo-glow",
        { boxShadow: "0 0 0 0 #60a5fa" },
        {
          boxShadow:
            "0 0 32px 8px #f472b6, 0 0 64px 16px #818cf8, 0 0 128px 32px #0ea5e9",
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: "sine.inOut",
          delay: 0.5,
        }
      );
      // Social icon GSAP hover
      const iconEls = gsap.utils.toArray<HTMLElement>(".contact-social");
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-0 py-12 w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-12"
    >
      {/* Left: Heading, desc, socials */}
      <div
        ref={leftColRef}
        className="flex-1 flex flex-col items-start max-w-xl gap-6 md:ml-8"
      >
        <h2 className="contact-heading text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight relative z-10">
          Contact
        </h2>
        <p className="contact-desc text-lg text-gray-300 font-medium mb-2">
          You can contact me on the following platforms. Let’s connect and build
          something awesome together!
        </p>
        <div className="flex flex-wrap gap-4 mb-2 relative z-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="contact-social w-14 h-14 rounded-full flex items-center justify-center bg-[#23232a] text-white text-2xl transition-all duration-200 shadow-md opacity-100"
              style={{ boxShadow: "0 0 0 0 #60a5fa" }}
            >
              <img src={s.icon} alt={s.label} className="w-6 h-6" />
            </a>
          ))}
        </div>
        <div className="text-lg text-gray-300 font-medium relative z-10">
          <div className="flex items-center gap-2">
            <img src={gmail} alt="Email" className="w-6 h-6" />
            <a
              href="mailto:dotflux56@gmail.com"
              className="underline hover:text-blue-400 transition-colors duration-200"
            >
              dotflux56@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-2">
            <img src={discord} alt="Discord" className="w-6 h-6" />
            <p>dotflux</p>
          </div>
        </div>
      </div>
      {/* Right: Logo with glow */}
      <div className="flex-1 flex items-center justify-center w-full relative">
        <div
          ref={logoRef}
          className="contact-logo-glow rounded-full p-2 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 shadow-2xl"
          style={{ boxShadow: "0 0 32px 8px #f472b6, 0 0 64px 16px #818cf8" }}
        >
          <img
            src={dotfluxLogo}
            alt="Dotflux Logo"
            className="w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white/10 shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
