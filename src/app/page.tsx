"use client";

import { useEffect, useState } from "react";
import MobileComponent from "@/app/components/mobile";
import DesktopComponent from "@/app/components/desktop";
import ShaderBackground from "@/app/components/shader_bg";

// TODO: Move this to types.ts and use across all files
type Theme = "mocha" | "latte";

export default function Home() {
  const [isMobile, _] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  const default_theme: Theme = "mocha";
  const other_theme: Theme = default_theme === "mocha" ? "latte" : "mocha";

  const [theme, setTheme] = useState<Theme>(default_theme);
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log("toggling");
    setTheme(e.target.checked ? other_theme : default_theme);
  };

  return (
    <>
      <ShaderBackground
        theme={theme}
        debug={false}
        forceVisible={false}
        zIndex={0}
      />
      {isMobile ? (
        <MobileComponent theme={theme} handleThemeToggle={handleToggle} />
      ) : (
        <DesktopComponent theme={theme} handleThemeToggle={handleToggle} />
      )}
    </>
  );
}
