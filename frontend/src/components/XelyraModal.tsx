import { useState, useEffect } from "react";
import AngleLeft from "../assets/angleLeft.svg";
import AngleRight from "../assets/angleRight.svg";
import Loader from "./Loader";
import crossIcon from "../assets/cross.svg";
import landingPage from "../assets/xelyraShowcases/landing_page.gif";
import developerPage from "../assets/xelyraShowcases/developer_page.gif";
import sdkDocs from "../assets/xelyraShowcases/sdk_documentation.gif";
import formatsEmbed from "../assets/xelyraShowcases/formats_and_embed.gif";
import meetXyn from "../assets/xelyraShowcases/meet_xyn.png";
import xynPfp from "../assets/xelyraShowcases/xyn_changes_generated_pfp.gif";
import xynByFile from "../assets/xelyraShowcases/xyn_changes_byfile.png";
import xynName from "../assets/xelyraShowcases/xyn_changes_name.gif";
import eventLoop from "../assets/xelyraShowcases/event_loop.png";
import cpuUsage from "../assets/xelyraShowcases/cpu_usage_intel_i5_3rd.png";
import openFiles from "../assets/xelyraShowcases/open_file_deceptors.png";
import schema from "../assets/xelyraShowcases/schema.png";
import createServer from "../assets/xelyraShowcases/create_server.gif";
import addFriends from "../assets/xelyraShowcases/add_friends.gif";

const showcase = [
  {
    heading: "Landing Page",
    media: landingPage,
    desc: "A modern, Discord-inspired platform with real-time messaging, Gen AI, and extensible SDKs, Xelyra is designed to be a modern and user-friendly platform for users to interact with.",
  },
  {
    heading: "Developer Portal",
    media: developerPage,
    desc: "Powerful developer dashboard for managing your applications, bots, and integrations, Xelyra's developer portal is designed to be easy to use and understand, with a focus on simplicity and ease of use.",
  },
  {
    heading: "SDK for Xelyra",
    media: sdkDocs,
    desc: "Comprehensive, interactive SDK documentation to help you build bots and integrations quickly, Xelyra's SDK is designed to be easy to use and understand, with a focus on simplicity and ease of use.",
  },
  {
    heading: "Rich Message Formats & Embeds",
    media: formatsEmbed,
    desc: "Send messages with rich embeds, formatting, and media for a dynamic chat experience, Xelyra supports rich embeds and formatting to make your messages more engaging and interactive..",
  },
  {
    heading: "AI Assistant: Meet Xyn",
    media: meetXyn,
    desc: "Your intelligent AI companion Xyn, integrated directly into Xelyra to aid the users in their daily tasks.",
  },
  {
    heading: "AI-Generated Profile Pictures",
    media: xynPfp,
    desc: "Xyn's unique feature can generate unique profile pictures, profile banners and more using AI, based on your description and set them as your profile picture all in one go!",
  },
  {
    heading: "File-Based Profile Updates",
    media: xynByFile,
    desc: "Xyn can easily update your profile picture by uploading an image file, Xyn handles the rest with ease.",
  },
  {
    heading: "Natural Language Account Management",
    media: xynName,
    desc: "Change your display name, bio, profile themes and other details just by chatting with Xyn—no forms required!",
  },
  {
    heading: "Load Testing: Event Loop",
    media: eventLoop,
    desc: "Automated load testing with 500 simulated users performing all major actions like creating servers, groups, DMs, sending/accepting friend requests, sending messages, and logging in, reaching up to 3 million messages.",
  },
  {
    heading: "Load Testing: CPU Usage",
    media: cpuUsage,
    desc: "Automated load testing with 500 simulated users performing all major actions like creating servers, groups, DMs, sending/accepting friend requests, sending messages, and logging in, reaching up to 3 million messages.",
  },
  {
    heading: "Load Testing: Open Files",
    media: openFiles,
    desc: "Automated load testing with 500 simulated users performing all major actions like creating servers, groups, DMs, sending/accepting friend requests, sending messages, and logging in, reaching up to 3 million messages.",
  },
  {
    heading: "Database Schema",
    media: schema,
    desc: "This flowchart represents the database schema of Xelyra, it is a simple and easy to understand schema that is designed to be easy to use and understand, with a focus on simplicity and ease of use.",
  },
  {
    heading: "Server Creation",
    media: createServer,
    desc: "Create new servers in seconds customize everything from the name to the icon.",
  },
  {
    heading: "Friend System",
    media: addFriends,
    desc: "Add friends and grow your network with a simple, intuitive interface.",
  },
];

type Props = { open: boolean; onClose: () => void };

export function XelyraModal({ open, onClose }: Props) {
  const [idx, setIdx] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);
  useEffect(() => {
    setImgLoading(true);
  }, [idx, open]);
  if (!open) return null;
  const block = showcase[idx];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="bg-[#181824] rounded-xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col items-center z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl font-bold w-9 h-9 flex items-center justify-center rounded-full bg-red-400/15 hover:bg-red-500/30 transition-all focus:outline-none border border-white/10 z-10"
          aria-label="Close"
        >
          <img src={crossIcon} alt="Close" className="w-5 h-5" />
        </button>
        <div className="text-xl font-bold text-white text-center w-full mb-4">
          {block.heading}
        </div>
        <div className="relative w-full flex flex-col items-center min-h-[140px] justify-center">
          <button
            onClick={() =>
              setIdx((idx - 1 + showcase.length) % showcase.length)
            }
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-cyan-400/20 text-white text-xl transition-all focus:outline-none border border-white/10"
            aria-label="Previous"
          >
            <img src={AngleLeft} alt="Previous" className="w-6 h-6" />
          </button>
          {imgLoading && (
            <div className="absolute inset-0 flex items-center justify-center min-h-[100px]">
              <Loader />
            </div>
          )}
          <img
            src={block.media}
            alt={block.heading}
            className="w-full max-h-64 object-contain rounded-lg mb-4"
            style={{ display: imgLoading ? "none" : "block" }}
            onLoad={() => setImgLoading(false)}
          />
          <button
            onClick={() => setIdx((idx + 1) % showcase.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/30 hover:bg-cyan-400/20 text-white text-xl transition-all focus:outline-none border border-white/10"
            aria-label="Next"
          >
            <img src={AngleRight} alt="Next" className="w-6 h-6" />
          </button>
        </div>
        <div className="text-gray-300 text-base text-center mb-4 w-full">
          {block.desc}
        </div>
        <a
          href="https://github.com/dotflux/xelyra"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 rounded-lg bg-white text-black font-semibold text-base shadow-lg hover:bg-[#23232a] hover:text-white transition-all duration-200"
        >
          Visit Repository
        </a>
      </div>
    </div>
  );
}

import React from "react";
export const LazyXelyraModal = React.lazy(() => import("./XelyraModal"));

export default XelyraModal;
