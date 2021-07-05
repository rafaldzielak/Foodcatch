import React, { useState } from "react";
import "./PaymentMethodChooser.scss";
import { IoCashOutline } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";

type PaymentType = "cash" | "card";

const PaymentMethodChooser = () => {
  const [paymentType, setPaymentType] = useState<PaymentType>();
  return (
    <div>
      <hr />
      <h2 className='choose-payment'>Please choose payment method</h2>
      <hr />
      <div
        className={`payment-method ${paymentType === "cash" ? "active" : ""}`}
        onClick={() => setPaymentType("cash")}>
        <IoCashOutline /> <h3>Cash</h3> <div></div>
      </div>
      <div
        className={`payment-method ${paymentType === "card" ? "active" : ""}`}
        onClick={() => setPaymentType("card")}>
        <FaRegCreditCard /> <h3>Card</h3> <div></div>
      </div>
    </div>
  );
};

export default PaymentMethodChooser;
