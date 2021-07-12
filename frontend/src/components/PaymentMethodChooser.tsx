import React from "react";
import "./PaymentMethodChooser.scss";
import { IoCashOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";
import { PaymentType } from "../screens/OrderScreen";

interface PropTypes {
  paymentType: PaymentType | undefined;
  setPaymentType: (type: PaymentType) => void;
}

const PaymentMethodChooser: React.FC<PropTypes> = ({ paymentType, setPaymentType }) => {
  return (
    <div>
      <hr />
      <h2 className='choose-payment'>Please choose payment method</h2>
      <hr />
      <div
        className={`payment-method ${paymentType === "cash" ? "active" : ""}`}
        onClick={() => setPaymentType("cash")}>
        <IoCashOutline className='cash' /> <h3>Cash</h3>
      </div>
      <div
        className={`payment-method ${paymentType === "card" ? "active" : ""}`}
        onClick={() => setPaymentType("card")}>
        <FaRegCreditCard className='card' /> <h3>Card</h3>
      </div>
    </div>
  );
};

export default PaymentMethodChooser;
