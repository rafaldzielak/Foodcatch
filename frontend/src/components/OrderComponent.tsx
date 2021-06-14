import "./order.scss";
import React from "react";

const orderMock = [
  {
    id: 1284723,
    title: "Greek Olives With Feta Filling",
    imgURL: "./img/appetizer.jpg",
    price: 9.99,
    quantity: 2,
  },
  {
    id: 1284723,
    title: "Fried Calamari With Salsa Sauce",
    imgURL: "./img/calmari.png",
    price: 14.99,
    quantity: 1,
  },
  {
    id: 1284724,
    title: "Grilled Shrimp and Chorizo",
    imgURL: "./img/shrimp.bmp",
    price: 15.99,
    quantity: 1,
  },
];
var arr = [
  { x: 1, y: "asds" },
  { x: 2, y: "asds" },
  { x: 4, y: "asds" },
];
arr.reduce((acc, obj) => acc + obj.x, 0); // 7
console.log(arr);

export const OrderComponent = () => {
  const placeOrder = () => {};
  return (
    <div className='order'>
      <h2>Your Order</h2>
      <hr />
      {orderMock.map((orderItem) => (
        <>
          <div className='order-item'>
            <img src={orderItem.imgURL} alt='' />
            <h4 className='title'>
              {orderItem.quantity} × {orderItem.title}
            </h4>
            <h3 className='price'>{orderItem.price * orderItem.quantity} zł</h3>
          </div>
          <hr />
        </>
      ))}
      <h3>
        Summary:{" "}
        {orderMock.reduce<number>((acc, orderItem) => (acc += orderItem.price * orderItem.quantity), 0)} zł
      </h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};
