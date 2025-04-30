import { JSX } from "react";
import ModalButton from "./components/modal_button";
import SpecialModalContentAlpha from "./components/modals/SpecialModalContentAlpha";
import SpecialModalContentBeta from "./components/modals/SpecialModalContentBeta";

type ModalId =
  | "machine_learning"
  | "data_viz"
  | "translator"
  | "specialized"
  | "data_pipes"
  | "causal"
  | "teaching"
  | "engineering"
  | "custom_tools"
  | "web_dev";
type ModalRegistry = {
  [K in ModalId]: {
    Button: (props: { open: () => void }) => JSX.Element;
    Modal: JSX.Element;
    Header: JSX.Element;
  };
};

// key: HTML ID of modal
// value:
//    Button: content of button
//    Modal: content of modal
const btn_classes = "btn motion-preset-pulse-sm h-40 w-60";
const modals: ModalRegistry = {
  machine_learning: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-0"} onClick={open}>
        Machine Learning
      </button>
    ),
    Modal: <SpecialModalContentAlpha />,
    Header: (
      <>
        <h1>Machine Learning</h1>
      </>
    ),
  },
  data_viz: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Data Visualization &amp; Reporting
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Data Visualization &amp; Reporting</h1>
      </>
    ),
  },
  translator: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Analytical Translation
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Analytical Translation</h1>
      </>
    ),
  },
  specialized: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Specialized Analytics
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Specialized Analytics</h1>
      </>
    ),
  },
  data_pipes: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Data Pipelines
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Data Pipelines</h1>
      </>
    ),
  },
  causal: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Causal Inference
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Causal Inference</h1>
      </>
    ),
  },
  teaching: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Teaching
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Teaching</h1>
      </>
    ),
  },
  engineering: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Engineering
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Engineering</h1>
      </>
    ),
  },
  custom_tools: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Custom Tooling
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Custom Tooling</h1>
      </>
    ),
  },
  web_dev: {
    Button: ({ open }) => (
      <button className={btn_classes + " motion-delay-100"} onClick={open}>
        Web Development
      </button>
    ),
    Modal: <SpecialModalContentBeta />,
    Header: (
      <>
        <h1>Web Development</h1>
      </>
    ),
  },
} as const;

interface ModalProps {
  modal_id: ModalId;
}

export default function Modal({ modal_id }: ModalProps) {
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
