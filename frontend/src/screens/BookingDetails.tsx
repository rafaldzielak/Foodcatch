import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Booking } from "../models/booking";
import { getBookingQuery } from "../queries/bookingQueries";

const BookingDetails = () => {
  const { readableId } = useParams<{ readableId: string }>();
  console.log(readableId);
  const { data, loading, error } = useQuery<{ getBooking: Booking }>(getBookingQuery, {
    variables: { readableId },
  });
  console.log(data);

  useEffect(() => {}, []);

  return <div>AAA</div>;
};

export default BookingDetails;
