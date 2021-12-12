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
import Address from "../components/OrderDetails";

const minutesForDelivery = 45;

const SummaryScreen = () => {
  const order = useTypedSelector((state) => state.order);
  const [timeElapsed, setTimeElapsed] = useState(
    getMinutes(addMinutes(order.date, minutesForDelivery).getTime())
  );

  const { orderId } = useParams<{ orderId: string }>();
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery<{ getOrder: Order }>(getOrderQuery, {
    variables: { id: orderId },
  });

  useEffect(() => {
    if (data) dispatch(setOrderAction(data.getOrder));
  }, [data, dispatch]);

  useEffect(() => {
    let tempTimeElapsed = differenceInMinutes(addMinutes(order.date, minutesForDelivery - 1), new Date());
    const deliveryCounter = setInterval(() => {
      tempTimeElapsed++;
      if (tempTimeElapsed >= minutesForDelivery) clearInterval(deliveryCounter);
      setTimeElapsed((prev) => prev + 1);
    }, 60000);
  }, [order]);

  if (loading) return <Loader />;

  if (error) return <Redirect to='/' />;

  return (
    <main>
      <div className='menu container summary'>
        <div className='flex-grow '>
          <h1>
            Your Order should be delivered at {format(addMinutes(order.date, minutesForDelivery), "hh:mm")}
          </h1>
          <div className='grid-justify-center'>
            <ProgressBar
              radius={150}
              steps={minutesForDelivery}
              progress={timeElapsed}
              fillColor='#f2f2f2'
              strokeWidth={2}
              strokeColor='#656d78'
              trackStrokeWidth={2}
              pointerStrokeWidth={2}
              pointerStrokeColor='#656d78'>
              <div className='indicator-volume'>
                {timeElapsed < minutesForDelivery ? (
                  <h1 className='percentage'>{minutesForDelivery - timeElapsed} minutes left</h1>
                ) : (
                  <div>
                    <h1>Your Order should be any minute!</h1>
                    <span className='circle-trouble'>Having trouble? Call us at 070 8297 3841 </span>
                  </div>
                )}
              </div>
            </ProgressBar>
          </div>
        </div>
        <div>
          <OrderComponent size='extra large' hideButton hideAmountChooser showOrder />
          <hr />
          <Address />
        </div>
      </div>
    </main>
  );
};

export default SummaryScreen;
