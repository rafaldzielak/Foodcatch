import React from "react";
import "./Alert.scss";
import { IoMdClose } from "react-icons/io";
import FadeIn from "react-fade-in";

interface PropTypes {
  hideCloseBtn?: boolean;
  type?: "danger" | "warning" | "info";
  closeModal?: () => {};
}

const Alert: React.FC<PropTypes> = ({ hideCloseBtn, type = "danger", children }) => {
  return (
    <FadeIn>
      <div className={`alert alert-${type}`}>
        {children}

        <div className='close-btn'>{!hideCloseBtn && <IoMdClose />}</div>
      </div>
    </FadeIn>
  );
};

export default Alert;
