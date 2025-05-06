"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Create a spring-animated scale value
  const scale = useSpring(1, {
    stiffness: 700,
    damping: 15,
  });

  const make_radius = function (isHovering: boolean) {
    return isHovering ? 12 : 8;
  };
  const make_offset = function (isHovering: boolean) {
    return isHovering ? 15 : 2;
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - make_radius(isHovering) - make_offset(isHovering));
      y.set(e.clientY - make_radius(isHovering) - make_offset(isHovering));
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], #theme-switcher, .grid_btn_custom, .grid_backdrop_custom',
        )
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(
          'a, button, [role="button"], #theme-switcher, .grid_btn_custom, .grid_backdrop_custom',
        )
      ) {
        setIsHovering(false);
      }
    };

    const handleMouseClick = (e: MouseEvent) => {
      if (e.button !== 0) return; // Only handle left-click

      // Set clicking state to true
      setIsClicking(true);

      // Animate the scale down
      scale.set(0.7);

      // After a short delay, reset the scale and clicking state
      setTimeout(() => {
        scale.set(1);
        setIsClicking(false);
      }, 150);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.addEventListener("click", handleMouseClick);
    };
  }, [x, y, scale]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] border-1 border-neutral-500 opacity-70"
      style={{
        x,
        y,
        scale,
        borderRadius: "9999px",
      }}
      animate={{
        width: make_radius(isHovering) * 2,
        height: make_radius(isHovering) * 2,
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
