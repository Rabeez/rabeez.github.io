import { JSX } from "react";
import SpecialModalContentAlpha from "./components/SpecialModalContentAlpha";
import SpecialModalContentBeta from "./components/SpecialModalContentBeta";

type ModalRegistry = {
  [modalId: string]: {
    Button: (props: { open: () => void }) => JSX.Element;
    Modal: JSX.Element;
  };
};

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

export default modals;
