import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  audoraFeatures,
  dotqlFeatures,
  xelyraFeatures,
  stratumFeatures,
} from "./features";
import audora from "../assets/audora_banner.png";
import dotQL from "../assets/dotQLBanner.jpg";
import xelyra from "../assets/xelyra_banner.png";

gsap.registerPlugin(ScrollTrigger);

const projectThumbnails: { [key: string]: string } = {
  xelyra: xelyra,
  audora: audora,
  dotql: dotQL,
  stratum: "stratumShowcases/landing_page.png",
};

const projectFeaturesMap: { [key: string]: typeof audoraFeatures } = {
  audora: audoraFeatures,
  dotql: dotqlFeatures,
  xelyra: xelyraFeatures,
  stratum: stratumFeatures,
};

const ProjectShowcase = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const features = projectName ? projectFeaturesMap[projectName] || [] : [];
  const thumbnail = projectName ? projectThumbnails[projectName] : null;

  if (!projectName || !features.length) {
    return (
      <div className="bg-linear-to-b from-[#0a0a0a] via-[#0d0d0d] to-black text-white min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            Project Not Found
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white/30 transition-all duration-300"
          >
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>(".feature-item")
        .forEach((item, index) => {
          const isEven = index % 2 === 0;
          gsap.fromTo(
            item,
            {
              x: isEven ? -50 : 50,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
              },
            }
          );
        });
    }, featuresRef);

    return () => ctx.revert();
  }, [features]);

  const getMediaExtension = (path: string) => {
    return path.split(".").pop()?.toLowerCase() || "";
  };

  const isVideo = (path: string) => {
    const ext = getMediaExtension(path);
    return ext === "mp4" || ext === "webm" || ext === "ogg";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectName]);

  return (
    <div
      ref={containerRef}
      className="bg-linear-to-b from-[#0a0a0a] via-[#0d0d0d] to-black text-white min-h-screen w-full overflow-x-hidden"
    >
      <div className="relative w-full overflow-x-hidden">
        {thumbnail ? (
          <div className="relative w-full h-[60vh] overflow-hidden">
            <img
              src={thumbnail}
              alt={projectName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-black/60"></div>
          </div>
        ) : (
          <div className="w-full h-[60vh] flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-24 w-24 text-gray-600"
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
        <div className="absolute top-4 left-4 z-10">
          <Link
            to="/"
            className="px-4 py-2 bg-black/80 backdrop-blur-md border border-white/30 rounded-xl text-white hover:bg-white hover:text-black transition-all duration-300 font-medium"
          >
            ← Back to projects
          </Link>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 sm:px-6 lg:px-8 pb-8 max-w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 capitalize warp-break-word">
            {projectName}
          </h1>
          <div className="h-1 w-24 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="relative w-full overflow-x-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <div
        ref={featuresRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full overflow-x-hidden"
      >
        {features.map((feature, index) => {
          const isEven = index % 2 === 0;
          const isVideoFile = isVideo(feature.media);
          const isAudoraMobile = projectName === "audora" && !isVideoFile;

          return (
            <div
              key={index}
              className={`feature-item mb-32 flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-16 w-full`}
            >
              <div
                className={`w-full md:w-1/2 ${
                  isEven ? "md:pr-12" : "md:pl-12"
                } flex justify-center`}
              >
                {isVideoFile ? (
                  <div className="relative w-full">
                    <video
                      src={feature.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                    />
                  </div>
                ) : isAudoraMobile ? (
                  <div className="w-full max-w-[280px] md:max-w-[320px] mx-auto">
                    <div className="relative bg-linear-to-br from-zinc-900 to-black rounded-[2.5rem] p-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.8)] border border-white/10">
                      <div className="relative bg-black rounded-4xl overflow-hidden">
                        <img
                          src={feature.media}
                          alt={feature.heading}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl border-b border-white/5"></div>
                    </div>
                  </div>
                ) : (
                  <div className="relative group">
                    <img
                      src={feature.media}
                      alt={feature.heading}
                      className="w-full h-auto rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                )}
              </div>
              <div
                className={`w-full md:w-1/2 ${
                  isEven ? "md:pl-12" : "md:pr-12"
                } flex flex-col justify-center`}
              >
                <div className="mb-3">
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Feature {index + 1}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
                  {feature.heading}
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectShowcase;
