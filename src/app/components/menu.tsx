import { FileUser, Github, Linkedin, NotebookPen } from "lucide-react";

export default function Menu() {
  return (
    <div className="place-items-center">
      <div className="tooltip tooltip-primary" data-tip={"Resume"}>
        <a
          href="/rabeez_riaz_cv.pdf"
          target="_blank"
          download="rabeez_riaz_cv"
          className="btn text-custom-accent btn-ghost"
        >
          <FileUser />
        </a>
      </div>
      <div className="tooltip tooltip-primary" data-tip={"Blog"}>
        <a
          href="https://rabeez.substack.com/"
          target="_blank"
          className="btn text-custom-accent btn-ghost"
        >
          <NotebookPen />
        </a>
      </div>
      <div className="tooltip tooltip-primary" data-tip={"GitHub"}>
        <a
          href="https://github.com/Rabeez/"
          target="_blank"
          className="btn text-custom-accent btn-ghost"
        >
          <Github />
        </a>
      </div>
      <div className="tooltip tooltip-primary" data-tip={"LinkedIn"}>
        <a
          href="https://www.linkedin.com/in/rabeez/"
          target="_blank"
          className="btn text-custom-accent btn-ghost"
        >
          <Linkedin />
        </a>
      </div>
    </div>
  );
}
