import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app/App.tsx";
import CaseStudyPage from "./app/CaseStudyPage.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/work/:slug" element={<CaseStudyPage />} />
    </Routes>
  </BrowserRouter>
);
