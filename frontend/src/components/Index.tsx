import ParallaxBackground from "./ParallaxBackground";

import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";
import StickyNav from "./StickyNav";

const Index = () => {
  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-hidden flex flex-col">
      <StickyNav />
      <ParallaxBackground />
      <main className="relative z-10 flex flex-col gap-0 flex-1">
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      {/* Footer removed as requested for Contact page */}
    </div>
  );
};

export default Index;
