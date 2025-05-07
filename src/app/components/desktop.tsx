"use client";

import Menu from "@/app/components/menu";
import ThemeController from "@/app/components/theme_controller";
import SmoothTabs from "@/app/components/tabgroup";
import CustomCursor from "@/app/components/cursor";
import ExpandingGrid from "@/app/components/gridgroup";

interface DesktopProps {
  theme: "latte" | "mocha";
  handleThemeToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DesktopComponent({
  theme,
  handleThemeToggle,
}: DesktopProps) {
  return (
    <div className="z-0 h-full w-full motion-preset-focus motion-duration-1000">
      <CustomCursor />
      <div className="h-full w-full overflow-hidden">
        <ThemeController theme={theme} handleToggle={handleThemeToggle} />
        <div
          id="content"
          className="grid h-full min-h-full w-full min-w-full grid-cols-5 gap-0 pt-30 font-medium"
        >
          <div className="col-span-2 block h-full w-full motion-preset-focus place-content-center pl-10">
            <article className="prose prose-sm h-full min-h-full place-items-start lg:prose-lg">
              <h1 className="text-custom-accent">Rabeez Riaz</h1>
              <Menu />
              <h4 className="text-custom-accent italic">
                Professionally stirring a pile of Linear Algebra and Statistics.
              </h4>
              <h6 className="italic">
                <a
                  href="https://xkcd.com/1838"
                  target="_blank"
                  className="text-custom-accent no-underline"
                >
                  -- Obligatory XKCD
                </a>
              </h6>
              <SmoothTabs />
            </article>
          </div>
          <div className="col-span-3 flex h-full w-full flex-col items-center justify-center p-20">
            <ExpandingGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
