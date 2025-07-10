import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import shadcnui from "../assets/shadcnui.svg";
import grafana from "../assets/grafana.svg";
import prometheus from "../assets/prometheus.svg";
import lua from "../assets/lua.svg";
import nodedotjs from "../assets/nodedotjs.svg";
import express from "../assets/express.svg";
import firebase from "../assets/firebase.svg";
import bootstrap from "../assets/bootstrap.svg";
import html5 from "../assets/html5.svg";
import mongodb from "../assets/mongodb.svg";
import nextdotjs from "../assets/nextdotjs.svg";
import cplusplus from "../assets/cplusplus.svg";
import c from "../assets/c.svg";
import git from "../assets/git.svg";
import github from "../assets/github.svg";
import flask from "../assets/flask.svg";
import python from "../assets/python.svg";
import typescript from "../assets/typescript.svg";
import tailwindcss from "../assets/tailwindcss.svg";
import gsapPng from "../assets/gsap.png";
import scyllaPng from "../assets/scylla.png";
import jwt from "../assets/jwt.svg";
import docker from "../assets/docker.svg";
import redis from "../assets/redis.svg";
import cassandra from "../assets/cassandra.svg";
import socketio from "../assets/socketio.svg";
import nestjs from "../assets/nestjs.svg";
import reactsvg from "../assets/react.svg";

const skillGroups = [
  {
    title: "Languages",
    skills: [
      { name: "TypeScript", icon: typescript },
      { name: "Python", icon: python },
      { name: "C", icon: c },
      { name: "C++", icon: cplusplus },
      { name: "LUA", icon: lua },
    ],
  },
  {
    title: "Frontend",
    skills: [
      { name: "HTML5", icon: html5 },
      { name: "TailwindCSS", icon: tailwindcss },
      { name: "Bootstrap", icon: bootstrap },
      { name: "React", icon: reactsvg },
      { name: "Next.js", icon: nextdotjs },
      { name: "GSAP", icon: gsapPng },
      { name: "shadcn/ui", icon: shadcnui },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: nodedotjs },
      { name: "NestJS", icon: nestjs },
      { name: "Express", icon: express },
      { name: "Flask", icon: flask },
      { name: "Socket.io", icon: socketio },
      { name: "JWT", icon: jwt },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: mongodb },
      { name: "Cassandra", icon: cassandra },
      { name: "Scylla", icon: scyllaPng },
      { name: "Firebase", icon: firebase },
      { name: "Redis", icon: redis },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", icon: docker },
      { name: "Git", icon: git },
      { name: "GitHub", icon: github },
      { name: "Prometheus", icon: prometheus },
      { name: "Grafana", icon: grafana },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate main heading
      gsap.from(".skills-heading", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      // Animate section headings
      gsap.from(".skills-section-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });
      // Animate icons by group
      const allIcons = gsap.utils.toArray(".skills-icon-item");
      gsap.from(allIcons, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 30,
        opacity: 0,
        scale: 0.8,
        duration: 0.7,
        ease: "back.out(1.7)",
        stagger: 0.06,
        delay: 0.4,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative z-10 py-24 px-8 flex flex-col items-center w-full"
    >
      <h2 className="skills-heading text-4xl md:text-5xl font-extrabold text-white mb-14 tracking-tight drop-shadow-lg">
        Skills
      </h2>
      <div className="flex flex-col gap-16 w-full max-w-5xl">
        {skillGroups.map((group, gi) => (
          <div
            key={group.title}
            className={`w-full flex flex-col items-center md:${
              gi % 2 === 0 ? "items-start" : "items-end"
            } transition-all`}
          >
            <h3 className="skills-section-title text-2xl md:text-3xl font-bold mb-8 pl-1 tracking-wide text-white drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]">
              {group.title}
            </h3>
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-10
                ${gi % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}
                max-w-[80%]`}
            >
              {group.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skills-icon-item flex flex-col items-center gap-3 group cursor-pointer"
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget.querySelector(".skills-icon-bg"), {
                      boxShadow: "0 0 0 0 #38bdf8, 0 0 32px 8px #38bdf8cc",
                      borderColor: "#38bdf8",
                      duration: 0.3,
                      ease: "power2.out",
                    });
                    gsap.to(e.currentTarget.querySelector(".skills-icon"), {
                      scale: 1.18,
                      rotate: 8,
                      filter: "drop-shadow(0 4px 16px #38bdf8)",
                      duration: 0.3,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget.querySelector(".skills-icon-bg"), {
                      boxShadow: "0 2px 16px 0 #232a33",
                      borderColor: "#232a33",
                      duration: 0.3,
                      ease: "power2.inOut",
                    });
                    gsap.to(e.currentTarget.querySelector(".skills-icon"), {
                      scale: 1,
                      rotate: 0,
                      filter: "drop-shadow(0 2px 8px #232a33)",
                      duration: 0.3,
                      ease: "power2.inOut",
                    });
                  }}
                >
                  <div className="skills-icon-bg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/10 border-2 border-[#232a33] shadow-lg transition-all duration-200 mb-1">
                    <div className="skills-icon w-10 h-10 md:w-12 md:h-12 flex items-center justify-center transition-all duration-200">
                      {typeof skill.icon === "string" &&
                      skill.icon.startsWith("fa-") ? (
                        <i
                          className={`fa-brands ${skill.icon} text-cyan-400 text-3xl md:text-4xl`}
                        ></i>
                      ) : (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className="w-full h-full object-contain drop-shadow-lg"
                        />
                      )}
                    </div>
                  </div>
                  <span className="text-base md:text-lg text-white font-semibold text-center tracking-wide drop-shadow">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
