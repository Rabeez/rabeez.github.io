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
        <button className="btn" onClick={open}>
          Alpha
        </button>
      ),
      Modal: <SpecialModalContentAlpha />,
    },
    beta: {
      Button: ({ open }) => (
        <button className="btn" onClick={open}>
          Beta
        </button>
      ),
      Modal: <SpecialModalContentBeta />,
    },
  };

  return (
    <div>
      <NavBar />
      <div className="p-4">
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
  );
}
