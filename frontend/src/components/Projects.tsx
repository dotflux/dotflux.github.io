import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import xelyra from "../assets/xelyra.png";
import stratum from "../assets/stratum.png";
import database from "../assets/database.webp";

const projects = [
  {
    name: "Xelyra",
    description:
      "Xelyra – A real-time Discord-inspired platform with ScyllaDB, WebSockets, Redis, SDK for bots, Gen AI, and Prometheus/Grafana metrics. It uses NestJs, React, GSAP, Docker, Google AI Studio and more.",
    url: "https://github.com/dotflux/Xelyra",
    tech: ["NestJS", "React", "GSAP", "ScyllaDB", "Redis", "Docker", "AI"],
    image: xelyra, // Add your image path here
  },
  {
    name: "Stratum",
    description:
      "A full-stack collaborative workspace and task management platform with a robust NestJS backend and a modern React + TypeScript + Vite frontend. Features workspace management, file sharing, task tracking, and user management.",
    url: "https://github.com/dotflux/Stratum",
    tech: ["NestJS", "React", "TypeScript", "Vite"],
    image: stratum, // Add your image path here
  },
  {
    name: "Database",
    description:
      "A SQL-like database built from scratch in C, supporting table creation, indexed queries, and core SQL operations.",
    url: "https://github.com/dotflux/Database",
    tech: ["C", "Database", "Indexing", "SQL"],
    image: database, // Add your image path here
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set([".projects-heading", ".project-card", ".more-projects-btn"], {
        opacity: 0,
        y: 30,
      });

      // ScrollTrigger animations
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
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
        delay: 0.3,
      });

      gsap.to(".more-projects-btn", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 0.8,
      });

      // Fallback animation after 2 seconds if ScrollTrigger doesn't fire
      setTimeout(() => {
        gsap.to([".projects-heading", ".project-card", ".more-projects-btn"], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
        });
      }, 2000);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 py-24 px-8 flex flex-col items-center w-full"
    >
      <h2 className="projects-heading text-4xl md:text-5xl font-extrabold text-white mb-16 tracking-tight drop-shadow-lg opacity-100">
        Featured Projects
      </h2>
      <div className="flex flex-col gap-12 w-full max-w-6xl mb-16">
        {projects.map((project, i) => (
          <div
            key={project.name}
            className={`project-card group flex flex-col lg:flex-row items-center gap-8 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-cyan-400/30 cursor-pointer relative overflow-hidden opacity-100 ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            }`}
            style={{ minHeight: "280px" }}
          >
            {/* Project Image */}
            <div className="w-full lg:w-80 h-48 lg:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="text-6xl text-white/30">
                  <i className="fa-solid fa-code"></i>
                </div>
              )}
            </div>

            {/* Project Content */}
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 relative group-hover:text-cyan-300 transition-colors duration-200">
                {project.name}
                <span className="block h-1 w-0 group-hover:w-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full transition-all duration-300 mt-2"></span>
              </h3>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-2xl">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full bg-cyan-700/30 text-cyan-200 text-sm font-semibold tracking-wide shadow-sm border border-cyan-400/20 backdrop-blur-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200 group/link"
              >
                View on GitHub
                <i className="fa-solid fa-arrow-right group-hover/link:translate-x-1 transition-transform duration-200"></i>
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* More Projects Button */}
      <a
        href="https://github.com/dotflux?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="more-projects-btn group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden opacity-100"
      >
        <span className="relative z-10">More Projects</span>
        <i className="fa-brands fa-github text-xl relative z-10 group-hover:scale-110 transition-transform duration-200"></i>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </a>
    </section>
  );
};

export default Projects;
