import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// Xelyra showcase assets
import landingPage from "../assets/xelyraShowcases/landing_page.gif";
import meetXyn from "../assets/xelyraShowcases/meet_xyn.png";
import xynPfp from "../assets/xelyraShowcases/xyn_changes_generated_pfp.gif";
import xynByFile from "../assets/xelyraShowcases/xyn_changes_byfile.png";
import xynName from "../assets/xelyraShowcases/xyn_changes_name.gif";
import developerPage from "../assets/xelyraShowcases/developer_page.gif";
import sdkDocs from "../assets/xelyraShowcases/sdk_documentation.gif";
import formatsEmbed from "../assets/xelyraShowcases/formats_and_embed.gif";

import createServer from "../assets/xelyraShowcases/create_server.gif";
import addFriends from "../assets/xelyraShowcases/add_friends.gif";
import schema from "../assets/xelyraShowcases/schema.png";
import eventLoop from "../assets/xelyraShowcases/event_loop.png";
import cpuUsage from "../assets/xelyraShowcases/cpu_usage_intel_i5_3rd.png";
import openFiles from "../assets/xelyraShowcases/open_file_deceptors.png";
// Stratum showcase assets
import stratumLanding from "../assets/stratumShowcases/landing_page.png";
import stratumCreateWorkspace from "../assets/stratumShowcases/create_workspace.png";
import stratumWorkspaces from "../assets/stratumShowcases/workspaces.png";
import stratumTasks from "../assets/stratumShowcases/tasks.png";
import stratumBilling from "../assets/stratumShowcases/billing.png";
// Import Ethereal Odyssey image
import etherealOdyssey from "../assets/ethereal_odyssey.jpg";

const xelyraBlocks = [
  {
    heading: "Xelyra Landing Page",
    media: landingPage,
    caption:
      "A modern, Discord-inspired platform with real-time messaging, Gen AI, and extensible SDKs, Xelyra is designed to be a modern and user-friendly platform for users to interact with.",
  },
  {
    heading: "Developer Portal",
    media: developerPage,
    caption:
      "Powerful developer dashboard for managing your applications, bots, and integrations, Xelyra's developer portal is designed to be easy to use and understand, with a focus on simplicity and ease of use.",
  },
  {
    heading: "SDK For Xelyra",
    media: sdkDocs,
    caption:
      "Comprehensive, interactive SDK documentation to help you build bots and integrations quickly, Xelyra's SDK is designed to be easy to use and understand, with a focus on simplicity and ease of use.",
  },
  {
    heading: "Rich Message Formats & Embeds",
    media: formatsEmbed,
    caption:
      "Send messages with rich embeds, formatting, and media for a dynamic chat experience, Xelyra supports rich embeds and formatting to make your messages more engaging and interactive.",
  },
  {
    heading: "AI Assistant: Meet Xyn",
    media: meetXyn,
    caption:
      "Your intelligent AI companion Xyn, integrated directly into Xelyra to aid the users in their daily tasks.",
  },
  {
    heading: "AI-Generated Profile Pictures",
    media: xynPfp,
    caption:
      "Xyn's unique feature can generate unique profile pictures using AI, based on your description and set them as your profile picture all in one go!",
  },
  {
    heading: "File-Based Profile Updates",
    media: xynByFile,
    caption:
      "Xyn can easily update your profile picture by uploading an image file, Xyn handles the rest with ease.",
  },
  {
    heading: "Natural Language Account Management",
    media: xynName,
    caption:
      "Change your display name, bio, profile themes and other details just by chatting with Xyn—no forms required!",
  },
  {
    heading: "Automated Load Testing & System Benchmarks",
    media: [eventLoop, cpuUsage, openFiles, schema],
    caption: (
      <>
        <div className="mb-2">
          Automated load testing and system monitoring ensure real-world
          performance:
        </div>
        <ul className="list-disc pl-6 text-sm text-gray-300 mb-2">
          <li>
            Simulated ~500 users: Automated account creation, login, friend
            requests, group/server/DM creation, and app/bot registration.
          </li>
          <li>
            Massive message load: Used custom scripts to send messages, reaching
            up to 3 million messages in the database.
          </li>
          <li>
            Full workflow automation: Users performed all major actions—creating
            apps, servers, groups, DMs, sending/accepting friend requests, and
            logging in—mirroring real user behavior.
          </li>
          <li>
            SDK and load-testing scripts: All automation was performed using our
            SDK and dedicated load-testing scripts.
          </li>
        </ul>
      </>
    ),
  },
  {
    heading: "Server Creation",
    media: createServer,
    caption:
      "Create new servers in seconds—customize everything from the name to the icon.",
  },
  {
    heading: "Friend System",
    media: addFriends,
    caption:
      "Add friends and grow your network with a simple, intuitive interface.",
  },
];

const stratumBlocks = [
  {
    heading: "Stratum Landing Page",
    media: stratumLanding,
    caption:
      "Stratum is a collaborative workspace and task management platform for teams, built with NestJS, MongoDB, React, and Vite.",
  },
  {
    heading: "Create Workspace",
    media: stratumCreateWorkspace,
    caption:
      "Users can create and manage workspaces for different teams and projects.",
  },
  {
    heading: "Workspaces Overview",
    media: stratumWorkspaces,
    caption: "View and manage all your workspaces in one place.",
  },
  {
    heading: "Task Management",
    media: stratumTasks,
    caption:
      "Create, assign, and track tasks, upload files, and manage members—all in one dashboard.",
  },
  {
    heading: "Billing",
    media: stratumBilling,
    caption:
      "Track your usage, manage your plan, and earn 'Strats' by completing quests within the app.",
  },
];

const etherealOdysseyBlock = [
  {
    heading: "Ethereal Odyssey",
    media: etherealOdyssey,
    caption:
      '"Ethereal Odyssey" is a game I made using Pygame, Tiled, and other tools. Explore a mysterious world, solve puzzles, and experience a unique indie adventure. (Only one screenshot available!)',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for all animated elements
      gsap.set(
        [
          ".projects-heading",
          ".xelyra-block",
          ".xelyra-github-btn",
          ".more-projects-btn",
        ],
        {
          opacity: 0,
          y: 30,
        }
      );
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
      gsap.to(".xelyra-block", {
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
      gsap.to([".xelyra-github-btn", ".more-projects-btn"], {
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  function renderBlocks(
    blocks: Array<{
      heading: string;
      media: string | string[];
      caption: React.ReactNode;
    }>,
    project?: "xelyra" | "stratum" | "ethereal"
  ): React.ReactNode {
    return (
      <div className="flex flex-col gap-16 w-full max-w-5xl">
        {blocks.map((block, i) => (
          <div
            key={block.heading}
            className={`xelyra-block flex flex-col md:flex-row items-center gap-8 md:gap-12 p-0 transition-all duration-300 opacity-100 ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Media: left/right alternates on desktop, top on mobile */}
            {block.heading === "Automated Load Testing & System Benchmarks" &&
            Array.isArray(block.media) ? (
              <div className="flex-1 w-full flex flex-col gap-8 justify-center items-center">
                {(block.media as string[]).map((media: string, j: number) => (
                  <div
                    key={j}
                    className="flex items-center justify-center w-full"
                  >
                    <img
                      src={media}
                      alt={block.heading}
                      className="block w-full max-w-2xl h-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`flex-1 w-full flex ${
                  Array.isArray(block.media)
                    ? "flex-col md:flex-row"
                    : "flex-col"
                } gap-4 md:gap-8 justify-center items-center`}
              >
                {Array.isArray(block.media) ? (
                  (block.media as string[]).map((media: string, j: number) => (
                    <div
                      key={j}
                      className="flex items-center justify-center w-full md:w-auto"
                    >
                      <img
                        src={media}
                        alt={block.heading}
                        className="block w-full max-w-sm md:max-w-md h-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center">
                    <img
                      src={block.media as string}
                      alt={block.heading}
                      className="block max-w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            )}
            {/* Text: right/left alternates on desktop, below on mobile */}
            <div className="flex-1 flex flex-col items-start justify-center w-full max-w-xl">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3 drop-shadow-glow text-left">
                {block.heading}
              </h3>
              <div className="text-gray-300 text-lg mb-2 leading-relaxed text-left">
                {block.caption}
              </div>
            </div>
          </div>
        ))}
        {/* Add GitHub button for Stratum if requested */}
        {project === "stratum" && (
          <a
            href="https://github.com/dotflux/Stratum"
            target="_blank"
            rel="noopener noreferrer"
            className="xelyra-github-btn group w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white text-black font-bold text-base md:text-lg shadow-lg hover:bg-[#23232a] hover:text-white transition-all duration-200 relative overflow-hidden mx-auto mt-12 text-center"
          >
            <span className="relative z-10">View Stratum on GitHub</span>
            <i className="fa-brands fa-github text-xl relative z-10 group-hover:scale-110 transition-transform duration-200"></i>
          </a>
        )}
      </div>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative z-10 py-24 w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-16 flex flex-col items-center"
    >
      <h2 className="projects-heading text-4xl md:text-5xl font-extrabold text-white mb-14 tracking-tight drop-shadow-lg">
        Projects
      </h2>
      {/* Xelyra Section */}
      <h3 className="text-3xl font-bold text-white mb-8 w-full max-w-5xl text-left">
        Xelyra
      </h3>
      {renderBlocks(xelyraBlocks, "xelyra")}
      <a
        href="https://github.com/dotflux56/xelyra"
        target="_blank"
        rel="noopener noreferrer"
        className="xelyra-github-btn group w-full md:w-auto flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-white text-black font-bold text-base md:text-lg shadow-lg hover:bg-[#23232a] hover:text-white transition-all duration-200 relative overflow-hidden mx-auto mt-12 text-center"
      >
        <span className="relative z-10">View Xelyra on GitHub</span>
        <i className="fa-brands fa-github text-xl relative z-10 group-hover:scale-110 transition-transform duration-200"></i>
      </a>
      {/* Stratum Section */}
      <h3 className="text-3xl font-bold text-white mb-8 mt-24 w-full max-w-5xl text-left">
        Stratum
      </h3>
      {renderBlocks(stratumBlocks, "stratum")}
      {/* Ethereal Odyssey Section */}
      <h3 className="text-3xl font-bold text-white mb-8 mt-24 w-full max-w-5xl text-left">
        Ethereal Odyssey
      </h3>
      {renderBlocks(etherealOdysseyBlock, "ethereal")}
      {/* More Projects Button */}
      <div className="flex flex-col items-center w-full max-w-5xl mt-24 mb-0">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 text-center">
          Want to see more?
        </h3>
        <p className="text-gray-300 text-lg mb-8 text-center max-w-xl">
          Explore all my open source projects and experiments on GitHub. There’s
          plenty more to discover!
        </p>
      </div>
      <a
        href="https://github.com/dotflux56?tab=repositories"
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
