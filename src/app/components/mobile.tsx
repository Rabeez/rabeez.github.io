"use client";

import ThemeController from "@/app/components/theme_controller";
import SmoothTabs from "@/app/components/tabgroup";
import MenuMobile from "@/app/components/menu_mobile";
import MobileAccordion from "@/app/components/accordion";

interface MobileProps {
  theme: "latte" | "mocha";
  handleThemeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function MobileComponent({
  theme,
  handleThemeToggle,
}: MobileProps) {
  return (
    <div className="z-0 h-full w-full motion-preset-focus p-2 motion-duration-1000">
      <ThemeController theme={theme} handleToggle={handleThemeToggle} />
      <div id="content_mobile" className="h-full w-full font-semibold">
        <article className="prose prose-sm lg:prose-lg">
          <h1 className="text-custom-accent">Rabeez Riaz</h1>
          <MenuMobile />
          <h4 className="text-custom-accent italic">
            Professionally stirring a pile of Linear Algebra and Statistics.
          </h4>
          <h6 className="italic">
            <a
              href="https://m.xkcd.com/1838"
              target="_blank"
              className="text-custom-accent no-underline"
            >
              -- Obligatory XKCD
            </a>
          </h6>
        </article>
        <div className="flex h-fit w-full flex-col">
          <SmoothTabs />
          <div className="mt-8"></div>
          <MobileAccordion />
        </div>
      </div>
    </div>
  );
}
