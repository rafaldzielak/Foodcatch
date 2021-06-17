import "./order.scss";
import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { useHistory } from "react-router";

const getNumberWithTwoDecimal = (num: number) => (Math.round(num * 100) / 100).toFixed(2);

interface OrderComponentTypes {
  size?: "large" | "small";
}

export const OrderComponent: React.FC<OrderComponentTypes> = ({ size = "small" }) => {
  const history = useHistory();
  const placeOrder = () => history.push("/order");
  const { items, error } = useTypedSelector((state) => state.cart);
  console.log(items);
  const { updateCartAction } = useActions();

  return (
    <div className='order'>
      <h2>Your Order</h2>
      <hr />
      {items.map((orderItem) => (
        <>
          <div className={`order-item ${size}`}>
            <img src={orderItem.imgURL} alt='' />
            <h4 className='title'>
              {orderItem.quantity} × {orderItem.title}
            </h4>
            <h3 className='price'>{getNumberWithTwoDecimal(orderItem.price * orderItem.quantity)} zł</h3>
            <div className='quantity'>
              <span onClick={() => updateCartAction(orderItem.id, orderItem.quantity - 1)}>
                <AiFillMinusSquare />
              </span>
              <span onClick={() => updateCartAction(orderItem.id, orderItem.quantity + 1)}>
                <AiFillPlusSquare />
              </span>
            </div>
          </div>
          <hr />
        </>
      ))}
      <h3>
        Summary:{" "}
        {getNumberWithTwoDecimal(
          items.reduce<number>((acc, orderItem) => (acc += orderItem.price * orderItem.quantity), 0)
        )}{" "}
        zł
      </h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};
