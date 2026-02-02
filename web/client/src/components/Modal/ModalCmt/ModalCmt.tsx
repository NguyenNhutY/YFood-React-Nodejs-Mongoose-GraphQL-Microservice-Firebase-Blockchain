import React  from "preact/hooks";
import "./modalCmt.scss";
import { FunctionalComponent } from "preact";

interface ModalCmtProps {
  onCloseModalCmt: () => void;
}

const ModalCmt: FunctionalComponent<ModalCmtProps> = ({ onCloseModalCmt }) => {
  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains("cmt-overlay")) {
      onCloseModalCmt();
    }
  };

  return (
    <div class='cmt-overlay' onClick={handleOverlayClick}>
      <div class='cmt-container'>
        <h2>Rating</h2>
        {/* Add additional content here as needed */}
      </div>
    </div>
  );
};

export default ModalCmt;
