"use client";

import NavBar from "./components/navbar";
import ModalButton from "./components/modal_button";
import modals from "./registry";

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
          {Object.entries(modals).map(
            ([modalId, { Button, Modal, Header }]) => (
              <ModalButton
                key={modalId}
                modalId={modalId}
                modalContent={Modal}
                modalHeader={Header}
                renderButtonAction={(open) => <Button open={open} />}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
}
