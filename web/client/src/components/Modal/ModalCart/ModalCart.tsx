import React  from "preact/hooks";
import "./modalCart.scss";
import { FunctionalComponent } from "preact";

interface ModalCartProps {
  onClose: () => void;
  children: React.ReactNode;
}

const ModalCart: FunctionalComponent<ModalCartProps> = ({ onClose, children }) => {
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div class='modal-overlay' onClick={handleOverlayClick}>
      <div class='modal'>
        <button class='modal-close' onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalCart;
