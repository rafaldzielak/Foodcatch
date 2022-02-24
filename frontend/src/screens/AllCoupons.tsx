import { useMutation, useQuery } from "@apollo/client";
import { addDays, format } from "date-fns";
import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import { BiCalendar } from "react-icons/bi";
import { FaEdit, FaTimesCircle } from "react-icons/fa";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { CouponFromDB, CouponResponse } from "../models/coupon";
import { createCouponMutation, editCouponMutation, getCouponsQuery } from "../queries/couponQueries";
import { convertStringDateToDate } from "../state/actions/OrderActions";
import { compareDates, getCurrentDateWithoutTime } from "../utils/dateFormatting";
import "./AllOrders.scss";

const AllCoupons = () => {
  const [editCouponText, setEditCoupon] = useState("");
  const [newCouponText, setNewCouponText] = useState("");
  const [discount, setDiscount] = useState(0);
  const [validUntil, setValidUntil] = useState<Date>(new Date());
  const [error, setError] = useState("");

  const { data, loading, error: getError } = useQuery<{ getCoupons: CouponResponse }>(getCouponsQuery);

  const [createCouponMut] = useMutation<{ createCoupon: CouponFromDB }>(createCouponMutation, {
    refetchQueries: [getCouponsQuery],
  });
  const [editCouponMut] = useMutation<{ editCoupon: CouponFromDB }>(editCouponMutation, {
    refetchQueries: [getCouponsQuery],
  });

  useEffect(() => {
    setEditCoupon("");
  }, [newCouponText]);

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
              <td className='admin-blue'>
                <FaEdit
                  className='pointer'
                  onClick={() => {
                    setEditCoupon(couponName);
                    setDiscount(percentage);
                    setValidUntil(new Date(Number(validUntil)));
                  }}
                />
              </td>
              <td className='danger'>
                <FaTimesCircle className='pointer' />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const createCouponHandler = () => {
    console.log(newCouponText, discount);
    if ((!newCouponText && !editCouponText) || !discount) return;
    if (editCouponText) {
      editCouponMut({ variables: { couponName: editCouponText, percentage: discount, validUntil } }).catch(
        (error) => setError(error.message)
      );
    } else {
      createCouponMut({ variables: { couponName: newCouponText, percentage: discount, validUntil } }).catch(
        (error) => setError(error.message)
      );
    }
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
          value={editCouponText || newCouponText}></input>
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
        <button onClick={createCouponHandler} className={`create wide-s ${editCouponText ? "alt" : ""}`}>
          {editCouponText ? "Edit" : "Create"} coupon
        </button>
      </div>
    </div>
  );

  if (loading) return <Loader />;
  // if (error || getError) return <Alert>{error || getError}</Alert>;

  return (
    <div className='container all-orders'>
      {(error || getError) && <Alert onClose={() => setError("")}>{error || getError}</Alert>}
      <h2 className='mt-2'>Add new coupon</h2>
      {renderCouponInputs()}

      <h2 className='mt-2'>Existing coupons</h2>
      {renderCouponsTable()}
    </div>
  );
};

export default AllCoupons;
