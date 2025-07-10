import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dotfluxLogo from "../assets/dotflux.png";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const StickyNav = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("about");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -32,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      let found = "about";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight / 2) {
            found = s.id;
          }
        }
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 border-b border-[#23243a]/60 h-16 flex items-center justify-between px-6 md:px-12 shadow-xl"
      style={{ minHeight: 56 }}
    >
      {/* Brand/Logo */}
      <div className="flex items-center gap-3 select-none">
        <img
          src={dotfluxLogo}
          alt="Dotflux"
          className="w-9 h-9 rounded-full border-2 border-cyan-400 shadow-neon"
        />
        <span className="text-white font-extrabold text-xl tracking-wider drop-shadow-glow">
          dotflux
        </span>
      </div>
      {/* Centered Links */}
      <div className="flex-1 flex items-center justify-center gap-8">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`px-2 py-1 font-semibold text-base transition-all duration-200 focus:outline-none
              ${
                active === s.id
                  ? "text-cyan-300 border-b-2 border-cyan-400 shadow-none"
                  : "text-gray-200 hover:text-cyan-300"
              }
            `}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default StickyNav;
