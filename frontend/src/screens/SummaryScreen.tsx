import "./SummaryScreen.scss";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ProgressBar from "react-customizable-progressbar";
import moment from "moment";
import { OrderComponent } from "../components/OrderComponent";
import { Redirect } from "react-router";

const minutesForDelivery = 45;

const SummaryScreen = () => {
  const order = useTypedSelector((state) => state.order);
  const [timeElapsed, setTimeElapsed] = useState(1);

  useEffect(() => {
    let tempTimeElapsed = 1;
    const deliveryCounter = setInterval(() => {
      tempTimeElapsed++;
      if (tempTimeElapsed >= minutesForDelivery) clearInterval(deliveryCounter);
      setTimeElapsed((prev) => prev + 1);
    }, 60000);
  }, []);

  if (!order.dishes.length) return <Redirect to='/' />;

  return (
    <main>
      <div className='menu container summary'>
        <div className='flex-grow '>
          <h1>Your Order should be delivered at {moment().add(45, "minutes").format("HH:mm")}</h1>
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
        <OrderComponent size='extra large' hideButton hideAmountChooser showOrder />
      </div>
    </main>
  );
};

export default SummaryScreen;
