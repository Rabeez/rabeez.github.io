"use client";

import Modal from "@/app/registry";
import Menu from "@/app/components/menu";
import ThemeController from "@/app/components/theme_controller";
import SmoothTabs from "@/app/components/tabgroup";

export default function DesktopComponent() {
  return (
    <div className="h-full w-full overflow-hidden">
      <ThemeController />
      <div
        id="content"
        className="grid h-full min-h-full w-full min-w-full grid-cols-5 gap-0 pt-30 font-medium"
      >
        <div className="col-span-2 block h-full w-full motion-preset-focus place-content-center pl-10 motion-duration-1000">
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
        <div className="col-span-3 block h-full w-full">
          <div className="col-span-1 grid h-full w-full grid-cols-3">
            <div className="col-span-1 grid h-full grid-rows-3 place-items-center p-10">
              <Modal modal_id="machine_learning" />
              <Modal modal_id="data_viz" />
              <Modal modal_id="translator" />
            </div>
            <div className="col-span-1 grid grid-rows-4 place-items-center p-10">
              <Modal modal_id="specialized" />
              <Modal modal_id="data_pipes" />
              <Modal modal_id="causal" />
              <Modal modal_id="teaching" />
            </div>
            <div className="col-span-1 grid grid-rows-3 place-items-center p-10">
              <Modal modal_id="engineering" />
              <Modal modal_id="custom_tools" />
              <Modal modal_id="web_dev" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
