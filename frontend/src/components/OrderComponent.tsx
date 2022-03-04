import "./order.scss";
import "./address.scss";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useActions";
import { AiFillMinusSquare, AiFillPlusSquare } from "react-icons/ai";
import { MdKeyboardBackspace } from "react-icons/md";
import { useHistory } from "react-router";
import FadeIn from "react-fade-in";
import { useLazyQuery } from "@apollo/client";
import { useCouponQuery } from "../queries/orderQueries";
import { Coupon } from "../models/coupon";
import Alert from "./Alert";

const getNumberWithTwoDecimals = (num: number) => (Math.round(num * 100) / 100).toFixed(2);

interface OrderComponentTypes {
  size?: "small" | "large" | "extra large";
  hideButton?: boolean;
  showDelivery?: boolean;
  showBackBtn?: boolean;
  showOrder?: boolean;
  hideAmountChooser?: boolean;
  showCouponInput?: boolean;
  setCouponApplied?: Dispatch<SetStateAction<string>>;
  orderCommentsInput?: string;
  setOrderCommentsInput?: Dispatch<SetStateAction<string>>;
}

export const OrderComponent: React.FC<OrderComponentTypes> = ({
  size = "small",
  hideButton,
  showDelivery,
  showBackBtn,
  showOrder,
  hideAmountChooser,
  showCouponInput,
  setCouponApplied,
  orderCommentsInput,
  setOrderCommentsInput,
}) => {
  const history = useHistory();
  const placeOrder = () => history.push("/order");
  const { dishes } = useTypedSelector((state) => (showOrder ? state.order : state.cart));
  const order = useTypedSelector((state) => state.order);
  const { updateCartAction } = useActions();
  const [couponInput, setCouponInput] = useState("");
  const [couponAppliedPercentage, setCouponAppliedPercentage] = useState(0);

  const [fetchCoupon, { loading, data, error: couponError }] =
    useLazyQuery<{ useCoupon: Coupon }>(useCouponQuery);

  const applyCouponHandler = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault();
    fetchCoupon({ variables: { couponApplied: couponInput } });
  };

  useEffect(() => {
    if (showOrder && order.couponAppliedPercentage) setCouponAppliedPercentage(order.couponAppliedPercentage);
  }, [order, showOrder]);

  useEffect(() => {
    if (data?.useCoupon) {
      setCouponAppliedPercentage(data.useCoupon.couponAppliedPercentage);
      if (setCouponApplied) setCouponApplied(data.useCoupon.couponApplied);
    }
  }, [data, setCouponApplied]);

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
          <FadeIn transitionDuration={500}>
            <h3>Coupon Applied: {couponAppliedPercentage}%</h3>
            <h3>
              Final Price:{" "}
              {getNumberWithTwoDecimals((priceWithoutCoupon * (100 - couponAppliedPercentage)) / 100)} zł
            </h3>
          </FadeIn>
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
      {showCouponInput && (
        <div className='mt-2 mx-2'>
          <h3>Comments On the Order</h3>
          <textarea
            name=''
            id=''
            rows={2}
            value={orderCommentsInput}
            onChange={(e) => {
              if (setOrderCommentsInput) setOrderCommentsInput(e.target.value);
            }}></textarea>
        </div>
      )}
      <div className='summary'>
        {showCouponInput && (
          <div className='coupon'>
            <form className='form-row' onSubmit={applyCouponHandler}>
              <input
                type='text'
                placeholder='Coupon'
                id='name'
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}></input>
              <button>Apply Coupon</button>
            </form>
            {couponError && !loading && (
              <Alert fadeOutSeconds={3} hideCloseBtn>
                {couponError.message}
              </Alert>
            )}
            {couponAppliedPercentage !== 0 && !loading && (
              <Alert fadeOutSeconds={3} hideCloseBtn type='success'>
                Coupon Applied!
              </Alert>
            )}
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
