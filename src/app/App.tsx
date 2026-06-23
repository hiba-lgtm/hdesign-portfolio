import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring, useReducedMotion, type MotionValue } from "motion/react";
import logoImg from "@/imports/HDesign Logo.png";
import aboutImg from "@/imports/About.JPG";
import { WORKS, type Work, type FilterTag, type Metric } from "../data/works";
import CustomCursor from "./CustomCursor";
import AnimatedMetric from "./AnimatedMetric";
import {
  Moon,
  Sun,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  Smartphone,
  Globe,
  LayoutGrid,
  PenTool,
  Pen,
  MousePointer2,
  Zap,
  Hand,
} from "lucide-react";

// ─── Brand icons (not in Lucide) ─────────────────────────────────────────────

function DribbbleIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

function BehanceIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.051-2.053-5.051-5.013 0-2.94 1.925-5.012 5.03-5.012 3.093 0 4.755 2.06 4.988 5.25H13.79c.104 1.41.784 2.186 2.159 2.186 1.042 0 1.786-.487 2.028-1.414L21.726 17zm-8.832-4h4.187c-.087-1.09-.72-1.812-2.02-1.812-1.237 0-1.977.717-2.167 1.812zM6.787 12.21H4.842V9.086h1.945c.912 0 1.502.392 1.502 1.294 0 .9-.59 1.83-1.502 1.83zm-.029 5.034H4.813v-3.124h1.945c.94 0 1.58.428 1.58 1.554 0 1.127-.64 1.57-1.58 1.57zM2.25 7h5.535c2.354 0 3.872 1.136 3.872 3.057 0 1.202-.611 2.07-1.574 2.55 1.304.407 2.022 1.38 2.022 2.834C12.105 17.523 10.54 19 7.96 19H2.25V7z" />
    </svg>
  );
}

function UpworkIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
  );
}

// Work, FilterTag, Metric, and WORKS are imported from ../data/works

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

// WORKS array lives in src/data/works.ts

const NAV_LINKS = [
  { label: "About", href: "about", isPage: true },
  { label: "Contact", href: "contact", isPage: false },
];


const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Hiba has been an outstanding partner for our agency over the past year. She created dozens of high-quality website mockups for a wide variety of projects, and every experience working with her was consistently excellent. She is one of the best communicators we have worked with and incredibly reliable, always delivering on time and with great attention to detail. I look forward to working with her and her team again in the future. Highly recommended.",
    name: "Seth Spencer",
    role: "Owner and Founder, Sera Group",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:
      "Despite the timezone differences, Hiba provided great availability, was prompt in her communications and on time with all requirements. Her insights and ideas added real value to the design process. It is clear she is well organised and has a strong understanding of UX — we have no hesitation in recommending her.",
    name: "Ian Dorrepaal",
    role: "Founder at Vizzably",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:
      "Working with Hiba has been an absolute pleasure. From day one she truly took time to understand and address our concerns — patient, empathetic, and thoughtful. We are beyond pleased with the organisation and high standard of work she delivers consistently.",
    name: "Oreabetse Matlhare",
    role: "Founder and CEO, The Scalable CFO",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:
      "Hiba was excellent. Her work was always timely, thoughtful and well executed, and she was very easy to coordinate with. She really felt like a full member of the team. Best designer I've had. Would highly recommend her.",
    name: "Alan Shortz",
    role: "Co-Founder & President, Nightcap",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:
      "Working with you was a solid experience. Delivered great UX work in a short timeframe and genuinely exceeded my expectations.",
    name: "Jens Nyström",
    role: "Coach at Stomp It Camps",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&auto=format",
  },
  {
    quote:
      "Hiba did once again outperform our expectations. She truly is a master in the work she does. Fast, accurate and impeccable designs. Could not ask for better communications. We highly recommend her to anyone looking for the best UX/UI designer.",
    name: "Marcel Cordewener",
    role: "Owner and Founder, Connect Painters",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&auto=format",
  },
];

const SKILLS = [
  {
    category: "Design",
    items: [
      "UI Design",
      "Mobile App Design",
      "SaaS Product Design",
      "Design Systems",
      "Wireframing & Flows",
      "Interaction Design",
    ],
  },
  {
    category: "Research",
    items: [
      "User Interviews",
      "Usability Testing",
      "Competitive Analysis",
      "Journey Mapping",
      "Heuristic Review",
      "Diary Studies",
    ],
  },
  {
    category: "Tools",
    items: ["Figma", "FigJam", "ProtoPie", "Maze", "Lottie", "Zeplin"],
  },
  {
    category: "Delivery",
    items: [
      "Component Libraries",
      "Design Tokens",
      "Dev Handoff",
      "Responsive Specs",
      "Prototype Demos",
      "Design Ops",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function smoothScrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({
  isDark,
  toggleDark,
  activeSection,
  page,
  onGoAbout,
  onGoHome,
}: {
  isDark: boolean;
  toggleDark: () => void;
  activeSection: string;
  page: "home" | "about";
  onGoAbout: () => void;
  onGoHome: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const overHero = !scrolled;

  function handleNavClick(link: { href: string; isPage: boolean }) {
    setMenuOpen(false);
    if (link.isPage) {
      onGoAbout();
    } else {
      if (page === "about") {
        onGoHome();
        setTimeout(() => smoothScrollTo(link.href), 80);
      } else {
        smoothScrollTo(link.href);
      }
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/40 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => { setMenuOpen(false); onGoHome(); }}
          aria-label="Back to home"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
        >
          <img
            src={logoImg}
            alt="hdesign"
            className="h-8 w-auto object-contain"
            style={{ filter: isDark ? "none" : "invert(1)" }}
          />
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive = link.isPage
              ? page === "about"
              : page === "home" && activeSection === link.href;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link)}
                className={`text-sm transition-colors duration-300 ${
                  !overHero || page === "about"
                    ? isActive
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground"
                    : ""
                }`}
                style={
                  overHero && page !== "about"
                    ? { color: isActive ? "var(--primary)" : "var(--on-canvas-muted)" }
                    : undefined
                }
              >
                {link.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleDark}
            className="p-2 transition-colors duration-300"
            style={{ color: overHero && page !== "about" ? "var(--on-canvas-muted)" : undefined }}
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          <button
            className="md:hidden p-1 transition-colors"
            style={{ color: overHero && page !== "about" ? "var(--on-canvas-muted)" : undefined }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} /> : (
              <div className="flex flex-col gap-1.5 w-5">
                <span className="h-px bg-current w-full" />
                <span className="h-px bg-current w-3" />
              </div>
            )}
          </button>
        </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link)}
              className="block w-full text-left py-3 text-sm text-foreground border-b border-border/50 last:border-0"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "12", label: "Years" },
  { value: "40+", label: "Products Shipped" },
  { value: "20+", label: "Industries" },
];

const ACCENT_GLOW = "rgba(237,255,135,0.4)"; // lime glow — always on dark card images, so stays hardcoded

function LoadingScreen({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const startDelay = 900; // wait for "h design" fade-in to finish
    const countDuration = 2200;
    const steps = 100;
    const stepTime = countDuration / steps;

    const startTimeout = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setCount(current);
        if (current >= 100) {
          clearInterval(interval);
          setTimeout(() => setExiting(true), 500);
        }
      }, stepTime);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{ background: "#000000" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (exiting) onFinish();
      }}
    >
      <div className="flex items-baseline">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic",
            fontSize: "clamp(120px, 14vw, 150px)",
            lineHeight: 1,
            color: "#ffffff",
          }}
        >
          h
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          style={{
            fontFamily: "'General Sans', sans-serif",
            fontSize: "clamp(28px, 3vw, 36px)",
            color: "#ffffff",
            marginLeft: "8px",
          }}
        >
          design
        </motion.span>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
        className="mt-6 text-xs tracking-[0.3em] uppercase"
        style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)" }}
      >
        {count}%
      </motion.div>
    </motion.div>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col pt-16 overflow-hidden"
      style={{ background: "var(--canvas)" }}
    >
      {/* Main content — vertically positioned with pt-20 bias */}
      <div className="flex-1 flex items-center pt-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto w-full">

          {/* Row 1: eyebrow (left) + H Design. wordmark (right) */}
          <div className="flex items-baseline justify-between mb-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[10px] tracking-[0.28em] uppercase font-medium"
              style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)" }}
            >
              UI/UX Design Studio
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-lg font-normal italic"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--on-canvas-muted)" }}
            >
              H Design.
            </motion.span>
          </div>

          {/* Divider above headline */}
          <motion.div
            className="w-full h-px mb-6"
            style={{ background: "var(--on-canvas-hairline)", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          />

          {/* Headline — two explicit rows, description beside "Beautiful" on row 1 */}
          <div className="flex flex-col mb-6" style={{ fontSize: "clamp(2.8rem, 5.5vw, 6.5rem)" }}>

            {/* Row 1: "Beautiful" + description in remaining space */}
            <div className="flex items-center gap-10">
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                className="font-semibold flex-shrink-0"
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  fontSize: "inherit",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.92,
                  color: "var(--on-canvas)",
                }}
              >
                Beautiful
              </motion.span>

              {/* Description — beside "Beautiful", hidden on mobile */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="hidden md:block flex-shrink-0"
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  fontSize: "clamp(0.78rem, 1vw, 0.9rem)",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "var(--on-canvas-muted)",
                  maxWidth: "300px",
                }}
              >
                Translating your vision into SaaS platforms, websites, and mobile
                apps that{" "}
                <span style={{ color: "var(--primary)" }}>convert.</span>
              </motion.p>
            </div>

            {/* Row 2: "Interfaces. Proven Results." — fills the full width */}
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              className="font-semibold"
              style={{
                fontFamily: "'General Sans', sans-serif",
                fontSize: "inherit",
                letterSpacing: "-0.04em",
                lineHeight: 0.92,
              }}
            >
              <span style={{ color: "var(--on-canvas)" }}>Interfaces. Proven </span>
              <span
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Results.
              </span>
            </motion.span>

          </div>

          {/* Divider below headline */}
          <motion.div
            className="w-full h-px mb-6"
            style={{ background: "var(--on-canvas-hairline)", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
          />

          {/* Below divider: credit line + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <p
              className="text-xs font-light flex items-center gap-2.5"
              style={{ fontFamily: "'General Sans', sans-serif", color: "var(--on-canvas-dim)" }}
            >
              <span className="inline-block w-5 h-px flex-shrink-0" style={{ backgroundColor: "var(--primary)" }} />
              Led by Hiba Babar, Senior UI/UX Designer
            </p>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => smoothScrollTo("work")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 hover:opacity-75"
                style={{ fontFamily: "'General Sans', sans-serif", color: "var(--primary)", border: "1px solid var(--primary)" }}
              >
                Selected Work <ArrowRight size={12} />
              </button>
              <button
                onClick={() => smoothScrollTo("contact")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 hover:opacity-75"
                style={{
                  fontFamily: "'General Sans', sans-serif",
                  color: "var(--on-canvas-muted)",
                  border: "1px solid var(--on-canvas-ghost-border)",
                }}
              >
                Get in touch
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Stats bar — pinned to section bottom */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="px-6 md:px-12 pb-5"
        style={{ borderTop: "1px solid var(--on-canvas-hairline)" }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-3 pt-4 justify-items-center">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1.5">
              <span
                style={{ fontFamily: "'General Sans', sans-serif", color: "var(--primary)" }}
                className="text-2xl md:text-3xl font-medium tabular-nums leading-none"
              >
                {stat.value}
              </span>
              <span
                className="text-[9px] tracking-[0.2em] uppercase leading-tight"
                style={{ fontFamily: "'DM Mono', monospace", color: "var(--on-canvas-dim)" }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── About ───────────────────────────────────────────────────────────────────

function AboutPage({ onBack }: { onBack: () => void }) {
  const shouldReduceMotion = useReducedMotion();
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Image parallax — drifts downward as the section scrolls through (12% travel)
  const { scrollYProgress: imgProgress } = useScroll({
    target: imgContainerRef,
    offset: ["start end", "end start"],
  });
  const rawImgY = useTransform(imgProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["-6%", "6%"]);
  const imgY = useSpring(rawImgY, { stiffness: 60, damping: 20, mass: 0.8 });

  // Three-layer text parallax — each group moves at a different rate, creating
  // visible depth separation as the user scrolls. One shared useScroll drives
  // all three transforms so only one scroll listener is added.
  // Mobile / reduced-motion: all layers lock to 0 for performance + accessibility.
  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start end", "end start"],
  });

  const off = shouldReduceMotion;
  // Heading: fastest — drifts up the most (counter to scroll direction)
  const rawHeadY = useTransform(textProgress, [0, 1], off ? ["0%", "0%"] : ["1.5%", "-1.5%"]);
  const headY = useSpring(rawHeadY, { stiffness: 55, damping: 22, mass: 0.9 });

  // Body: middle speed
  const rawBodyY = useTransform(textProgress, [0, 1], off ? ["0%", "0%"] : ["0.7%", "-0.7%"]);
  const bodyY = useSpring(rawBodyY, { stiffness: 55, damping: 22, mass: 0.9 });

  // Signature/CTA: slowest — drifts slightly in the opposite direction for
  // extra depth contrast (feels like it's "behind" the heading)
  const rawSigY = useTransform(textProgress, [0, 1], off ? ["0%", "0%"] : ["-0.4%", "0.4%"]);
  const sigY = useSpring(rawSigY, { stiffness: 55, damping: 22, mass: 0.9 });

  // Shared entrance transition factory — keeps stagger declarative
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors mb-14"
          style={{ fontFamily: "'DM Mono', monospace", letterSpacing: "0.12em" }}
        >
          <ArrowRight size={12} className="rotate-180" />
          BACK TO HOME
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-14 md:gap-20 items-start">
          {/* Photo — fixed aspect ratio preserves original framing;
              overflow:hidden on the inner div clips parallax travel cleanly. */}
          <div className="relative overflow-hidden" ref={imgContainerRef}>
            <motion.img
              src={aboutImg}
              alt="Hiba Babar, Senior UI/UX Designer"
              className="w-full h-auto block"
              style={{
                y: imgY,
                scale: 1.04,
                willChange: "transform",
              }}
            />
          </div>

          {/* Text column — ref anchors the shared scroll tracker; no y on the
              wrapper itself since each child layer moves independently */}
          <div
            ref={textRef}
            className="flex flex-col gap-8 pt-2 md:pt-4 md:pb-6"
          >
            {/* Group 1: eyebrow + heading — fastest layer */}
            <motion.div className="flex flex-col gap-8" style={{ y: headY }} {...enter(0.1)}>
              <span
                style={{ fontFamily: "'DM Mono', monospace" }}
                className="text-xs tracking-[0.28em] uppercase text-primary"
              >
                About Hiba Babar
              </span>

              <h1
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl md:text-5xl font-normal leading-tight text-foreground"
              >
                Designing at the
                <br />
                <em>intersection</em> of
                <br />
                clarity and craft.
              </h1>
            </motion.div>

            {/* Group 2: body paragraphs — middle speed */}
            <motion.div
              className="flex flex-col gap-4 text-muted-foreground font-light leading-[1.8] text-[0.95rem]"
              style={{ fontFamily: "'General Sans', sans-serif", y: bodyY }}
              {...enter(0.75)}
            >
              <p>
                I know it might sound cliché, but living across different countries
                and cities is genuinely where my passion for design took root —
                particularly product design. There's a thrill in bringing a creative
                vision to life that I haven't found anywhere else, and from the moment
                I felt it, I knew it was something I wanted to keep doing. That instinct
                turned into 12 years of practice, working mostly solo and bringing in
                trusted designers when a project's scope calls for more hands.
              </p>
              <p>
                Over the past decade-plus, I've partnered with clients across SaaS
                platforms, websites, and mobile apps — from enterprise teams to founders
                building something from scratch. What stays consistent is the care:
                understanding the people who'll actually use what I design, and building
                interfaces that feel like they were considered, not assembled.
              </p>
              <p>
                If you're working on something and need support bringing your vision to
                life, I'd love to hear about it — reach out anytime.
              </p>
            </motion.div>

            {/* Group 3: signature + CTA — slowest, drifts opposite direction */}
            <motion.div className="mt-auto flex flex-col gap-6 pt-4" style={{ y: sigY }} {...enter(1.5)}>
              <div
                className="flex flex-col gap-0.5"
                style={{ fontFamily: "'General Sans', sans-serif" }}
              >
                <span className="text-sm font-medium text-foreground">Hiba Babar</span>
                <span className="text-xs font-light text-muted-foreground">Lead UI/UX Designer, H Design</span>
              </div>

              <button
                onClick={onBack}
                className="self-start inline-flex items-center gap-2 text-sm font-medium rounded-full border border-primary text-primary px-5 py-2.5 hover:opacity-75 transition-all duration-200"
                style={{ fontFamily: "'General Sans', sans-serif" }}
              >
                View my work <ArrowRight size={14} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Value Proposition ───────────────────────────────────────────────────────

function ValueProp() {
  return (
    <section
      className="py-20 md:py-28 px-6 md:px-12"
      style={{ background: "var(--canvas)", borderTop: "1px solid var(--on-canvas-hairline)" }}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className="text-3xl md:text-4xl lg:text-[3.25rem] font-semibold leading-[1.15] max-w-4xl"
          style={{ color: "var(--on-canvas)", fontFamily: "'General Sans', sans-serif", letterSpacing: "-0.025em" }}
        >
          We partner with founders and product teams to design SaaS platforms,
          websites, and mobile apps that{" "}
          <span style={{ color: "var(--primary)" }}>convert</span>
          {" "}— translating your vision into interfaces that are both beautiful
          and usable, backed by extensive experience in product design and
          development.
        </p>
      </div>
    </section>
  );
}

// ─── Thumbnail media — renders video or image depending on work data ─────────

function ThumbnailMedia({ work, className, style }: { work: Work; className?: string; style?: React.CSSProperties }) {
  if (work.thumbnailVideo) {
    return (
      <video
        src={work.thumbnailVideo}
        className={className}
        style={style}
        autoPlay
        muted
        loop
        playsInline
      />
    );
  }
  return <img src={work.thumbnail} alt={work.title} className={className} style={style} />;
}

// ─── Custom cursor — see ./CustomCursor.tsx ───────────────────────────────────

// ─── Fade-in wrapper ─────────────────────────────────────────────────────────

function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── Animated metric — see ./AnimatedMetric.tsx ──────────────────────────────

// ─── Work Grid ───────────────────────────────────────────────────────────────

// Shared image overlay elements reused across all card variants
function CardOverlays({ work }: { work: Work }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span
          className="inline-flex items-center gap-2 text-white text-xs font-semibold px-5 py-2.5 rounded-full pointer-events-auto"
          style={{ fontFamily: "'General Sans', sans-serif", backgroundColor: "var(--primary)", boxShadow: `0 0 32px ${ACCENT_GLOW}` }}
        >
          View Case Study <ArrowUpRight size={12} />
        </span>
      </div>
      <div className="absolute top-4 left-4 pointer-events-none">
        <span
          className="text-[10px] tracking-[0.18em] uppercase px-3 py-1 rounded-full"
          style={{ fontFamily: "'DM Mono', monospace", background: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)" }}
        >
          {work.displayTag}
        </span>
      </div>
    </>
  );
}

// Shared info block reused across card variants
function CardInfo({ work, isInView, delay = 0 }: { work: Work; isInView: boolean; delay?: number }) {
  return (
    <motion.div
      className="flex flex-col gap-2.5"
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <p className="text-xl md:text-2xl font-semibold leading-tight" style={{ fontFamily: "'General Sans', sans-serif", letterSpacing: "-0.01em", color: "var(--on-canvas)" }}>
        <AnimatedMetric metric={work.metric} isInView={isInView} />
      </p>
      <div className="w-8 h-px transition-all duration-300 group-hover:w-12" style={{ backgroundColor: "var(--primary)" }} />
      <h3 className="text-lg font-normal leading-snug" style={{ fontFamily: "'Playfair Display', serif", color: "var(--on-canvas-muted)" }}>
        {work.title}
      </h3>
      <div className="flex items-center gap-2.5 mt-0.5">
        <span className="text-[11px] font-medium" style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)" }}>{work.id}</span>
        <span style={{ color: "var(--on-canvas-hairline)" }}>·</span>
        <span className="text-[11px]" style={{ fontFamily: "'DM Mono', monospace", color: "var(--on-canvas-dim)" }}>{work.category} · {work.year}</span>
      </div>
    </motion.div>
  );
}

// ── Standard card (two-column grid rows) ──────────────────────────────────────
function WorkCard({ work, columnIndex }: { work: Work; columnIndex: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const isInView = useInView(cardRef, { once: false, margin: "0px 0px -8% 0px" });

  return (
    <a ref={cardRef} href={work.externalUrl} target="_blank" rel="noopener noreferrer" className="group text-left block w-full">
      <div className="relative aspect-[4/3] overflow-hidden mb-6" style={{ background: "var(--card-fill)" }}>
        <motion.div style={{ y: imageY }} className="absolute -top-[10%] left-0 right-0 h-[120%]">
          <ThumbnailMedia work={work} className="w-full h-full object-cover transition-[filter] duration-700 group-hover:brightness-[1.1]" />
        </motion.div>
        <CardOverlays work={work} />
      </div>
      <CardInfo work={work} isInView={isInView} delay={columnIndex === 1 ? 0.14 : 0} />
    </a>
  );
}

// ── Shared editorial row content (info left, framed image right) ─────────────
function EditorialCardContent({ work, isInView }: { work: Work; isInView: boolean }) {
  return (
    // Full-screen card: 100vw × 100vh, content vertically centered
    <Link
      to={`/work/${work.slug}`}
      className="group flex items-center text-left"
      style={{ width: "100vw", height: "100vh" }}
    >
      {/* Mobile: flex column (image top, info bottom). Desktop: two-column grid */}
      <div className="flex flex-col md:grid md:grid-cols-2 w-full h-full" style={{ gap: 0 }}>

        {/* Image — top on mobile, right column on desktop */}
        <motion.div
          className="md:hidden order-first w-full flex-shrink-0 overflow-hidden"
          style={{ height: "300px", background: "var(--card-fill)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ThumbnailMedia
            work={work}
            className="w-full h-full object-cover object-center"
            style={work.slug === "neutreeno" ? { objectPosition: "left center", transform: "scale(1.1)", transformOrigin: "left center" } : undefined}
          />
        </motion.div>

        {/* LEFT — project info, vertically centered */}
        <div className="flex items-center px-8 py-6 md:px-20 lg:px-28 md:py-0">
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Number + year */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-medium" style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)" }}>{work.id}</span>
              <span style={{ width: "1px", height: "12px", background: "var(--on-canvas-hairline)", display: "inline-block" }} />
              <span className="text-[11px]" style={{ fontFamily: "'DM Mono', monospace", color: "var(--on-canvas-dim)" }}>{work.year}</span>
            </div>

            {/* Project name */}
            <h3
              className="text-3xl md:text-6xl lg:text-7xl font-normal leading-none"
              style={{ fontFamily: "'Playfair Display', serif", color: "var(--on-canvas)", letterSpacing: "-0.025em" }}
            >
              {work.title}
            </h3>

            {/* Description */}
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--on-canvas-muted)", fontFamily: "'General Sans', sans-serif", fontWeight: 300, maxWidth: "28ch" }}
            >
              {work.summary}
            </p>

            {/* Metric */}
            <p
              className="text-xl md:text-2xl font-semibold"
              style={{ fontFamily: "'General Sans', sans-serif", letterSpacing: "-0.015em", color: "var(--on-canvas)" }}
            >
              <AnimatedMetric metric={work.metric} isInView={isInView} />
            </p>

            {/* Category pill + hover CTA */}
            <div className="flex items-center gap-4 mt-1">
              <span
                className="text-[10px] tracking-[0.18em] uppercase px-3 py-1.5 rounded-full"
                style={{ fontFamily: "'DM Mono', monospace", border: "1px solid var(--on-canvas-ghost-border)", color: "var(--on-canvas-dim)" }}
              >
                {work.displayTag}
              </span>
              <span
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontFamily: "'General Sans', sans-serif", color: "var(--primary)" }}
              >
                View Case Study <ArrowUpRight size={11} />
              </span>
            </div>
          </motion.div>
        </div>

        {/* RIGHT — image fills the right half, vertically centered with padding */}
        <motion.div
          className="hidden md:flex items-center pr-10 lg:pr-20"
          initial={{ opacity: 0, x: 32 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 32 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div
            className="w-full overflow-hidden"
            style={{
              borderRadius: "10px",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3), 0 32px 64px rgba(0,0,0,0.4)",
              aspectRatio: "1440 / 1024",
            }}
          >
            {work.thumbnailVideo ? (
              <video
                src={work.thumbnailVideo}
                className="w-full h-full object-cover object-center"
                autoPlay muted loop playsInline
              />
            ) : (
              <motion.img
                src={work.thumbnail}
                alt={work.title}
                className="w-full h-full object-cover object-center"
                initial={{ scale: 1.0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            )}
          </div>
        </motion.div>
      </div>
    </Link>
  );
}

// ── Stacked card wrapper — sticky + scale-back effect ────────────────────────
// Each card driven by the deck's single scroll progress value.
// Cards are absolutely layered; the first card is `relative` to size the viewport.
function StackingCard({
  work,
  index,
  total,
  progress,
}: {
  work: Work;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const slice = 1 / total;

  const y = useTransform(
    progress,
    [Math.max(0, (index - 1) * slice), Math.max(slice * 0.01, index * slice)],
    ["108%", "0%"]
  );
  const scale = useTransform(progress, [index * slice, (index + 1) * slice], [1, 0.95]);
  const opacity = useTransform(progress, [index * slice, (index + 1) * slice], [1, 0.85]);

  // Derive an isActive boolean from the shared scroll progress so AnimatedMetric
  // can retrigger its count-up every time this card becomes the foreground card.
  // Active window: from just before the card finishes sliding in to just before
  // the next card finishes sliding in (i.e. while this card is on top).
  const [isActive, setIsActive] = useState(index === 0);
  useEffect(() => {
    const activeStart = Math.max(0, index * slice - slice * 0.1);
    const activeEnd = isLast ? 1.1 : (index + 1) * slice - slice * 0.1;
    return progress.on("change", (v) => {
      setIsActive(v >= activeStart && v < activeEnd);
    });
  }, [progress, index, slice, isLast]);

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        zIndex: index + 1,
        y: isFirst ? "0%" : y,
        scale: isLast ? 1 : scale,
        opacity: isLast ? 1 : opacity,
        transformOrigin: "50% 30%",
        background: "var(--canvas)",
      }}
    >
      <EditorialCardContent work={work} isInView={isActive} />
    </motion.div>
  );
}

function StackedDeck({ works }: { works: Work[] }) {
  const deckRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: deckRef,
    offset: ["start start", "end end"],
  });

  return (
    // Each card gets 100vh of scroll budget; total = N × 100vh
    <div
      ref={deckRef}
      style={{ height: `${works.length * 100}vh`, position: "relative" }}
    >
      {/* Sticky viewport — full screen, pins at the very top */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {works.map((work, i) => (
          <StackingCard
            key={work.id}
            work={work}
            index={i}
            total={works.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

// ── Horizontal card (last slot — image left, info right) ──────────────────────
function HorizontalWorkCard({ work }: { work: Work }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const isInView = useInView(cardRef, { once: false, margin: "0px 0px -8% 0px" });

  return (
    <a ref={cardRef} href={work.externalUrl} target="_blank" rel="noopener noreferrer" className="group text-left block w-full">
      <div className="grid grid-cols-1 md:grid-cols-[1.15fr_0.85fr] gap-0 items-center">
        {/* Image — left panel */}
        <div className="relative aspect-[16/10] overflow-hidden" style={{ background: "var(--card-fill)" }}>
          <motion.div style={{ y: imageY }} className="absolute -top-[10%] left-0 right-0 h-[120%]">
            <ThumbnailMedia work={work} className="w-full h-full object-cover transition-[filter] duration-700 group-hover:brightness-[1.1]" />
          </motion.div>
          <CardOverlays work={work} />
        </div>
        {/* Info — right panel, indented for breathing room */}
        <div className="md:pl-14 pt-8 md:pt-0">
          <CardInfo work={work} isInView={isInView} delay={0.1} />
        </div>
      </div>
    </a>
  );
}

function WorkGrid() {
  return (
    <section id="work" style={{ background: "var(--canvas)" }}>
      {/* Section header — stays in the normal padded layout */}
      <div className="px-6 md:px-12 py-28">
        <div className="max-w-6xl mx-auto flex flex-col gap-3">
          <span style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)" }} className="text-xs tracking-[0.28em] uppercase">
            Selected Work
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "var(--on-canvas)" }} className="text-4xl md:text-5xl font-normal">
            Case studies
          </h2>
        </div>
      </div>

      {/* Full-bleed stacked deck — no horizontal constraints */}
      <StackedDeck works={WORKS} />
    </section>
  );
}

// ─── Case Study Modal ─────────────────────────────────────────────────────────

function CaseStudyModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
      {/* Close */}
      <button
        onClick={onClose}
        className="fixed top-5 right-6 z-10 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
        aria-label="Close case study"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        <X size={18} /> Close
      </button>

      <div className="max-w-5xl mx-auto px-6 md:px-12 pt-24 pb-32">
        {/* Header */}
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-5 mb-7">
            <span
              style={{ fontFamily: "'DM Mono', monospace" }}
              className="text-xs text-primary"
            >
              {work.id}
            </span>
            <span
              className="text-xs text-muted-foreground"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {work.category} · {work.year}
            </span>
          </div>
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl md:text-6xl font-normal italic leading-[1.05] text-foreground mb-7"
          >
            {work.title}
          </h2>
          <p
            className="text-xl text-muted-foreground font-light leading-relaxed"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {work.summary}
          </p>
        </div>

        {/* Hero image */}
        <div className="aspect-video bg-muted overflow-hidden mb-16">
          <ThumbnailMedia work={work} className="w-full h-full object-cover" />
        </div>

        {/* Problem */}
        <div className="border-t border-border pt-12 mb-14">
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-xs tracking-[0.22em] uppercase text-primary block mb-5"
          >
            Problem
          </span>
          <p
            className="text-lg md:text-xl font-light leading-[1.8] text-foreground max-w-2xl"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            {work.problem}
          </p>
        </div>

        {/* Process */}
        <div className="border-t border-border pt-12 mb-14">
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-xs tracking-[0.22em] uppercase text-primary block mb-6"
          >
            Process
          </span>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-10 items-start">
            <p
              className="text-base font-light leading-[1.8] text-muted-foreground"
              style={{ fontFamily: "'General Sans', sans-serif" }}
            >
              {work.process}
            </p>
            <div className="aspect-video bg-muted overflow-hidden">
              <img
                src={work.processImage}
                alt="Design process documentation"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Before / After */}
        <div className="border-t border-border pt-12 mb-14">
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-xs tracking-[0.22em] uppercase text-primary block mb-7"
          >
            Before / After
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { src: work.beforeImage, label: "Before", alt: "Before redesign" },
              { src: work.afterImage, label: "After", alt: "After redesign" },
            ].map((img) => (
              <div key={img.label}>
                <div className="aspect-[4/3] bg-muted overflow-hidden mb-2.5">
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </div>
                <span
                  style={{ fontFamily: "'DM Mono', monospace" }}
                  className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {img.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="border-t border-border pt-12">
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-xs tracking-[0.22em] uppercase text-primary block mb-10"
          >
            Results & Metrics
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {work.metrics.map((m) => (
              <div key={m.label} className="flex flex-col gap-2">
                <span
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl md:text-4xl font-normal text-primary leading-none"
                >
                  {m.value}
                </span>
                <span
                  className="text-sm font-medium text-foreground leading-snug mt-1"
                  style={{ fontFamily: "'General Sans', sans-serif" }}
                >
                  {m.label}
                </span>
                <span
                  className="text-xs text-muted-foreground font-light"
                  style={{ fontFamily: "'General Sans', sans-serif" }}
                >
                  {m.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skills ──────────────────────────────────────────────────────────────────

const TICKER_ITEMS = [
  "UI/UX Design",
  "Mobile App Design",
  "SaaS Products",
  "Design Systems",
  "Prototyping",
  "Figma",
  "Usability Testing",
  "Concept to Launch",
  "Interaction Design",
];

const TICKER_ICONS: Record<string, React.ElementType> = {
  "UI/UX Design": Layers,
  "Mobile App Design": Smartphone,
  "SaaS Products": Globe,
  "Design Systems": LayoutGrid,
  "Prototyping": PenTool,
  "Figma": Pen,
  "Usability Testing": MousePointer2,
  "Concept to Launch": Zap,
  "Interaction Design": Hand,
};

const TICKER_BG = "var(--canvas-alt)";

function Skills() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      id="skills"
      className="relative overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          animation: ticker-scroll 44s linear infinite;
        }
        .ticker-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Hairlines */}

      <div className="py-5">
        <div
          className="ticker-track flex items-center"
          style={{ width: "max-content" }}
          aria-label="Services and skills"
        >
          {doubled.map((item, i) => {
            const label = TICKER_ITEMS[i % TICKER_ITEMS.length];
            const Icon = TICKER_ICONS[label];
            return (
              <span key={i} className="flex items-center flex-shrink-0">
                {/* Plain text + icon, no container */}
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    color: "var(--on-canvas-dim)",
                    fontFamily: "'General Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
                    whiteSpace: "nowrap",
                    letterSpacing: "0.02em",
                    flexShrink: 0,
                  }}
                >
                  {item}
                </span>
                {/* Thin vertical divider */}
                <span
                  style={{
                    display: "inline-block",
                    width: "1px",
                    height: "12px",
                    background: "var(--on-canvas-hairline)",
                    margin: "0 1.4rem",
                    flexShrink: 0,
                  }}
                />
              </span>
            );
          })}
        </div>
      </div>


    </section>
  );
}

// ─── Approach ────────────────────────────────────────────────────────────────

const APPROACH_ITEMS = [
  {
    number: "01",
    title: "Expanding into code.",
    body: "I design upstream in Figma, prototype rapidly in Figma Make, and I'm now exploring Claude Code to bring interfaces to life with real motion and interaction — starting with this very site.",
  },
  {
    number: "02",
    title: "Clear, constant communication.",
    body: "Clients consistently tell me I'm easy to coordinate with and quick to respond. No long silences, no guessing where things stand.",
  },
  {
    number: "03",
    title: "I become part of your team.",
    body: "Whether it's a single project or a long-term retainer, I work inside your process, not around it — attending standups, syncing with engineering, and showing up like I'm already on payroll.",
  },
  {
    number: "04",
    title: "Reliability over flash.",
    body: "Deadlines are commitments, not suggestions. I'd rather under-promise and consistently deliver than chase a flashy pitch that slips.",
  },
  {
    number: "05",
    title: "I advocate for the user, even when it's uncomfortable.",
    body: "I've pushed back on stakeholder preferences when accessibility or usability was at stake — and found solutions that satisfied both the brand and the people using the product.",
  },
  {
    number: "06",
    title: "Design QA is part of the job, not an afterthought.",
    body: "I follow through past handoff, checking implementation against design intent so what ships actually matches what was designed.",
  },
];

function Approach() {
  return (
    <section
      className="py-24 px-6 md:px-12"
      style={{ background: "var(--canvas)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-14">
          <span
            className="text-[10px] tracking-[0.28em] uppercase font-medium"
            style={{ fontFamily: "'DM Mono', monospace", color: "var(--primary)" }}
          >
            Approach
          </span>
          <div className="flex-1 h-px" style={{ background: "var(--on-canvas-hairline)" }} />
        </div>

        {/* Grid: 2 columns on md+, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {APPROACH_ITEMS.map((item, i) => (
            <div
              key={item.number}
              className="flex gap-6 py-8"
              style={{
                borderTop: "1px solid var(--on-canvas-hairline)",
                borderBottom: i >= APPROACH_ITEMS.length - 2 ? "1px solid var(--on-canvas-hairline)" : undefined,
              }}
            >
              {/* Number */}
              <span
                className="flex-shrink-0 leading-none"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.12em",
                  color: "var(--primary)",
                  paddingTop: "3px",
                }}
              >
                {item.number}
              </span>

              {/* Text */}
              <div className="flex flex-col gap-2">
                <p
                  className="text-base font-semibold leading-snug"
                  style={{ fontFamily: "'General Sans', sans-serif", color: "var(--on-canvas)" }}
                >
                  {item.title}
                </p>
                <p
                  className="text-sm font-light leading-relaxed"
                  style={{ fontFamily: "'General Sans', sans-serif", color: "var(--on-canvas-muted)" }}
                >
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const navigate = useCallback((next: number) => {
    setFading(true);
    setTimeout(() => {
      setIndex(next);
      setFading(false);
    }, 220);
  }, []);

  const prev = () => navigate((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => navigate((index + 1) % TESTIMONIALS.length);

  const t = TESTIMONIALS[index];

  return (
    <section className="py-24 px-6 md:px-12" style={{ background: "var(--canvas-muted)" }}>
      <div className="max-w-2xl mx-auto flex flex-col items-center text-center">
        {/* Eyebrow */}
        <span
          style={{ fontFamily: "'DM Mono', monospace", color: "var(--on-canvas-dim)" }}
          className="text-[10px] tracking-[0.3em] uppercase mb-12 block"
        >
          What clients say
        </span>

        {/* Quote */}
        <blockquote
          style={{
            fontFamily: "'Playfair Display', serif",
            opacity: fading ? 0 : 1,
            transition: "opacity 0.22s ease",
            color: "var(--on-canvas)",
          }}
          className="text-xl md:text-2xl font-normal italic leading-[1.65] mb-10"
        >
          "{t.quote}"
        </blockquote>

        {/* Attribution */}
        <div
          style={{ opacity: fading ? 0 : 1, transition: "opacity 0.22s ease" }}
          className="flex flex-col items-center gap-1 mb-12"
        >
          <p className="text-sm font-medium" style={{ fontFamily: "'General Sans', sans-serif", color: "var(--on-canvas)" }}>
            {t.name}
          </p>
          <p className="text-xs" style={{ fontFamily: "'General Sans', sans-serif", color: "var(--on-canvas-muted)" }}>
            {t.role}
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          <button
            onClick={prev}
            className="p-1.5 transition-colors"
            style={{ color: "var(--on-canvas-dim)" }}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => navigate(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="transition-all duration-300 bg-current rounded-full"
                style={{
                  width: i === index ? "1.5rem" : "0.4rem",
                  height: "2px",
                  color: i === index ? "var(--on-canvas)" : "var(--on-canvas-dim)",
                  display: "block",
                  borderRadius: "1px",
                }}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-1.5 transition-colors"
            style={{ color: "var(--on-canvas-dim)" }}
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Email slider ────────────────────────────────────────────────────────────

const EMAIL = "hiba@hdesign.agency";

const KNOB = 64; // knob diameter in px
const PAD  = 4;  // gap between knob edge and pill edge

function EmailSlider() {
  const [revealed, setRevealed] = useState(false);
  const pillRef = useRef<HTMLDivElement>(null);
  const [pillWidth, setPillWidth] = useState(0);

  // Measure pill width on mount and on resize
  useEffect(() => {
    const measure = () => {
      if (pillRef.current) setPillWidth(pillRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (pillRef.current) ro.observe(pillRef.current);
    return () => ro.disconnect();
  }, []);

  // Pixel offset: knob left edge at PAD (default) or right edge flush with pill
  const knobX = revealed ? pillWidth - KNOB - PAD : PAD;

  const spring = { type: "spring" as const, stiffness: 180, damping: 28, mass: 1.2 };

  return (
    <div
      ref={pillRef}
      onClick={() => setRevealed((v) => !v)}
      role="button"
      aria-label={revealed ? "Hide email address" : "Reveal email address"}
      style={{
        position: "relative",
        width: "100%",
        height: `${KNOB + PAD * 2}px`,
        borderRadius: "999px",
        background: revealed ? "var(--primary)" : "var(--canvas-alt)",
        transition: "background 0.4s ease",
        cursor: "pointer",
        userSelect: "none",
        overflow: "hidden",
      }}
    >
      {/* "Slide to reveal" label — fades out when revealed */}
      <motion.span
        animate={{ opacity: revealed ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          paddingLeft: `${KNOB + PAD * 2 + 12}px`,
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(0.65rem, 1.6vw, 0.9rem)",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--on-canvas-dim)",
          pointerEvents: "none",
        }}
      >
        Slide to reveal email
      </motion.span>

      {/* Email address — fades in centered when revealed */}
      <motion.a
        href={`mailto:${EMAIL}`}
        animate={{ opacity: revealed ? 1 : 0 }}
        transition={{ duration: 0.25, delay: revealed ? 0.18 : 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'General Sans', sans-serif",
          fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--canvas)",
          textDecoration: "none",
          pointerEvents: revealed ? "auto" : "none",
        }}
      >
        {EMAIL}
      </motion.a>

      {/* Knob — slides between PAD and (pillWidth - KNOB - PAD) */}
      <motion.div
        animate={{ x: knobX }}
        transition={spring}
        style={{
          position: "absolute",
          top: PAD,
          left: 0,
          width: KNOB,
          height: KNOB,
          borderRadius: "50%",
          background: revealed ? "var(--canvas)" : "var(--primary)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
        }}
      >
        <motion.div
          animate={{ rotate: revealed ? 180 : 0 }}
          transition={spring}
          style={{ display: "flex", color: revealed ? "var(--primary)" : "var(--canvas)" }}
        >
          <ArrowRight size={20} strokeWidth={2} />
        </motion.div>
      </motion.div>
    </div>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contact" className="py-28 px-6 md:px-12" style={{ background: "var(--canvas)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Availability indicator */}
        <div className="flex items-center gap-2.5 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span
            style={{ fontFamily: "'DM Mono', monospace" }}
            className="text-[10px] tracking-[0.22em] uppercase text-muted-foreground"
          >
            Available for select projects
          </span>
        </div>

        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-xs tracking-[0.28em] uppercase text-primary block mb-6"
        >
          Contact
        </span>

        <h2
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-5xl md:text-7xl lg:text-8xl font-normal italic leading-[0.95] text-foreground mb-10"
        >
          Let's make
          <br />
          something.
        </h2>

        <div className="mb-20">
          <EmailSlider />
        </div>

        <div className="border-t border-border pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <a
              href="https://dribbble.com/hdesign_agency"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 hover:opacity-75"
              style={{
                fontFamily: "'General Sans', sans-serif",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <DribbbleIcon size={13} />
              Dribbble
            </a>
            <a
              href="https://www.upwork.com/freelancers/~012c5c07079ecc055b?mp_source=share"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-200 hover:opacity-75"
              style={{
                fontFamily: "'General Sans', sans-serif",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <UpworkIcon size={13} />
              Upwork
            </a>
          </div>
          <span
            className="text-xs text-muted-foreground font-light"
            style={{ fontFamily: "'General Sans', sans-serif" }}
          >
            Based in Dubai · Open to remote
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-12 py-6" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[11px] text-muted-foreground"
        >
          © 2025 H Design
        </span>
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[11px] text-muted-foreground"
        >
          Designed & built with care
        </span>
      </div>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [page, setPage] = useState<"home" | "about">("home");
  const [loaderVisible, setLoaderVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("hdesign-loader-shown");
  });

  const handleLoaderFinish = useCallback(() => {
    sessionStorage.setItem("hdesign-loader-shown", "true");
    setLoaderVisible(false);
  }, []);


  // Curtain scroll tracking — drives border-radius on the WorkGrid as it rises
  const curtainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: curtainProgress } = useScroll({
    target: curtainRef,
    // scrollYProgress 0 → curtain top hits viewport bottom (just entering)
    // scrollYProgress 1 → curtain top hits viewport top (fully covering hero)
    offset: ["start end", "start start"],
  });
  const curtainClipPath = useTransform(
    curtainProgress,
    [0, 1],
    ["inset(0 0 0 0 round 20px 20px 0 0)", "inset(0 0 0 0 round 0px)"]
  );

  const goHome = useCallback(() => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const goAbout = useCallback(() => {
    setPage("about");
    setActiveSection("hero"); // clear scroll-based highlight when leaving home
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Initialize dark mode from preference / storage
  useEffect(() => {
    const stored = localStorage.getItem("portfolio-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = stored === "dark" || (!stored && prefersDark);
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  }, []);

  // Active section tracking — only meaningful on home page
  useEffect(() => {
    if (page !== "home") return;
    const ids = ["hero", "work", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [page]);

  return (
    <>
      <AnimatePresence>
        {loaderVisible && <LoadingScreen key="loader" onFinish={handleLoaderFinish} />}
      </AnimatePresence>
      {!loaderVisible && (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'General Sans', sans-serif" }}>
      <CustomCursor />
      <Nav
        isDark={isDark}
        toggleDark={toggleDark}
        activeSection={activeSection}
        page={page}
        onGoAbout={goAbout}
        onGoHome={goHome}
      />
      {page === "about" ? (
        <AboutPage onBack={goHome} />
      ) : (
        <main>
          {/*
           * Hero: sticky so it stays at the top while the curtain rises.
           * z-index: 0 keeps it in the normal stacking context (visible).
           * overflow: hidden clips the hero section to exactly 100vh.
           */}
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflow: "hidden",
              zIndex: 0,
            }}
          >
            <Hero />
          </div>

          {/*
           * Content layer at z-index: 1 slides up over the sticky hero.
           * background: var(--background) is the opaque guard — Contact and
           * Footer have no explicit bg, so this prevents the hero showing
           * through them once the curtain has fully covered it.
           * overflow: hidden is scoped only to the WorkGrid curtain so the
           * rounded corners don't clip Skills / Testimonials / Contact.
           */}
          <div style={{ position: "relative", zIndex: 1, background: "var(--canvas)" }}>
            <motion.div
              ref={curtainRef}
              style={{ clipPath: curtainClipPath }}
            >
              <WorkGrid />
            </motion.div>

            <FadeInSection><Skills /></FadeInSection>
            <FadeInSection><Approach /></FadeInSection>
            <FadeInSection><Testimonials /></FadeInSection>
            <FadeInSection><Contact /></FadeInSection>
          </div>
        </main>
      )}
      <Footer />
    </div>
      )}
    </>
  );
}
