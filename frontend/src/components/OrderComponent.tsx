import "./order.scss";
import "./address.scss";
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
  showCouponInput?: boolean;
}

export const OrderComponent: React.FC<OrderComponentTypes> = ({
  size = "small",
  hideButton,
  showDelivery,
  showBackBtn,
  showOrder,
  hideAmountChooser,
  showCouponInput,
}) => {
  const history = useHistory();
  const placeOrder = () => history.push("/order");
  const { dishes } = useTypedSelector((state) => (showOrder ? state.order : state.cart));
  const { updateCartAction } = useActions();

  const applyCouponHandler = () => {
    console.log("Apply coupon");
  };

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
      {dishes.map((orderItem) => (
        <React.Fragment key={orderItem.id}>
          <FadeIn>
            <div className={`order-item ${size}`}>
              <img src={orderItem.imgURL} alt='' />
              <h4 className='title'>{orderItem.name}</h4>
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

      <div>
        {dishes.length ? (
          <>
            <div className='summary'>
              <div className='coupon'>
                {showCouponInput && (
                  <div className='form-row'>
                    <input type='text' placeholder='Coupon' id='name'></input>
                    <button onClick={applyCouponHandler}>Apply Coupon</button>
                  </div>
                )}
              </div>
              <h3>
                Summary:{" "}
                {getNumberWithTwoDecimals(
                  dishes.reduce<number>((acc, dish) => (acc += dish.price * dish.quantity), 0) +
                    (showDelivery ? 9.99 : 0)
                )}{" "}
                zł
              </h3>
            </div>
            {!hideButton && (
              <button className='big' onClick={placeOrder}>
                Continue
              </button>
            )}
          </>
        ) : (
          <h3>No items yet</h3>
        )}
      </div>
    </div>
  );
};
