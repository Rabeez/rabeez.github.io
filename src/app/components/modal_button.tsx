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
        <div className="fixed top-1/10 left-3/10 modal-box h-4/5 max-w-[65%]">
          {modalContent}
        </div>
        <form
          method="dialog"
          className="modal-backdrop bg-ctp-base/30 backdrop-blur-xs"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
