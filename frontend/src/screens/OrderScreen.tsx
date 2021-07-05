import { useState } from "react";
import AddressComponent from "../components/AddressComponent";
import { OrderComponent } from "../components/OrderComponent";
import PaymentMethodChooser from "../components/PaymentMethodChooser";
import "./order-screen.scss";

const OrderScreen = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [addressError, setAddressError] = useState("");

  const handlePlaceOrder = () => {
    if (isFormValid) console.log("Place order");
    else setAddressError("Please fill in every field");
  };

  return (
    <>
      <div className='menu container mt'>
        <OrderComponent size='large' hideButton showBackBtn showDelivery />
        <div className='address-item'>
          <AddressComponent setIsFormValid={setIsFormValid} error={addressError} />
          <PaymentMethodChooser />
        </div>
      </div>
      <button onClick={handlePlaceOrder} className='wide'>
        Place Order
      </button>
    </>
  );
};

export default OrderScreen;
