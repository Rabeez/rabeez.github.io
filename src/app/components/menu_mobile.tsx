"use client";

import { FileUser, Github, Linkedin, NotebookPen } from "lucide-react";

export default function MenuMobile() {
  return (
    <div className="flex w-full flex-row place-items-center gap-4 space-x-0">
      <a
        href="/rabeez_riaz_cv.pdf"
        target="_blank"
        download="rabeez_riaz_cv"
        className="btn shrink basis-xs p-0 text-custom-accent btn-ghost"
      >
        <FileUser />
        Resume
      </a>
      <a
        href="https://rabeez.substack.com/"
        target="_blank"
        className="btn shrink basis-xs p-0 text-custom-accent btn-ghost"
      >
        <NotebookPen />
        Blog
      </a>
      <a
        href="https://github.com/Rabeez/"
        target="_blank"
        className="btn shrink basis-xs p-0 text-custom-accent btn-ghost"
      >
        <Github />
        GitHub
      </a>
      <a
        href="https://www.linkedin.com/in/rabeez/"
        target="_blank"
        className="btn shrink basis-xs p-0 text-custom-accent btn-ghost"
      >
        <Linkedin />
        LinkedIn
      </a>
    </div>
  );
}
