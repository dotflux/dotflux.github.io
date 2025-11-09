import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import ProjectShowcase from "./components/ProjectShowcase";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/:projectName" element={<ProjectShowcase />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
