import { FileUser, Github, Linkedin, NotebookPen } from "lucide-react";

export default function Menu() {
  return (
    <div className="place-items-center">
      <div className="tooltip tooltip-primary" data-tip={"Resume"}>
        <button className="btn text-ctp-mauve-600 btn-ghost">
          <FileUser />
        </button>
      </div>
      <div className="tooltip tooltip-primary" data-tip={"Blog"}>
        <button className="btn text-ctp-mauve-600 btn-ghost">
          <NotebookPen />
        </button>
      </div>
      <div className="tooltip tooltip-primary" data-tip={"GitHub"}>
        <button className="btn text-ctp-mauve-600 btn-ghost">
          <Github />
        </button>
      </div>
      <div className="tooltip tooltip-primary" data-tip={"LinkedIn"}>
        <button className="btn text-ctp-mauve-600 btn-ghost">
          <Linkedin />
        </button>
      </div>
    </div>
  );
}
