import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowRight, Moon, Sun, X } from "lucide-react";
import { WORKS } from "../data/works";
import logoImg from "@/imports/HDesign Logo.png";
import CustomCursor from "./CustomCursor";
import AnimatedMetric from "./AnimatedMetric";

function GalleryImage({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) {
  const isVideo = src.endsWith(".mp4");
  return (
    <div
      className="overflow-hidden cursor-pointer"
      style={{ borderRadius: "8px", background: "var(--muted)" }}
      onClick={onClick}
      role="button"
      aria-label={`View ${alt} full size`}
    >
      {isVideo ? (
        <motion.video
          src={src}
          className="w-full h-auto block"
          autoPlay
          muted
          loop
          playsInline
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-auto block"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
      )}
    </div>
  );
}

function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: string[];
  index: number;
  onClose: () => void;
  onNavigate: (i: number) => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [index, images.length, onClose, onNavigate]);

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-16"
      style={{ background: "rgba(0,0,0,0.92)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
    >
      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close"
        className="absolute top-6 right-6 p-2"
        style={{ color: "#ffffff" }}
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index - 1 + images.length) % images.length); }}
            aria-label="Previous image"
            className="absolute left-4 md:left-8 p-2"
            style={{ color: "#ffffff" }}
          >
            <ArrowLeft size={28} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate((index + 1) % images.length); }}
            aria-label="Next image"
            className="absolute right-4 md:right-8 p-2"
            style={{ color: "#ffffff" }}
          >
            <ArrowRight size={28} />
          </button>
        </>
      )}

      <motion.img
        key={index}
        src={images[index]}
        alt=""
        className="max-w-full max-h-full object-contain"
        style={{ borderRadius: "8px" }}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      />
    </motion.div>
  );
}

export default function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();

  const workIndex = WORKS.findIndex((w) => w.slug === slug);
  const work = WORKS[workIndex];
  const prev = workIndex > 0 ? WORKS[workIndex - 1] : null;
  const next = workIndex < WORKS.length - 1 ? WORKS[workIndex + 1] : null;

  const [isDark, setIsDark] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme");
    const dark = stored !== "light";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  // Lock page scroll while the lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  };

  if (!work) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center flex flex-col gap-4">
          <p
            className="text-sm"
            style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
          >
            Case study not found
          </p>
          <Link
            to="/"
            className="text-sm underline"
            style={{ color: "var(--primary)", fontFamily: "'General Sans', sans-serif" }}
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'General Sans', sans-serif" }}
    >
      <CustomCursor />
      {/* ── Nav ─────────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-6 md:px-12 h-16 flex items-center">
          <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
            <Link to="/" aria-label="Back to home">
              <img src={logoImg} alt="hdesign" className="h-8 w-auto object-contain" style={{ filter: isDark ? "none" : "invert(1)" }} />
            </Link>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="hidden md:inline-flex items-center gap-2 transition-colors hover:text-foreground"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "var(--muted-foreground)",
                }}
              >
                <ArrowLeft size={11} />
                BACK TO WORK
              </Link>
              <button
                onClick={toggleDark}
                className="p-2 transition-colors"
                style={{ color: "var(--muted-foreground)" }}
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <header className="pt-36 pb-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">

          {/* Eyebrow: id + year */}
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)", fontSize: "11px", fontWeight: 500 }}
            >
              {work.id}
            </span>
            <span
              style={{ width: "1px", height: "12px", background: "var(--border)", display: "inline-block" }}
            />
            <span
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)", fontSize: "11px" }}
            >
              {work.year}
            </span>
          </motion.div>

          {/* Title + description (left) + metadata sidebar (right) */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-12 items-start">

            {/* Left column: title then description */}
            <div className="flex flex-col gap-8">
              <motion.h1
                className="font-normal italic leading-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(3.5rem, 9vw, 7rem)",
                  letterSpacing: "-0.025em",
                  color: "var(--foreground)",
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              >
                {work.title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                <div className="w-8 h-px mb-6" style={{ backgroundColor: "var(--primary)" }} />
                <p
                  className="text-lg md:text-xl font-light leading-[1.8]"
                  style={{ fontFamily: "'General Sans', sans-serif", color: "var(--muted-foreground)" }}
                >
                  {work.caseStudyDescription}
                </p>
              </motion.div>
            </div>

            {/* Metadata sidebar */}
            <motion.div
              className="flex flex-col gap-7 md:pt-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {/* Role */}
              <div className="flex flex-col gap-1.5">
                <span
                  className="uppercase tracking-[0.2em] text-[10px]"
                  style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  Role
                </span>
                <span
                  className="text-sm"
                  style={{ fontFamily: "'General Sans', sans-serif", color: "var(--foreground)" }}
                >
                  {work.role}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-2">
                <span
                  className="uppercase tracking-[0.2em] text-[10px]"
                  style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  Category
                </span>
                <div className="flex flex-wrap gap-2">
                  <span
                    className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      border: "1px solid var(--border)",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {work.displayTag}
                  </span>
                </div>
              </div>

              {/* Year */}
              <div className="flex flex-col gap-1.5">
                <span
                  className="uppercase tracking-[0.2em] text-[10px]"
                  style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  Year
                </span>
                <span
                  className="text-sm"
                  style={{ fontFamily: "'General Sans', sans-serif", color: "var(--foreground)" }}
                >
                  {work.year}
                </span>
              </div>

              {/* Metric */}
              <div className="flex flex-col gap-1.5">
                <span
                  className="uppercase tracking-[0.2em] text-[10px]"
                  style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  Metric
                </span>
                <span
                  className="text-sm font-semibold"
                  style={{ fontFamily: "'General Sans', sans-serif", color: "var(--foreground)" }}
                >
                  <AnimatedMetric metric={work.metric} isInView={true} />
                </span>
              </div>

              {/* Skills & Deliverables */}
              {work.skills.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span
                    className="uppercase tracking-[0.2em] text-[10px]"
                    style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                  >
                    Skills &amp; Deliverables
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {work.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          border: "1px solid var(--border)",
                          color: "var(--muted-foreground)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── Image gallery ───────────────────────────────────────────────────── */}
      <section className="px-6 md:px-12 pb-28">
        <div className="max-w-6xl mx-auto flex flex-col gap-5">
          {work.caseStudyImages.length === 3 ? (
            <>
              {/* Two side-by-side on top */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <GalleryImage src={work.caseStudyImages[0]} alt={`${work.title} — screen 1`} onClick={() => setLightboxIndex(0)} />
                <GalleryImage src={work.caseStudyImages[1]} alt={`${work.title} — screen 2`} onClick={() => setLightboxIndex(1)} />
              </div>
              {/* Full-width at bottom */}
              <GalleryImage src={work.caseStudyImages[2]} alt={`${work.title} — screen 3`} onClick={() => setLightboxIndex(2)} />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {work.caseStudyImages.slice(0, 4).map((src, i) => (
                <GalleryImage key={i} src={src} alt={`${work.title} — screen ${i + 1}`} onClick={() => setLightboxIndex(i)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Prev / Next navigation ──────────────────────────────────────────── */}
      <nav
        aria-label="Case study navigation"
        className="border-t border-border px-6 md:px-12 py-16"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-2">
          <div>
            {prev && (
              <Link to={`/work/${prev.slug}`} className="group flex flex-col gap-2">
                <span
                  className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] transition-colors group-hover:text-foreground"
                  style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  <ArrowLeft size={11} /> Previous
                </span>
                <span
                  className="text-xl md:text-2xl font-normal transition-colors group-hover:text-primary"
                  style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
                >
                  {prev.title}
                </span>
              </Link>
            )}
          </div>
          <div className="flex flex-col items-end">
            {next && (
              <Link to={`/work/${next.slug}`} className="group flex flex-col gap-2 items-end">
                <span
                  className="inline-flex items-center gap-2 uppercase tracking-[0.2em] text-[10px] transition-colors group-hover:text-foreground"
                  style={{ fontFamily: "'DM Mono', monospace", color: "var(--muted-foreground)" }}
                >
                  Next <ArrowRight size={11} />
                </span>
                <span
                  className="text-xl md:text-2xl font-normal transition-colors group-hover:text-primary"
                  style={{ fontFamily: "'Playfair Display', serif", color: "var(--foreground)" }}
                >
                  {next.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            images={work.caseStudyImages}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
