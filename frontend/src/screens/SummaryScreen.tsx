import "./SummaryScreen.scss";
import React, { useEffect, useState } from "react";
import ProgressBar from "react-customizable-progressbar";
import { OrderComponent } from "../components/OrderComponent";
import { Redirect, useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { Order } from "../models/order";
import { getOrderQuery } from "../queries/orderQueries";
import { setOrderAction } from "../state/actions/OrderActions";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { addMinutes, differenceInMinutes, format, getMinutes } from "date-fns";
import { useTypedSelector } from "../hooks/useTypedSelector";
import OrderDetails from "../components/OrderDetails";
import Alert from "../components/Alert";

const minutesForDelivery = Number(process.env.REACT_APP_MINUTES_FOR_DELIVERY);

const SummaryScreen = () => {
  const order = useTypedSelector((state) => state.order);
  const [timeElapsed, setTimeElapsed] = useState(
    getMinutes(addMinutes(order.date, minutesForDelivery).getTime())
  );

  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useDispatch();

  const {
    data: orderData,
    loading,
    error,
  } = useQuery<{ getOrder: Order }>(getOrderQuery, {
    variables: { id: orderId },
  });

  useEffect(() => {
    if (orderData) dispatch(setOrderAction(orderData.getOrder));
  }, [orderData, dispatch]);

  useEffect(() => {
    let tempTimeElapsed = differenceInMinutes(new Date(), order.date) + 1;
    setTimeElapsed(tempTimeElapsed);
    const deliveryCounter = setInterval(() => {
      tempTimeElapsed++;
      if (tempTimeElapsed >= minutesForDelivery) clearInterval(deliveryCounter);
      setTimeElapsed(tempTimeElapsed);
    }, 60000);
    return () => clearInterval(deliveryCounter);
  }, [order.date]);

  if (loading) return <Loader />;
  if (error) return <Redirect to='/' />;

  const renderPaymentAndDeliveryInfo = () => (
    <div className='flex-grow '>
      <div className='grid-justify-center'>
        <h1>Payment</h1>
        <hr />
        {!orderData?.getOrder.isPaid && orderData?.getOrder.paymentUrl && (
          <button
            className='ls-2 mt-2 wide big'
            onClick={() => {
              if (orderData?.getOrder.paymentUrl) window.location.href = orderData?.getOrder.paymentUrl;
            }}>
            Pay for Order
          </button>
        )}
        {orderData?.getOrder.isPaid && (
          <>
            <Alert wide type='success' hideCloseBtn>
              Order Paid successfully!
            </Alert>
            <hr className='mt-2' />
            <h1>Delivery</h1>
            <hr />
          </>
        )}

        {!orderData?.getOrder.isDelivered && orderData?.getOrder.isPaid && (
          <h1>
            Your Order should be delivered at {format(addMinutes(order.date, minutesForDelivery), "hh:mm")}
          </h1>
        )}

        {orderData?.getOrder.isPaid && !orderData?.getOrder.isDelivered && (
          <ProgressBar
            className='mt-2'
            radius={150}
            steps={minutesForDelivery}
            progress={order.isDelivered ? minutesForDelivery : timeElapsed}
            fillColor='#f2f2f2'
            strokeWidth={2}
            strokeColor='#656d78'
            trackStrokeWidth={2}
            pointerStrokeWidth={2}
            pointerStrokeColor='#656d78'>
            <div className='indicator-volume'>
              {timeElapsed < minutesForDelivery && !order.isDelivered ? (
                <h1 className='percentage'>{minutesForDelivery - timeElapsed} minutes left</h1>
              ) : (
                <div>
                  <h1>
                    {order.isDelivered ? "Your Order was delivered!" : "Your Order should be any minute!"}
                  </h1>
                  <span className='circle-trouble'>Having trouble? Call us at 070 8297 3841 </span>
                </div>
              )}
            </div>
          </ProgressBar>
        )}

        {orderData?.getOrder.isDelivered && (
          <Alert wide type='success' hideCloseBtn>
            Order Delivered!
          </Alert>
        )}
      </div>
    </div>
  );

  return (
    <main>
      <div className='menu container summary'>
        {renderPaymentAndDeliveryInfo()}
        <div>
          <OrderComponent size='extra large' hideButton hideAmountChooser showOrder showDelivery />
          <hr />
          <OrderDetails />
        </div>
      </div>
    </main>
  );
};

export default SummaryScreen;
