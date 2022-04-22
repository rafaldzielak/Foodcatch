import { format } from "date-fns";
import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "./OrderDetails.scss";
import { AiOutlineCalendar, AiOutlinePhone, AiOutlineMail, AiOutlineFieldNumber } from "react-icons/ai";
import { BsPerson, BsPinMap } from "react-icons/bs";
import { MdOutlineLocationCity, MdOutlinePayment } from "react-icons/md";
import { BiCommentError } from "react-icons/bi";

const OrderDetails = () => {
  const order = useTypedSelector((state) => state.order);
  return (
    <div>
      <div className='address-order'>
        <h2>Order Details</h2>
        <div className='grid order-details'>
          <p>
            <AiOutlineFieldNumber /> <b>ID: </b> {order.id}
          </p>
          <p>
            <AiOutlineCalendar /> <b>Date: </b> {format(order.date, "dd.MM.yyyy HH:mm")}
          </p>
          <p>
            <AiOutlinePhone /> <b>Phone: </b> {order.phone}
          </p>
          <p>
            <AiOutlineMail /> <b>Email: </b> {order.email}
          </p>
          <p>
            <BsPerson /> <b>Name: </b> {order.firstName} {order.surname}
          </p>
          <p>
            <BsPinMap /> <b>Street: </b> {order.street} {order.streetNumber}
          </p>
          <p>
            <MdOutlineLocationCity /> <b>City: </b> {order.city}
          </p>
          <p>
            <MdOutlinePayment /> <b>Payment: </b>{" "}
            {order.paymentMethod[0].toUpperCase() + order.paymentMethod.substr(1)}
          </p>
        </div>
        {order.notes && (
          <div>
            <p>
              <BiCommentError /> <b>Order comments:</b>
            </p>
            {order.notes}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
