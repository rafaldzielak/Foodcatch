import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Alert from "../components/Alert";
import { OrderComponent } from "../components/OrderComponent";
import PaymentMethodChooser from "../components/PaymentMethodChooser";
import { useActions } from "../hooks/useActions";
import useLocalStorage from "../hooks/useLocalStorage";
import FadeIn from "react-fade-in";
import "../components/address.scss";
import "./order-screen.scss";
import { useMutation } from "@apollo/client";
import { createOrderMutation } from "../queries/orderQueries";
import { Order } from "../models/order";
import { useTypedSelector } from "../hooks/useTypedSelector";

export type PaymentType = "cash" | "card";

const OrderScreen = () => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>();
  const [addressError, setAddressError] = useState("");
  const [paymentError, setPaymentError] = useState("");

  const [name, setName] = useLocalStorage("addressFirstName", "");
  const [surname, setSurname] = useLocalStorage("addressSurname", "");
  const [street, setStreet] = useLocalStorage("addressStreet", "");
  const [streetNo, setStreetNo] = useLocalStorage("addressStreetNo", "");
  const [city, setCity] = useLocalStorage("addressCity", "");
  const [phone, setPhone] = useLocalStorage("addressPhone", "");

  const { placeOrderAction } = useActions();
  const history = useHistory();

  const { items: cartItems } = useTypedSelector((state) => state.cart);

  const [createOrderMut] = useMutation<{ createOrder: Order }>(createOrderMutation);

  useEffect(() => {
    if (name && surname && street && streetNo && city && phone) setIsFormValid(true);
    else setIsFormValid(false);
  }, [name, surname, street, streetNo, city, phone, setIsFormValid]);

  const handlePlaceOrder = () => {
    setAddressError("");
    if (!paymentType) setPaymentError("Please select payment type");
    if (!isFormValid) setAddressError("Please fill in every field");
    if (!isFormValid || !paymentType) return;
    createOrderMut({
      variables: {
        firstName: name,
        surname,
        date: new Date().toISOString(),
        phone,
        dishes: cartItems,
        street,
        streetNumber: streetNo,
        city,
        paymentMethod: paymentType,
      },
    }).then(({ data }) => {
      console.log(data?.createOrder);
      history.push(`/summary/${data?.createOrder.id}`);
      if (data) placeOrderAction(data.createOrder);
    });
  };

  const showAddressFields = () => (
    <div className='address'>
      <h2>Your Address</h2>
      <hr />
      {(addressError || paymentError) && (
        <FadeIn>
          <Alert hideCloseBtn>{addressError || paymentError}</Alert>
        </FadeIn>
      )}
      <form>
        <div className='form-row'>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            placeholder='Name'
            id='name'
            onChange={(e) => setName(e.target.value)}
            value={name}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='surname'>Surname: </label>
          <input
            type='text'
            placeholder='Surname'
            id='surname'
            onChange={(e) => setSurname(e.target.value)}
            value={surname}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='street'>Street: </label>
          <input
            type='text'
            placeholder='Street'
            id='street'
            onChange={(e) => setStreet(e.target.value)}
            value={street}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='number'>Street Number: </label>
          <input
            type='text'
            placeholder='Street Number'
            id='number'
            onChange={(e) => setStreetNo(e.target.value)}
            value={streetNo}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='city'>City: </label>
          <input
            type='text'
            placeholder='City'
            id='city'
            onChange={(e) => setCity(e.target.value)}
            value={city}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='city'>Phone: </label>
          <input
            type='text'
            placeholder='Phone'
            id='phone'
            onChange={(e) => setPhone(e.target.value)}
            value={phone}></input>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <div className='menu container mt'>
        <OrderComponent size='large' hideButton showBackBtn showDelivery showCouponInput />
        <div className='address-item'>
          {showAddressFields()}
          <PaymentMethodChooser paymentType={paymentType} setPaymentType={setPaymentType} />
        </div>
      </div>
      <button onClick={handlePlaceOrder} className='wide big'>
        Place Order
      </button>
    </>
  );
};

export default OrderScreen;
