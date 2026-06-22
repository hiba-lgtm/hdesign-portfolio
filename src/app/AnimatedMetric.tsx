import { useState, useEffect } from "react";

export default function AnimatedMetric({ metric, isInView }: { metric: string; isInView: boolean }) {
  const match = metric.match(/^(\+?)(\d+)(.*)$/);
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match ? match[3] : metric;

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setDisplay(0);
      return;
    }

    const duration = 1300;
    const startTime = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target]);

  if (!match) return <>{metric}</>;
  return <>{prefix}{display}{suffix}</>;
}
