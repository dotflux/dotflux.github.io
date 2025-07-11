import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import dotfluxIcon from "../assets/dotflux_icon.jpg";
// import icon from "../assets/icon.png";

const sections = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const StickyNav = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

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
      className="fixed top-0 left-0 w-full z-50 border-b border-[#23243a]/60 h-16 flex items-center justify-between px-6 md:px-12 shadow-xl bg-[#0a0a0a]/90 backdrop-blur"
      style={{ minHeight: 56 }}
    >
      {/* Brand/Logo */}
      <div className="flex items-center gap-3 select-none">
        <img
          src={dotfluxIcon}
          alt="Dotflux"
          className="w-9 h-9 rounded-full border-2 border-cyan-400 shadow-neon"
        />
        <span className="text-white font-extrabold text-xl tracking-wider drop-shadow-glow">
          dotflux
        </span>
      </div>
      {/* Hamburger for mobile */}
      <button
        className="md:hidden flex items-center justify-center ml-2 text-cyan-300 focus:outline-none z-50"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle navigation menu"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
          />
        </svg>
      </button>
      {/* Centered Links */}
      <div
        className={`flex-1 md:flex items-center justify-center gap-8 transition-all duration-300
          ${
            menuOpen
              ? "flex flex-col absolute top-16 left-0 w-full bg-[#0a0a0a]/95 py-6 z-40"
              : "hidden"
          } md:flex-row md:bg-transparent md:py-0 md:relative md:flex`}
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={() => setMenuOpen(false)}
            className={`px-2 py-2 font-semibold text-base transition-all duration-200 focus:outline-none text-center
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
