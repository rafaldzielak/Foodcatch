import "./order.scss";
import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { MdKeyboardBackspace } from "react-icons/md";
import { useHistory } from "react-router";
import FadeIn from "react-fade-in";

const getNumberWithTwoDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2);

interface OrderComponentTypes {
  size?: "small" | "large" | "extra large";
  hideButton?: boolean;
  showDelivery?: boolean;
  showBackBtn?: boolean;
  showOrder?: boolean;
  hideAmountChooser?: boolean;
}

export const OrderComponent: React.FC<OrderComponentTypes> = ({
  size = "small",
  hideButton,
  showDelivery,
  showBackBtn,
  showOrder,
  hideAmountChooser,
}) => {
  const history = useHistory();
  const placeOrder = () => history.push("/order");
  const { items } = useTypedSelector((state) => (showOrder ? state.order : state.cart));
  const { updateCartAction } = useActions();
  console.log(items);

  return (
    <div className={`order ${size}`}>
      <nav className='order-nav'>
        {showBackBtn ? (
          <button className='small' onClick={() => history.push("/menu")}>
            <MdKeyboardBackspace style={{ fontSize: "1.5rem" }} /> Back to Menu
          </button>
        ) : (
          <p />
        )}
        <h2>Your Order</h2>
      </nav>
      <hr />
      {items.map((orderItem) => (
        <React.Fragment key={orderItem.id}>
          <FadeIn>
            <div className={`order-item ${size}`}>
              <img src={orderItem.imgURL} alt='' />
              <h4 className='title'>{orderItem.title}</h4>
              {!hideAmountChooser && (
                <div className='quantity'>
                  <span onClick={() => updateCartAction(orderItem.id, orderItem.quantity - 1)}>
                    <AiFillMinusSquare />
                  </span>
                  <span className='number noselect'>{orderItem.quantity}</span>
                  <span onClick={() => updateCartAction(orderItem.id, orderItem.quantity + 1)}>
                    <AiFillPlusSquare />
                  </span>
                </div>
              )}
              <h3 className='price'>{getNumberWithTwoDecimals(orderItem.price * orderItem.quantity)} zł</h3>
            </div>
          </FadeIn>
          <hr />
        </React.Fragment>
      ))}
      {showDelivery && (
        <FadeIn>
          <div className={`order-item ${size}`}>
            <h4 className='title'>Delivery</h4>
            <h3 className='price'>9,99 zł</h3>
            <div className='quantity'></div>
          </div>
          <hr />
        </FadeIn>
      )}

      <h3>
        {items.length ? (
          <div>
            Summary:{" "}
            {getNumberWithTwoDecimals(
              items.reduce<number>((acc, orderItem) => (acc += orderItem.price * orderItem.quantity), 0) +
                (showDelivery ? 9.99 : 0)
            )}{" "}
            zł
            <p>
              {!hideButton && (
                <button className='big' onClick={placeOrder}>
                  Place Order
                </button>
              )}
            </p>
          </div>
        ) : (
          "No items yet"
        )}
      </h3>
    </div>
  );
};
