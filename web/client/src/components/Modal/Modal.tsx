// src/components/Modal.tsx
import { FunctionalComponent, ComponentChildren, JSX } from "preact";
import "./modal.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ComponentChildren;
}

const Modal: FunctionalComponent<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    e: JSX.TargetedMouseEvent<HTMLDivElement>
  ) => {
    if (
      (e.target as HTMLElement).classList.contains("modal-container-overlay")
    ) {
      onClose();
    }
  };

  return (
    <div class="modal-container-overlay" onClick={handleOverlayClick}>
      <div class="modal-container-content">{children}</div>
    </div>
  );
};

export default Modal;
