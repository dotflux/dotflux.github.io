import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("about");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHasMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      let found = "about";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight / 2) found = s.id;
      }
      setActive(found);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 top-4 z-50 origin-center
  w-[90%] md:w-[70%] h-14 flex items-center justify-between px-6
  rounded-2xl border transition-all duration-300 
  ${hasMounted ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"}
  ${
    isScrolled
      ? "bg-[#0a0a0a] border-neutral-800 shadow-[0_6px_25px_rgba(0,0,0,0.6)]"
      : "bg-[#111] border-neutral-800 shadow-[0_4px_15px_rgba(0,0,0,0.4)]"
  }
  transition-transform duration-700 ease-out`}
    >
      <div className="flex items-center gap-3 select-none">
        <img
          src="dotflux_icon.jpg"
          alt="Dotflux"
          className="w-8 h-8 rounded-full border border-neutral-600"
        />
        <span className="font-extrabold text-lg text-white tracking-wider hover:scale-[1.03] transition-transform duration-300">
          dotflux
        </span>
      </div>

      <button
        className="md:hidden flex items-center justify-center text-white focus:outline-none"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h16"}
          />
        </svg>
      </button>

      <div className="hidden md:flex items-center gap-8">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => handleNavClick(s.id)}
            className={`relative px-2 py-2 font-semibold text-base transition-all duration-200
      ${
        active === s.id
          ? "text-white after:w-full after:opacity-100"
          : "text-gray-400 hover:text-white after:w-0 after:opacity-0 hover:after:w-full hover:after:opacity-100"
      }
      after:content-[''] after:absolute after:bottom-0 after:left-0 
      after:h-px after:bg-white after:rounded-full after:transition-all after:duration-300`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div
        className={`absolute left-0 top-full w-full origin-top transform transition-all duration-300 ease-in-out md:hidden rounded-b-2xl ${
          isMenuOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible"
        } bg-[#0b0b0b] border-t border-neutral-800 rounded-t-none`}
      >
        <div className="flex flex-col items-center gap-6 py-6">
          {sections.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                handleNavClick(s.id);
                setMenuOpen(false);
              }}
              style={{
                transitionDelay: `${i * 60}ms`,
              }}
              className={`font-semibold text-base transition-all duration-300 ${
                active === s.id
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
