"use client";

import { FileUser, Github, Linkedin, NotebookPen } from "lucide-react";
import ThemeController from "./theme_controller";

export default function NavBar() {
  return (
    <>
      <div className="navbar motion-preset-focus motion-duration-1000">
        <div className="flex-1">
          <a className="btn text-xl btn-ghost">Rabeez Riaz</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              {/* TODO: make tooltip enter/exit transitions faster */}
              <div
                className="tooltip-neutral tooltip tooltip-bottom"
                data-tip={"Resume"}
              >
                <a>
                  <FileUser />
                </a>
              </div>
            </li>
            <li>
              <div
                className="tooltip-neutral tooltip tooltip-bottom"
                data-tip={"Blog"}
              >
                <a>
                  <NotebookPen />
                </a>
              </div>
            </li>
            <li>
              <div
                className="tooltip-neutral tooltip tooltip-bottom"
                data-tip={"GitHub"}
              >
                <a>
                  <Github />
                </a>
              </div>
            </li>
            <li>
              <div
                className="tooltip-neutral tooltip tooltip-bottom"
                data-tip={"LinkedIn"}
              >
                <a>
                  <Linkedin />
                </a>
              </div>
            </li>
            <li>
              <ThemeController />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
