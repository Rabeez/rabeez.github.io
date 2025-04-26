"use client";

import NavBar from "./components/navbar";
import ModalButton from "./components/modal_button";
import { JSX } from "react";
import SpecialModalContentAlpha from "./components/SpecialModalContentAlpha";
import SpecialModalContentBeta from "./components/SpecialModalContentBeta";

type ModalRegistry = {
  [modalId: string]: {
    Button: (props: { open: () => void }) => JSX.Element;
    Modal: JSX.Element;
  };
};

export default function Home() {
  const modals: ModalRegistry = {
    alpha: {
      Button: ({ open }) => (
        <button
          className="btn motion-preset-pulse-sm motion-delay-0"
          onClick={open}
        >
          Alpha
        </button>
      ),
      Modal: <SpecialModalContentAlpha />,
    },
    beta: {
      Button: ({ open }) => (
        <button
          className="btn motion-preset-pulse-sm motion-delay-100"
          onClick={open}
        >
          Beta
        </button>
      ),
      Modal: <SpecialModalContentBeta />,
    },
  };

  return (
    <>
      <NavBar />
      <div
        id="content"
        className="grid h-screen min-h-full w-screen min-w-full grid-cols-5 gap-0"
      >
        <div className="col-span-2 block h-full w-full bg-red-300">
          {" "}
          asdasf{" "}
        </div>
        <div className="col-span-3 block h-full w-full bg-green-300">
          {" "}
          {Object.entries(modals).map(([modalId, { Button, Modal }]) => (
            <ModalButton
              key={modalId}
              modalId={modalId}
              modalContent={Modal}
              renderButtonAction={(open) => <Button open={open} />}
            />
          ))}
        </div>
      </div>
    </>
  );
}
