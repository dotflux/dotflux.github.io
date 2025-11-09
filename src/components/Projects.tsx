import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectCard from "./ProjectCard";
import right from "../assets/angleright.svg";
import left from "../assets/angleleft.svg";
import audora from "../assets/audora_banner.png";
import dotQL from "../assets/dotQLBanner.jpg";
import xelyra from "../assets/xelyra_banner.png";
import up from "../assets/angleup.svg";
import down from "../assets/angledown.svg";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    title: "Xelyra",
    description:
      "Discord-like dockerized app with a developer portal using NestJS,React & ScyllaDB.",
    route: "/xelyra",
    image: xelyra,
  },
  {
    title: "Audora",
    description:
      "Ad-free open source music android app, with rich features built with Flutter. Open to contributions with a working ci/cd pipeline for releases.",
    image: audora,
    route: "/audora",
  },
  {
    title: "Stratum",
    description:
      "A SaaS application for team workspaces and task management built with NestJS,React and MongoDB.",
    image: "stratumShowcases/landing_page.png",
    route: "/stratum",
  },
  {
    title: "DotQL",
    description:
      "A query database like SQL built in C using B+ Trees for indexing and has basic sql features.",
    route: "/dotql",
    image: dotQL,
  },
];

const Projects = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const isInitialMount = useRef(true);
  const isProgrammaticScroll = useRef(false);
  const projectsRef = useRef<HTMLElement>(null);
  const svgRef = useRef<HTMLImageElement>(null);

  const total = projectData.length;
  const middleSetStart = total;

  const infiniteCards = [...projectData, ...projectData, ...projectData];

  const getRealIndex = (cardIndex: number) => {
    return cardIndex % total;
  };

  const getCardPosition = (targetIndex: number) => {
    return middleSetStart + targetIndex;
  };

  const scrollToCardIndex = (targetIndex: number, smooth: boolean = true) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const cardsContainer = cardsRef.current;
    if (!cardsContainer) return;

    const targetCardIndex = getCardPosition(targetIndex);
    const card = cardsContainer.children[targetCardIndex] as HTMLElement;
    if (!card) return;

    setIsScrolling(true);
    isProgrammaticScroll.current = true;

    if (isMobile) {
      const scrollerHeight = scroller.clientHeight;
      const cardHeight = card.offsetHeight;
      const cardTop = card.offsetTop;
      const target = cardTop - scrollerHeight / 2 + cardHeight / 2;
      scroller.scrollTo({ top: target, behavior: smooth ? "smooth" : "auto" });
    } else {
      const scrollerWidth = scroller.clientWidth;
      const cardWidth = card.offsetWidth;
      const cardLeft = card.offsetLeft;
      const target = cardLeft - scrollerWidth / 2 + cardWidth / 2;
      scroller.scrollTo({ left: target, behavior: smooth ? "smooth" : "auto" });
    }

    setTimeout(
      () => {
        setIsScrolling(false);
        isProgrammaticScroll.current = false;
      },
      smooth ? 600 : 100
    );
  };

  const prev = () => {
    if (isScrolling) return;
    const newIndex = (index - 1 + total) % total;
    setIndex(newIndex);
    scrollToCardIndex(newIndex, true);
  };

  const next = () => {
    if (isScrolling) return;
    const newIndex = (index + 1) % total;
    setIndex(newIndex);
    scrollToCardIndex(newIndex, true);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      scrollToCardIndex(index, false);
      isInitialMount.current = false;
    } else if (!isScrolling) {
      scrollToCardIndex(index, true);
    }
  }, [index, isMobile]);

  useEffect(() => {
    const handleResize = () => {
      if (isScrolling) return;
      scrollToCardIndex(index, false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [index, isScrolling, isMobile]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".projects-desc",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-desc",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".projects-card",
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".projects-card",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        ".projects-img",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-img",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, projectsRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-center text-white overflow-hidden"
    >
      <div className="md:ml-[50%] w-full md:w-1/2 flex flex-col justify-center items-start p-8 md:p-20 z-10">
        <h2 className="projects-title text-4xl md:text-6xl font-extrabold mb-4 md:mb-6">
          Projects
        </h2>
        <p className="projects-desc text-lg text-gray-300 max-w-xl leading-relaxed mb-8 md:mb-12">
          A showcase of the things I've built, from full-stack applications to
          creative experiments.
        </p>

        <div className="relative w-full flex items-center justify-center min-h-[350px] md:min-h-[280px] pt-12 pb-12 md:pt-0 md:pb-0">
          <button
            onClick={prev}
            className="projects-buttons absolute md:hidden -top-2 left-1/2 -translate-x-1/2 z-30 p-1.5 bg-black/80 backdrop-blur-md hover:bg-white/30 rounded-full border border-white/30 transition-all shadow-xl active:scale-95 w-8 h-8 flex items-center justify-center"
            aria-label="Previous project"
          >
            <img src={up} alt="Previous" className="w-3 h-3" />
          </button>

          <div
            ref={scrollerRef}
            className="w-full h-[55vh] sm:h-[60vh] md:h-[280px] overflow-hidden no-scrollbar px-2 md:px-0"
            style={{ touchAction: "none" }}
          >
            <div
              ref={cardsRef}
              className={`flex gap-4 sm:gap-6 md:gap-6 ${
                isMobile
                  ? "flex-col items-center py-8 px-2 h-max"
                  : "flex-row items-center py-6 px-6 w-max"
              } justify-center`}
            >
              {infiniteCards.map((p, i) => {
                const realIndex = getRealIndex(i);
                const isCenter = realIndex === index;
                return (
                  <div
                    key={`card-${realIndex}-${i}`}
                    className={`projects-card shrink-0 transition-all duration-500 ${
                      isCenter
                        ? "scale-100 z-30 opacity-100"
                        : "scale-90 opacity-50"
                    }`}
                  >
                    <ProjectCard {...p} />
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={next}
            className="projects-buttons absolute md:hidden -bottom-2 left-1/2 -translate-x-1/2 z-30 p-1.5 bg-black/80 backdrop-blur-md hover:bg-white/30 rounded-full border border-white/30 transition-all shadow-xl active:scale-95 w-8 h-8 flex items-center justify-center"
            aria-label="Next project"
          >
            <img src={down} alt="Next" className="w-3 h-3" />
          </button>
        </div>

        <div className="w-full flex justify-center items-center gap-4 mt-6">
          <button
            onClick={prev}
            className="projects-buttons hidden md:flex items-center justify-center p-2 bg-black/80 backdrop-blur-md hover:bg-white/30 rounded-full border border-white/30 transition-all shadow-xl active:scale-95 w-10 h-10"
            aria-label="Previous project"
          >
            <img src={left} alt="Previous" className="w-4 h-4" />
          </button>
          <div className="projects-indicators flex gap-3 items-center">
            <span className="text-sm text-gray-400">
              {index + 1} / {total}
            </span>
            {projectData.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndex(i);
                  scrollToCardIndex(i, true);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  i === index
                    ? "bg-white scale-110"
                    : "bg-gray-500 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="projects-buttons hidden md:flex items-center justify-center p-2 bg-black/80 backdrop-blur-md hover:bg-white/30 rounded-full border border-white/30 transition-all shadow-xl active:scale-95 w-10 h-10"
            aria-label="Next project"
          >
            <img src={right} alt="Next" className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="md:absolute md:left-0 md:top-0 md:w-1/2 w-full h-[50vh] md:h-full flex items-center justify-center">
        <img
          ref={svgRef}
          src="storyset_2.svg"
          alt="Projects Illustration"
          width={700}
          height={700}
          className="projects-img object-contain w-[350px] md:w-[500px] h-auto"
        />
      </div>
    </section>
  );
};

export default Projects;
