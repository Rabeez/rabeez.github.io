"use client";

import { useState } from "react";
import MobileComponent from "@/app/components/mobile";
import DesktopComponent from "@/app/components/desktop";
import ShaderBackground from "@/app/components/shader_bg";

export default function Home() {
  const [isMobile, _] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  return (
    <>
      <ShaderBackground debug={false} forceVisible={false} zIndex={0} />
      {isMobile ? <MobileComponent /> : <DesktopComponent />}
    </>
  );
}
