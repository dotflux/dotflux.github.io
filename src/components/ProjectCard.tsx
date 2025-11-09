import { Link } from "react-router-dom";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  route?: string;
}

const ProjectCard = ({ title, description, image, route }: ProjectCardProps) => {
  return (
    <div
      className="relative w-[280px] xs:w-[300px] sm:w-[340px] md:w-[400px] h-[200px] sm:h-[230px] md:h-[250px] shrink-0 rounded-2xl 
                 overflow-hidden border border-white/20 shadow-[0_6px_25px_rgba(0,0,0,0.4)] 
                 transition-transform duration-500 hover:scale-[1.04] cursor-pointer group"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-linear-to-br from-zinc-800 to-zinc-900">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-600"
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

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent opacity-100" />

      <div className="absolute bottom-0 p-3 sm:p-4 md:p-5 flex flex-col gap-1.5 sm:gap-2 z-10">
        <h3 className="text-lg sm:text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-300 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
          {description}
        </p>
        {route ? (
          <Link
            to={route}
            className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/40 rounded-xl text-xs sm:text-sm font-medium 
                       text-white hover:bg-white hover:text-black transition-all duration-300 self-start"
          >
            View
          </Link>
        ) : (
          <button
            className="mt-2 sm:mt-3 px-3 sm:px-4 py-1.5 sm:py-2 border border-white/40 rounded-xl text-xs sm:text-sm font-medium 
                       text-white hover:bg-white hover:text-black transition-all duration-300 self-start"
          >
            View
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
