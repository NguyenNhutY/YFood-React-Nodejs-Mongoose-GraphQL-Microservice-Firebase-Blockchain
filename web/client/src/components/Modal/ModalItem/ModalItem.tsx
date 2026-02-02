import React  from "preact/hooks";
import "./modalItem.scss";
import { FunctionalComponent } from "preact";

interface ModalItemProps {
  onCloseModalItem: () => void;
  detail: string;
  metail_1: string;
  metail_2: string;
  metail_3: string;
}

const ModalItem: FunctionalComponent<ModalItemProps> = ({
  onCloseModalItem,
  detail,
  metail_1,
  metail_2,
  metail_3,
}) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      e.target instanceof HTMLDivElement &&
      e.target.classList.contains("item-overlay")
    ) {
      onCloseModalItem();
    }
  };

  return (
    <div class='item-overlay' onClick={handleOverlayClick}>
      <div class='item-container'>
        <p>{detail}</p>
        <ul class='item-content'>
          <li>{metail_1}</li>
          <li>{metail_2}</li>
          <li>{metail_3}</li>
        </ul>
      </div>
    </div>
  );
};

export default ModalItem;
