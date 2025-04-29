import { FileUser, Github, Linkedin, NotebookPen } from "lucide-react";

export default function Menu() {
  return (
    <div className="place-items-center">
      <div className="tooltip-neutral tooltip" data-tip={"Resume"}>
        <button className="btn btn-ghost">
          <FileUser />
        </button>
      </div>
      <div className="tooltip-neutral tooltip" data-tip={"Blog"}>
        <button className="btn btn-ghost">
          <NotebookPen />
        </button>
      </div>
      <div className="tooltip-neutral tooltip" data-tip={"GitHub"}>
        <button className="btn btn-ghost">
          <Github />
        </button>
      </div>
      <div className="tooltip-neutral tooltip" data-tip={"LinkedIn"}>
        <button className="btn btn-ghost">
          <Linkedin />
        </button>
      </div>
    </div>
  );
}
