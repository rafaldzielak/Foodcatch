import React from "react";
import "./ModalImg.scss";
import ModalComponent from "react-modal";

interface PropTypes {
  isOpen: boolean;
  closeAction: () => void;
}
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -70%)",
  },
};

const Modal: React.FC<PropTypes> = ({ isOpen, children, closeAction }) => {
  return (
    <div>
      <ModalComponent isOpen={isOpen} onRequestClose={closeAction} style={customStyles} ariaHideApp={false}>
        {children}
      </ModalComponent>
    </div>
  );
};

export default Modal;
