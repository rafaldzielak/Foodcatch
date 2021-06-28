import React from "react";
import "./ModalImg.scss";
import Modal from "react-modal";

interface PropTypes {
  imgUrl: string;
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

const ModalImg: React.FC<PropTypes> = ({ imgUrl, closeAction }) => {
  const [modalIsOpen, setIsOpen] = React.useState(true);

  function closeModal() {
    setIsOpen(false);
    closeAction();
  }

  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
        <img src={imgUrl} alt='' />
      </Modal>
    </div>
  );
};

export default ModalImg;
