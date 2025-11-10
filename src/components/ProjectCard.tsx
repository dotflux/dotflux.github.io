// ProjectCard.tsx
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react"; // Add useState
import { gsap } from "gsap";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  route?: string;
}

const ProjectCard = ({
  title,
  description,
  image,
  route,
}: ProjectCardProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [titleOffset, setTitleOffset] = useState(0); // Add state for offset

  useEffect(() => {
    const root = rootRef.current;
    const overlay = overlayRef.current;
    const titleEl = titleRef.current;
    const descEl = descRef.current;
    const btnEl = btnRef.current;

    if (!root || !overlay || !titleEl || !descEl || !btnEl) return;

    // Calculate the vertical distance between title and button
    const btnRect = btnEl.getBoundingClientRect();
    const titleRect = titleEl.getBoundingClientRect();
    const titleToButtonDistance = btnRect.top - titleRect.top;

    // Set the initial offset in state
    setTitleOffset(titleToButtonDistance);

    const tl = gsap.timeline({ paused: true });

    // Animate on hover - title moves UP from button position to normal position
    tl.to(overlay, { duration: 0.35, opacity: 0.7, ease: "power3.out" }, 0);
    tl.to(titleEl, { y: 0, duration: 0.45, ease: "power3.out" }, 0); // Move to normal position
    tl.to(
      [descEl, btnEl],
      { y: 0, opacity: 1, duration: 0.36, ease: "power3.out", stagger: 0.06 },
      0.08
    );

    tlRef.current = tl;

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    root.addEventListener("mouseenter", onEnter);
    root.addEventListener("mouseleave", onLeave);
    root.addEventListener("focusin", onEnter);
    root.addEventListener("focusout", onLeave);

    let tapped = false;
    const onTouch = (e: TouchEvent) => {
      e.stopPropagation();
      if (!tapped) {
        tapped = true;
        tl.play();
        window.setTimeout(() => (tapped = false), 600);
      } else {
        tapped = false;
        tl.reverse();
      }
    };

    root.addEventListener("touchstart", onTouch);

    return () => {
      root.removeEventListener("mouseenter", onEnter);
      root.removeEventListener("mouseleave", onLeave);
      root.removeEventListener("focusin", onEnter);
      root.removeEventListener("focusout", onLeave);
      root.removeEventListener("touchstart", onTouch);
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative w-[280px] xs:w-[300px] sm:w-[340px] md:w-[400px] h-[200px] sm:h-[230px] md:h-[250px] shrink-0 rounded-2xl overflow-hidden border border-white/20 shadow-[0_6px_25px_rgba(0,0,0,0.4)] transition-transform duration-500 hover:scale-[1.04] cursor-pointer group"
      tabIndex={0}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.4}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a2 2 0 012-2h14a2 2 0 012 2v16l-4-4H5a2 2 0 01-2-2V4z"
            />
          </svg>
        </div>
      )}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black opacity-0 pointer-events-none"
      />
      <div className="absolute bottom-0 p-3 sm:p-4 md:p-5 flex flex-col gap-1.5 sm:gap-2 z-10">
        <h3
          ref={titleRef}
          // Use the calculated offset for initial position - this is the key fix!
          style={{ transform: `translateY(${titleOffset}px)` }}
          className="text-lg sm:text-xl font-bold text-white"
        >
          {title}
        </h3>
        <p
          ref={descRef}
          className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3 opacity-0 translate-y-2"
        >
          {description}
        </p>
        {route ? (
          <Link
            ref={btnRef as any}
            to={route}
            className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/40 rounded-xl text-xs sm:text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300 self-start opacity-0 translate-y-2"
          >
            View
          </Link>
        ) : (
          <button
            ref={btnRef as any}
            className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/40 rounded-xl text-xs sm:text-sm font-medium text-white hover:bg-white hover:text-black transition-all duration-300 self-start opacity-0 translate-y-2"
          >
            View
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
