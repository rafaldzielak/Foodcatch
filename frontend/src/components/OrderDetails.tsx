import { format } from "date-fns";
import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./OrderDetails.scss";
import { AiOutlineCalendar, AiOutlinePhone } from "react-icons/ai";
import { BsPerson, BsPinMap } from "react-icons/bs";
import { MdOutlineLocationCity, MdOutlinePayment } from "react-icons/md";

const ICON_SIZE = "1.75rem";

const Address = () => {
  const order = useTypedSelector((state) => state.order);
  return (
    <div>
      <div className='address-order'>
        <h2>Order Details</h2>
        <div className='grid order-details'>
          <p>
            <AiOutlineCalendar size={ICON_SIZE} /> <b>Date: </b> {format(order.date, "dd.MM.yyyy hh:mm")}
          </p>
          <p>
            <AiOutlinePhone size={ICON_SIZE} /> <b>Phone: </b> {order.phone}
          </p>
          <p>
            <BsPerson size={ICON_SIZE} /> <b>Name: </b> {order.firstName} {order.surname}
          </p>
          <p>
            <BsPinMap size={ICON_SIZE} /> <b>Street: </b> {order.street} {order.streetNumber}
          </p>
          <p>
            <MdOutlineLocationCity size={ICON_SIZE} /> <b>City: </b> {order.city}
          </p>
          <p>
            <MdOutlinePayment size={ICON_SIZE} /> <b>Payment: </b>{" "}
            {order.paymentMethod[0].toUpperCase() + order.paymentMethod.substr(1)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Address;
