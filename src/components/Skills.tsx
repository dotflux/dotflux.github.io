import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import cIcon from "../assets/c.svg";
import cplusplusIcon from "../assets/cplusplus.svg";
import dockerIcon from "../assets/docker.svg";
import expressIcon from "../assets/express.svg";
import firebaseIcon from "../assets/firebase.svg";
import flaskIcon from "../assets/flask.svg";
import gitIcon from "../assets/git.svg";
import bashIcon from "../assets/gnubash.svg";
import godotIcon from "../assets/godotengine.svg";
import grafanaIcon from "../assets/grafana.svg";
import gsapIcon from "../assets/gsap.png";
import jinjaIcon from "../assets/jinja.svg";
import jwtIcon from "../assets/jwt.svg";
import linuxIcon from "../assets/linux.svg";
import mongodbIcon from "../assets/mongodb.svg";
import nestjsIcon from "../assets/nestjs.svg";
import nextjsIcon from "../assets/nextdotjs.svg";
import nodejsIcon from "../assets/nodedotjs.svg";
import prometheusIcon from "../assets/prometheus.svg";
import pythonIcon from "../assets/python.svg";
import reactIcon from "../assets/react.svg";
import redisIcon from "../assets/redis.svg";
import scyllaIcon from "../assets/scylla.png";
import socketioIcon from "../assets/socketio.svg";
import tailwindIcon from "../assets/tailwindcss.svg";
import typescriptIcon from "../assets/typescript.svg";
import mySqlIcon from "../assets/mysql.svg";
import threeJsIcon from "../assets/threedotjs.svg";
import jsIcon from "../assets/javascript.svg";
import githubActionsIcon from "../assets/githubactions.svg";
import luaIcon from "../assets/lua.svg";
import dartIcon from "../assets/dart.svg";
import flutterIcon from "../assets/flutter.svg";

gsap.registerPlugin(ScrollTrigger);

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
  icon?: string | any;
}

export const skillsData: Skill[] = [
  {
    id: "1",
    name: "JavaScript",
    level: 90,
    category: "Languages",
    icon: jsIcon,
  },
  {
    id: "2",
    name: "TypeScript",
    level: 90,
    category: "Languages",
    icon: typescriptIcon,
  },
  {
    id: "3",
    name: "Python",
    level: 80,
    category: "Languages",
    icon: pythonIcon,
  },
  { id: "4", name: "React", level: 80, category: "Frontend", icon: reactIcon },
  {
    id: "5",
    name: "Next.js",
    level: 70,
    category: "Frontend",
    icon: nextjsIcon,
  },
  {
    id: "6",
    name: "TailwindCSS",
    level: 70,
    category: "Frontend",
    icon: tailwindIcon,
  },
  {
    id: "7",
    name: "Three.js",
    level: 50,
    category: "Frontend",
    icon: threeJsIcon,
  },
  {
    id: "8",
    name: "Node.js",
    level: 93,
    category: "Backend",
    icon: nodejsIcon,
  },
  { id: "9", name: "NestJS", level: 90, category: "Backend", icon: nestjsIcon },
  { id: "10", name: "MySQL", level: 80, category: "Database", icon: mySqlIcon },
  {
    id: "11",
    name: "MongoDB",
    level: 85,
    category: "Database",
    icon: mongodbIcon,
  },
  { id: "13", name: "Redis", level: 85, category: "Database", icon: redisIcon },
  { id: "14", name: "Docker", level: 70, category: "DevOps", icon: dockerIcon },
  {
    id: "17",
    name: "CI/CD",
    level: 70,
    category: "DevOps",
    icon: githubActionsIcon,
  },
  { id: "18", name: "Git", level: 81, category: "Other", icon: gitIcon },
  {
    id: "19",
    name: "ScyllaDB",
    level: 80,
    category: "Database",
    icon: scyllaIcon,
  },
  { id: "20", name: "C", level: 60, category: "Languages", icon: cIcon },
  {
    id: "21",
    name: "C++",
    level: 60,
    category: "Languages",
    icon: cplusplusIcon,
  },
  { id: "22", name: "Lua", level: 70, category: "Languages", icon: luaIcon },
  { id: "23", name: "GSAP", level: 70, category: "Frontend", icon: gsapIcon },
  {
    id: "24",
    name: "Flutter",
    level: 70,
    category: "Frontend",
    icon: flutterIcon,
  },
  { id: "25", name: "Dart", level: 70, category: "Languages", icon: dartIcon },
  {
    id: "26",
    name: "Firebase",
    level: 80,
    category: "Database",
    icon: firebaseIcon,
  },
  {
    id: "27",
    name: "Prometheus",
    level: 70,
    category: "DevOps",
    icon: prometheusIcon,
  },
  {
    id: "28",
    name: "Grafana",
    level: 70,
    category: "DevOps",
    icon: grafanaIcon,
  },
  { id: "29", name: "Bash", level: 70, category: "Other", icon: bashIcon },
  { id: "30", name: "Linux", level: 70, category: "Other", icon: linuxIcon },
  {
    id: "31",
    name: "Express",
    level: 80,
    category: "Backend",
    icon: expressIcon,
  },
  { id: "32", name: "Flask", level: 80, category: "Backend", icon: flaskIcon },
  { id: "33", name: "Jinja", level: 80, category: "Backend", icon: jinjaIcon },
  {
    id: "34",
    name: "Websockets",
    level: 80,
    category: "Backend",
    icon: socketioIcon,
  },
  { id: "35", name: "JWT", level: 80, category: "Backend", icon: jwtIcon },
  { id: "36", name: "Godot", level: 70, category: "Other", icon: godotIcon },
];

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = Array.from(
    new Set(skillsData.map((skill) => skill.category))
  ).sort();

  useEffect(() => {
    if (!skillsRef.current) return;

    const skillBars = skillsRef.current.querySelectorAll(".skill-bar");

    skillBars.forEach((bar) => {
      const fill = bar.querySelector(".skill-fill");
      const level = bar.getAttribute("data-level");

      gsap.fromTo(
        fill,
        { width: "0%" },
        {
          width: `${level}%`,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bar,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-title",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-title",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".skills-category",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".skills-footer",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-footer",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative w-full min-h-screen py-12 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-20">
          <h2
            className="skills-title text-white mb-4"
            style={{
              fontSize: "clamp(2rem, 6vw, 5rem)",
              fontWeight: 900,
              letterSpacing: "-0.02em",
            }}
          >
            Skills
          </h2>
          <div className="w-24 h-1 bg-white mx-auto" />
        </div>

        <div
          ref={skillsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-16"
        >
          {categories.map((category) => (
            <div key={category} className="skills-category">
              <div className="mb-8 sm:mb-12">
                <h3
                  className="text-white mb-2"
                  style={{
                    fontSize: "clamp(1.25rem, 3vw, 2rem)",
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                  }}
                >
                  {category.toUpperCase()}
                </h3>
                <div className="w-12 sm:w-16 h-0.5 bg-white/30" />
              </div>

              <div className="space-y-6 sm:space-y-8">
                {skillsData
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div key={skill.id} className="relative">
                      <div className="flex justify-between items-baseline mb-2 sm:mb-3">
                        <span
                          className="text-white/90 tracking-wider text-sm sm:text-base"
                          style={{ fontWeight: 600 }}
                        >
                          {skill.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-white/50 text-xs sm:text-sm"
                            style={{ fontWeight: 300 }}
                          >
                            {skill.level}%
                          </span>
                          {skill.icon &&
                            (typeof skill.icon === "string" &&
                            skill.icon.length <= 2 ? (
                              <span className="text-lg" aria-hidden="true">
                                {skill.icon}
                              </span>
                            ) : (
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                className="w-5 h-5 object-contain"
                                aria-hidden="true"
                              />
                            ))}
                        </div>
                      </div>

                      <div
                        className="skill-bar relative h-1 bg-white/10 overflow-hidden rounded-full"
                        data-level={skill.level}
                      >
                        <div className="skill-fill absolute inset-y-0 left-0 bg-white rounded-full" />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="skills-footer mt-12 sm:mt-20 text-center">
          <div className="inline-block px-6 sm:px-8 py-3 sm:py-4 backdrop-blur-md bg-white/5 border border-white/10 rounded-lg">
            <p
              className="text-white/70 tracking-wide text-sm sm:text-base"
              style={{ fontWeight: 300 }}
            >
              Always learning, always evolving
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
