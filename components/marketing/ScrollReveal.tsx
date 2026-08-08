"use client";
import { useEffect, useRef, ReactNode } from "react";

export default function ScrollReveal({ children, className = "", delay = 0, direction = "up", duration = 0.7 }: { children: ReactNode; className?: string; delay?: number; direction?: "up" | "down" | "left" | "right"; duration?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "translate(0,0)"; obs.unobserve(el); } }, { threshold: 0.08 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  const initial = direction === "up" ? "translateY(40px)" : direction === "down" ? "translateY(-40px)" : direction === "left" ? "translateX(40px)" : "translateX(-40px)";
  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: initial, transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`, willChange: "opacity,transform" }}>
      {children}
    </div>
  );
}
