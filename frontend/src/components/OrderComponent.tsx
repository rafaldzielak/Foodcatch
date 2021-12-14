import "./order.scss";
import "./address.scss";
import React, { useState } from "react";
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
  const [couponInput, setCouponInput] = useState("");
  const [couponAppliedPercentage, setCouponAppliedPercentage] = useState(0);

  const applyCouponHandler = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    if (couponInput === "test20") setCouponAppliedPercentage(20);
    console.log("Apply coupon");
  };

  const showPriceSummary = () => {
    const priceWithoutCoupon =
      dishes.reduce<number>((acc, dish) => (acc += dish.price * dish.quantity), 0) +
      (showDelivery ? 9.99 : 0);
    return (
      <div className='final-price'>
        <h3 className={`${couponAppliedPercentage && "grey"}`}>
          Summary: {getNumberWithTwoDecimals(priceWithoutCoupon)} zł
        </h3>
        {couponAppliedPercentage !== 0 && (
          <>
            <h3>Coupon Applied: {couponAppliedPercentage}%</h3>
            <h3>
              Final Price:{" "}
              {getNumberWithTwoDecimals((priceWithoutCoupon * (100 - couponAppliedPercentage)) / 100)} zł
            </h3>
          </>
        )}
      </div>
    );
  };
  const showDishes = () =>
    dishes.map((orderItem) => (
      <React.Fragment key={orderItem.id + orderItem.name}>
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
    ));

  const showDeliveryIfApplicable = () =>
    showDelivery && (
      <FadeIn>
        <div className={`order-item ${size}`}>
          <h4 className='title'>Delivery</h4>
          <h3 className='price'>9,99 zł</h3>
          <div className='quantity'></div>
        </div>
        <hr />
      </FadeIn>
    );

  const showSummaryArea = () => (
    <>
      <div className='summary'>
        {showCouponInput && (
          <div className='coupon'>
            <form className='form-row' onClick={applyCouponHandler}>
              <input
                type='text'
                placeholder='Coupon'
                id='name'
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}></input>
              <button>Apply Coupon</button>
            </form>
          </div>
        )}
        {showPriceSummary()}
      </div>
      {!hideButton && (
        <button className='big' onClick={placeOrder}>
          Continue
        </button>
      )}
    </>
  );

  const showBackBtnIfApplicable = () =>
    showBackBtn && (
      <button className='small' onClick={() => history.push("/menu")}>
        <MdKeyboardBackspace style={{ fontSize: "1.5rem" }} /> Back to Menu
      </button>
    );

  return (
    <div className={`order ${size}`}>
      <nav className='order-nav'>
        {showBackBtnIfApplicable()}
        <h2>Your Order</h2>
      </nav>
      <hr />
      {showDishes()}
      {showDeliveryIfApplicable()}

      <div>{dishes.length ? showSummaryArea() : <h3>No items yet</h3>}</div>
    </div>
  );
};
