import "./SummaryScreen.scss";
import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import ProgressBar from "react-customizable-progressbar";
import moment from "moment";

const minutesForDelivery = 10;

const SummaryScreen = () => {
  const order = useTypedSelector((state) => state.order);
  console.log(order);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let tempTimeElapsed = 1;
    const deliveryCounter = setInterval(() => {
      if (tempTimeElapsed >= minutesForDelivery) clearInterval(deliveryCounter);
      tempTimeElapsed++;
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
  }, []);

  return (
    <main>
      <h1>Your Order should be delivered at {moment().add(45, "minutes").format("HH:mm")}</h1>
      <div className='container grid-center'>
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
              <h1 className='percentage'>{minutesForDelivery - timeElapsed} minutes</h1>
            ) : (
              <div>
                <h1>Your Order should be any minute!</h1>
                <span className='circle-trouble'>Having trouble? Call us at 070 8297 3841 </span>
              </div>
            )}
          </div>
        </ProgressBar>
      </div>
    </main>
  );
};

export default SummaryScreen;
