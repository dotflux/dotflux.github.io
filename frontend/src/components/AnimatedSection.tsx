import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedSectionProps {
  direction?: "left" | "right" | "up" | "down";
  stagger?: boolean;
  children: React.ReactNode;
  className?: string;
}

const getOffset = (direction: string) => {
  switch (direction) {
    case "left":
      return { x: -60, y: 0 };
    case "right":
      return { x: 60, y: 0 };
    case "up":
      return { x: 0, y: -60 };
    case "down":
      return { x: 0, y: 60 };
    default:
      return { x: 0, y: 40 };
  }
};

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  direction = "up",
  stagger = false,
  children,
  className = "",
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let ctx: gsap.Context | undefined;
    let observer: IntersectionObserver;

    const { x, y } = getOffset(direction);
    const animateIn = () => {
      const targets = stagger ? el.children : el;
      ctx = gsap.context(() => {
        gsap.fromTo(
          targets,
          { x, y, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: stagger ? 0.12 : 0,
          }
        );
      }, el);
    };

    observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateIn();
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => {
      ctx?.revert();
      observer.disconnect();
    };
  }, [direction, stagger]);

  return (
    <div ref={sectionRef} className={"opacity-100 " + className}>
      {children}
    </div>
  );
};

export default AnimatedSection;
