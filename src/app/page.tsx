import NavBar from "./components/navbar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <div className="w-100 space-y-10 p-20">
        <div className="text-lg motion-duration-3000 hover:motion-text-out-ctp-teal-500">
          Hello @, World!
        </div>
        <div className="motion-blur-in-md motion-opacity-in-0 motion-translate-y-in-100 text-ctp-mauve-700 motion-duration-3000">
          a@nother <span className="italic">one@</span>
        </div>
      </div>
    </div>
  );
}
