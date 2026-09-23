import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home, About, Experience, Contact, NotFound } from "./pages/Pages";
import { Projects, ProjectDetail } from "./pages/Projects";
import { AIEngineering } from "./pages/AIEngineering";
import { Resume } from "./pages/Resume";
import { I18nProvider } from "./i18n/I18nProvider";
import "./App.css";
export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="ai-engineering" element={<AIEngineering />} />
            <Route path="resume" element={<Resume />} />
            <Route
              path="projects/ai-development-workflow"
              element={<Navigate to="/ai-engineering" replace />}
            />
            <Route
              path="projects/distributed-backend-systems"
              element={<Navigate to="/experience" replace />}
            />
            <Route path="projects/:slug" element={<ProjectDetail />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  );
}
