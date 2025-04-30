"use client";

import { useState } from "react";
import MobileComponent from "@/app/components/mobile";
import DesktopComponent from "@/app/components/desktop";

export default function Home() {
  const [isMobile, _] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
}
