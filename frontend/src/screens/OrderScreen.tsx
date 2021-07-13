import { useState } from "react";
import { useHistory } from "react-router";
import AddressComponent from "../components/AddressComponent";
import { OrderComponent } from "../components/OrderComponent";
import PaymentMethodChooser from "../components/PaymentMethodChooser";
import { useActions } from "../hooks/useActions";
import "./order-screen.scss";

export type PaymentType = "cash" | "card";

const OrderScreen = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>();
  const [addressError, setAddressError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const { placeOrderAction } = useActions();
  const history = useHistory();

  const handlePlaceOrder = () => {
    setAddressError("");
    if (isFormValid && paymentType) {
      placeOrderAction();
      history.push("/summary");
    }
    if (!paymentType) setPaymentError("Please select payment type");
    if (!isFormValid) setAddressError("Please fill in every field");
  };

  return (
    <>
      <div className='menu container mt'>
        <OrderComponent size='large' hideButton showBackBtn showDelivery />
        <div className='address-item'>
          <AddressComponent setIsFormValid={setIsFormValid} error={addressError || paymentError} />
          <PaymentMethodChooser paymentType={paymentType} setPaymentType={setPaymentType} />
        </div>
      </div>
      <button onClick={handlePlaceOrder} className='wide'>
        Place Order
      </button>
    </>
  );
};

export default OrderScreen;
