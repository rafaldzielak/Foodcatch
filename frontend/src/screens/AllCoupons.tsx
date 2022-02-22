import { useMutation, useQuery } from "@apollo/client";
import { addDays, format } from "date-fns";
import React, { useState } from "react";
import DatePicker from "react-date-picker";
import { BiCalendar } from "react-icons/bi";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { CouponFromDB, CouponResponse } from "../models/coupon";
import { createCouponMutation, getCouponsQuery } from "../queries/couponQueries";
import { convertStringDateToDate } from "../state/actions/OrderActions";
import { compareDates, getCurrentDateWithoutTime } from "../utils/dateFormatting";
import "./AllOrders.scss";

const AllCoupons = () => {
  const [newCouponText, setNewCouponText] = useState("");
  const [discount, setDiscount] = useState(0);
  const [validUntil, setValidUntil] = useState<Date>(new Date());

  const { data, loading, error } = useQuery<{ getCoupons: CouponResponse }>(getCouponsQuery);

  const [editOrderMut] = useMutation<{ createCoupon: CouponFromDB }>(createCouponMutation, {
    refetchQueries: [getCouponsQuery],
  });

  const renderCouponsTable = () => (
    <table>
      <thead>
        <tr>
          <th>Coupon Text</th>
          <th>Discount</th>
          <th>Valid until</th>
        </tr>
      </thead>
      <tbody>
        {data?.getCoupons?.coupons?.map((coupon) => {
          const { couponName, percentage, validUntil } = coupon;
          return (
            <tr key={couponName}>
              <td>{couponName}</td>
              <td>{percentage}</td>
              <td>{format(convertStringDateToDate(validUntil), "dd.MM.yyyy HH:mm")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const createCouponHandler = () => {
    if (!newCouponText || !discount) return;
    editOrderMut({ variables: { couponName: newCouponText, percentage: discount, validUntil } });
  };

  const renderCouponInputs = () => (
    <div className='form-row'>
      <div className='form-col'>
        <label htmlFor='new-coupon'>New Coupon: </label>
        <input
          type='text'
          placeholder='New coupon text'
          id='new-coupon'
          onChange={(e) => setNewCouponText(e.target.value)}
          value={newCouponText}></input>
      </div>
      <div className='form-col'>
        <label htmlFor='discount'>Discount (%): </label>
        <input
          type='text'
          placeholder='Discount (%)'
          id='discount'
          onChange={(e) => setDiscount(Number(e.target.value))}
          value={discount || ""}></input>
      </div>
      <div className='form-col form-col-flex'>
        <label htmlFor='discount'>Valid until: </label>
        <DatePicker
          className={"date-picker"}
          clearIcon={null}
          calendarIcon={<BiCalendar />}
          minDate={getCurrentDateWithoutTime()}
          maxDate={addDays(new Date(), 60)}
          minDetail={"year"}
          onChange={(e: Date) => setValidUntil(new Date(e.toDateString()))}
          value={compareDates(validUntil, setValidUntil)}
        />
      </div>
      <div className='form-col form-col-flex'>
        <label htmlFor='discount'> &#8205; </label>
        <button onClick={createCouponHandler} className='create'>
          Create coupon
        </button>
      </div>
    </div>
  );

  if (loading) return <Loader />;
  if (error) return <Alert>{error}</Alert>;

  return (
    <div className='container all-orders'>
      <h2 className='mt-2'>Add new coupon</h2>
      {renderCouponInputs()}

      <h2 className='mt-2'>Existing coupons</h2>
      {renderCouponsTable()}
    </div>
  );
};

export default AllCoupons;
