import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const springConfig = { stiffness: 400, damping: 28, mass: 0.4 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onEnter = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) setHovered(true);
    };
    const onLeave = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [role='button']")) setHovered(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [mouseX, mouseY, visible]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        zIndex: 9999,
        pointerEvents: "none",
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: "var(--primary)",
      }}
      animate={{ scale: hovered ? 3.5 : 1, opacity: hovered ? 0.9 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    />
  );
}
