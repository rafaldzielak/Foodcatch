import React, { useState } from "react";
import "./ModalImg.scss";
import Modal from "./Modal";

interface PropTypes {
  imgUrl: string;
  closeAction: () => void;
}

const ModalImg: React.FC<PropTypes> = ({ imgUrl, closeAction }) => {
  const [modalIsOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
    closeAction();
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} closeAction={closeModal}>
        <img src={imgUrl} alt='' />
      </Modal>
    </div>
  );
};

export default ModalImg;
