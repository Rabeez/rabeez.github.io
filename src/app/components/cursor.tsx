"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - 12);
      y.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], #theme-switcher, .grid_btn_custom',
        )
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], #theme-switcher, .grid_btn_custom',
        )
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-70"
      style={{
        x,
        y,
        borderRadius: "9999px",
      }}
      animate={{
        width: isHovering ? 24 : 16,
        height: isHovering ? 24 : 16,
        backgroundColor: isHovering
          ? "var(--color-primary)"
          : "var(--color-neutral)",
      }}
      transition={{
        width: { type: "spring", stiffness: 500, damping: 30 },
        height: { type: "spring", stiffness: 500, damping: 30 },
        backgroundColor: { duration: 0.3 },
      }}
    />
  );
}
