import { JSX } from "react";
import SpecialModalContentAlpha from "./components/SpecialModalContentAlpha";
import SpecialModalContentBeta from "./components/SpecialModalContentBeta";
import ModalButton from "./components/modal_button";

type ModalRegistry = {
  [modalId: string]: {
    Button: (props: { open: () => void }) => JSX.Element;
    Modal: JSX.Element;
    Header: JSX.Element;
  };
};

// key: HTML ID of modal
// value:
//    Button: content of button
//    Modal: content of modal
const btn_classes = "btn motion-preset-pulse-sm";
const modals: ModalRegistry = {
  alpha: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-0"} onClick={open}>
        Alpha
      </button>
    ),
    Modal: <SpecialModalContentAlpha />,
    Header: (
      <>
        <h1>ALPHA asdfdsa</h1>
      </>
    ),
  },
  beta: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Beta
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>BETA asdfdsa</h1>
      </>
    ),
  },
};

function make_modal(modal_id: string): JSX.Element {
  let Btn = modals[modal_id].Button;
  return (
    <ModalButton
      key={modal_id}
      modalId={modal_id}
      modalContent={modals[modal_id].Modal}
      modalHeader={modals[modal_id].Header}
      renderButtonAction={(open) => <Btn open={open} />}
    />
  );
}

export default make_modal;
