import Navbar from "./Navbar";
import Hero from "./Hero";
import Projects from "./Projects";
import Skills from "./Skills";
import Contact from "./Contact";

const Index = () => {
  return (
    <div className="bg-linear-to-b from-[#0a0a0a] via-[#0d0d0d] to-black text-white relative min-h-dvh w-full overflow-x-hidden flex flex-col font-sans">
      <Navbar />
      <div className="relative z-10 flex flex-col gap-0 flex-1">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
};

export default Index;
