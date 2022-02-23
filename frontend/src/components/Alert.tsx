import React, { useEffect, useState } from "react";
import "./Alert.scss";
import { IoMdClose } from "react-icons/io";
import FadeIn from "react-fade-in";

interface PropTypes {
  hideCloseBtn?: boolean;
  type?: "danger" | "warning" | "info" | "success";
  onClose?: () => void;
  fadeOutSeconds?: number;
}

const Alert: React.FC<PropTypes> = ({ hideCloseBtn, type = "danger", children, fadeOutSeconds, onClose }) => {
  const [returnEmpty, setReturnEmpty] = useState(false);

  useEffect(() => {
    if (fadeOutSeconds) {
      const timer = setTimeout(() => {
        setReturnEmpty(true);
      }, fadeOutSeconds * 1000);
      return () => clearTimeout(timer);
    }
  }, [fadeOutSeconds]);

  if (returnEmpty) return <> </>;
  return (
    <FadeIn>
      <div className={`alert alert-${type} ls-1`}>
        {children}

        {!hideCloseBtn && (
          <div className='close-btn' onClick={() => (onClose ? onClose() : setReturnEmpty(true))}>
            <IoMdClose />
          </div>
        )}
      </div>
    </FadeIn>
  );
};

export default Alert;
