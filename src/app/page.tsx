"use client";

import NavBar from "./components/navbar";
import make_modal from "./registry";

export default function Home() {
  return (
    <>
      <NavBar />
      <div
        id="content"
        className="grid h-screen min-h-full w-screen min-w-full grid-cols-5 gap-0"
      >
        <div className="col-span-2 block h-full w-full bg-red-300">asdasf</div>
        <div className="col-span-3 block h-full w-full bg-green-300">
          <div className="col-span-1 grid h-full w-full grid-cols-3">
            <div className="col-span-1 grid grid-rows-3 place-items-center p-10">
              {make_modal("alpha")}
              {make_modal("beta")}
              {make_modal("beta")}
            </div>
            <div className="col-span-1 grid grid-rows-4 place-items-center p-10">
              {make_modal("alpha")}
              {make_modal("beta")}
              {make_modal("beta")}
              {make_modal("beta")}
            </div>
            <div className="col-span-1 grid grid-rows-3 place-items-center p-10">
              {make_modal("alpha")}
              {make_modal("beta")}
              {make_modal("beta")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
