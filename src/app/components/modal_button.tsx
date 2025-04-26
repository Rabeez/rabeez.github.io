"use client";

type ModalButtonProps = {
  modalId: string;
  modalContent: React.ReactNode;
  modalHeader: React.ReactNode;
  renderButtonAction: (onClick: () => void) => React.ReactNode;
};

export default function ModalButton({
  modalId,
  modalContent,
  modalHeader,
  renderButtonAction,
}: ModalButtonProps) {
  const openModal = () => {
    (document.getElementById(modalId) as HTMLDialogElement)?.showModal();
  };

  return (
    <>
      {renderButtonAction(openModal)}
      <dialog id={modalId} className="modal">
        <div className="fixed top-1/10 left-3/10 modal-box h-4/5 max-w-[65%] overflow-visible">
          <div className="relative -translate-x-2/5 translate-y-100">
            {modalHeader}
          </div>
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
