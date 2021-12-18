import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React from "react";
import { useParams } from "react-router";
import { Booking } from "../models/booking";
import { getBookingQuery } from "../queries/bookingQueries";
import "./BookingDetails.scss";

const BookingDetails = () => {
  const { readableId } = useParams<{ readableId: string }>();
  const { data, loading, error } = useQuery<{ getBooking: Booking }>(getBookingQuery, {
    variables: { readableId },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className='booking-details-wrapper'>
      <div>
        <h2 className='confirm'>Your booking is comfirmed!</h2>
      </div>
      <div className='booking-details'>
        <div className='name'>
          <h2 className='grey'>Name:</h2>
          <h2>{data?.getBooking.name}</h2>
        </div>
        <div className='name'>
          <h2 className='grey'>People:</h2>
          <h2>{data?.getBooking.people}</h2>
        </div>
        <div className='date'>
          <h2 className='grey'>Date:</h2>
          <h2>{format(new Date(Number(data?.getBooking.date!)), "EEEE, do MMMM Y - H:mm")}</h2>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
