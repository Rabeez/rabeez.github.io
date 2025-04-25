"use client";

type ModalButtonProps = {
  modalId: string;
  modalContent: React.ReactNode;
  renderButtonAction: (onClick: () => void) => React.ReactNode;
};

export default function ModalButton({
  modalId,
  modalContent,
  renderButtonAction,
}: ModalButtonProps) {
  const openModal = () => {
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      {renderButtonAction(openModal)}
      <dialog id={modalId} className="modal">
        <div className="modal-box">{modalContent}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
