import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import XelyraModal from "./XelyraModal";
import StratumModal from "./StratumModal";
gsap.registerPlugin(ScrollTrigger);
import { Card, CardTitle, CardContent } from "./ui/card";
import xelyraLogo from "../assets/xelyra.png";
import stratumLogo from "../assets/stratum.png";

const Projects = () => {
  const sectionRef = useRef(null);
  const [xelyraOpen, setXelyraOpen] = useState(false);
  const [stratumOpen, setStratumOpen] = useState(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([".projects-heading", ".project-card"], { opacity: 0, y: 30 });
      gsap.to(".projects-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.to(".project-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.18,
        delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 py-24 w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center"
    >
      <h2 className="projects-heading text-4xl md:text-5xl font-extrabold text-white mb-14 tracking-tight drop-shadow-lg">
        Projects
      </h2>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl justify-center items-stretch">
        <Card className="project-card flex-1 flex flex-col items-center bg-[#181824]/90 text-white border border-cyan-400/30 shadow-2xl rounded-2xl p-6 min-h-[300px] max-w-md mx-auto">
          <img
            src={xelyraLogo}
            alt="Xelyra"
            className="w-28 h-28 rounded-lg mx-auto mt-2 mb-3 shadow-lg"
          />
          <CardTitle className="text-2xl font-bold text-center mt-2 mb-1">
            Xelyra
          </CardTitle>
          <div className="text-gray-200 text-base text-center mb-3 flex-1 flex items-center justify-center">
            Xelyra - A real-time Discord-inspired platform with ScyllaDB,
            WebSockets, Redis, SDK for bots, Gen AI, and Prometheus/Grafana
            metrics. It uses NestJs, React, GSAP, Docker, Google AI Studio and
            more.
          </div>
          <CardContent className="flex flex-col items-center w-full mt-auto">
            <button
              onClick={() => setXelyraOpen(true)}
              className="mt-2 w-full px-6 py-2 rounded-lg bg-white/80 text-black font-semibold text-base shadow-lg hover:bg-[#23232a] hover:text-white transition-all duration-200"
            >
              Showcase
            </button>
          </CardContent>
        </Card>
        <Card className="project-card flex-1 flex flex-col items-center bg-[#181824]/90 text-white border border-cyan-400/30 shadow-2xl rounded-2xl p-6 min-h-[300px] max-w-md mx-auto">
          <img
            src={stratumLogo}
            alt="Stratum"
            className="w-28 h-28 rounded-lg mx-auto mt-2 mb-3 shadow-lg"
          />
          <CardTitle className="text-2xl font-bold text-center mt-2 mb-1">
            Stratum
          </CardTitle>
          <div className="text-gray-200 text-base text-center mb-3 flex-1 flex items-center justify-center">
            Stratum is a full-stack collaborative workspace and task management
            platform designed to streamline team productivity. It features a
            robust NestJS backend and a modern React + TypeScript + Vite
            frontend.
          </div>
          <CardContent className="flex flex-col items-center w-full mt-auto">
            <button
              onClick={() => setStratumOpen(true)}
              className="mt-2 w-full px-6 py-2 rounded-lg bg-white/80 text-black font-semibold text-base shadow-lg hover:bg-[#23232a] hover:text-white transition-all duration-200"
            >
              Showcase
            </button>
          </CardContent>
        </Card>
      </div>
      {xelyraOpen && (
        <XelyraModal open={xelyraOpen} onClose={() => setXelyraOpen(false)} />
      )}
      {stratumOpen && (
        <StratumModal
          open={stratumOpen}
          onClose={() => setStratumOpen(false)}
        />
      )}
      <div className="flex flex-col items-center w-full max-w-5xl mt-24 mb-0">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          Want to see more?
        </h3>
        <p className="text-gray-300 text-lg mb-8 text-center max-w-xl">
          Explore all my open source projects and experiments on GitHub.
          <br />
          There’s plenty more to discover!
        </p>
      </div>
      <a
        href="https://github.com/dotflux?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="more-projects-btn group w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white text-black font-bold text-base md:text-lg shadow-lg hover:bg-[#23232a] hover:text-white transition-all duration-200 relative overflow-hidden mx-auto mt-6 text-center"
      >
        <span className="relative z-10">More Projects</span>
        <i className="fa-brands fa-github text-xl relative z-10 group-hover:scale-110 transition-transform duration-200"></i>
      </a>
    </section>
  );
};

export default Projects;
