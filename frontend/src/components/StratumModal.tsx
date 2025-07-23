import { useState, useEffect } from "react";
import AngleLeft from "../assets/angleLeft.svg";
import AngleRight from "../assets/angleRight.svg";
import Loader from "./Loader";
import crossIcon from "../assets/cross.svg";
import landingPage from "../assets/stratumShowcases/landing_page.png";
import createWorkspace from "../assets/stratumShowcases/create_workspace.png";
import workspaces from "../assets/stratumShowcases/workspaces.png";
import tasks from "../assets/stratumShowcases/tasks.png";
import billing from "../assets/stratumShowcases/billing.png";

const showcase = [
  {
    heading: "Landing Page",
    media: landingPage,
    desc: "Stratum is a collaborative workspace and task management platform for teams, built with NestJS, MongoDB, React, and Vite.",
  },
  {
    heading: "Create Workspace",
    media: createWorkspace,
    desc: "Users can create and manage workspaces for different teams and projects.",
  },
  {
    heading: "Workspaces Overview",
    media: workspaces,
    desc: "View and manage all your workspaces in one place.",
  },
  {
    heading: "Task Management",
    media: tasks,
    desc: "Create, assign, and track tasks, upload files, and manage members all in one dashboard.",
  },
  {
    heading: "Billing",
    media: billing,
    desc: "Track your usage, manage your plan, and earn 'Strats' by completing quests within the app.",
  },
];

type Props = { open: boolean; onClose: () => void };

export function StratumModal({ open, onClose }: Props) {
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
          href="https://github.com/dotflux/Stratum"
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
export const LazyStratumModal = React.lazy(() => import("./StratumModal"));

export default StratumModal;
