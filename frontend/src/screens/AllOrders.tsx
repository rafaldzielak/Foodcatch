import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { OrdersResponse } from "../models/order";
import { getOrdersQuery } from "../queries/orderQueries";
import { convertStringDateToDate } from "../state/actions/OrderActions";
import "./AllOrders.scss";
import ReactPaginate from "react-paginate";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import useDebounce from "../hooks/useDebounce";

const AllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idValue, setIdValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");

  const email = useDebounce<string>(emailValue, 500);
  const id = useDebounce<string>(idValue, 500);
  const firstName = useDebounce<string>(firstNameValue, 500);
  const surname = useDebounce<string>(surnameValue, 500);
  const phone = useDebounce<string>(phoneValue, 500);

  const { data, loading, error, refetch } = useQuery<{ getOrders: OrdersResponse }>(getOrdersQuery, {
    variables: { page: currentPage },
  });

  useEffect(() => {
    refetch({ page: currentPage, email, id, firstName, surname, phone });
  }, [currentPage, refetch, email, id, firstName, surname, phone]);

  const renderOrdersTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Date</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Dishes</th>
          <th>Payment</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {data?.getOrders?.orders.map((order) => {
          const {
            id,
            email,
            date,
            firstName,
            surname,
            phone,
            dishes,
            paymentMethod,
            city,
            street,
            streetNumber,
          } = order;
          return (
            <tr key={order.id}>
              <td>{id}</td>
              <td>{email}</td>
              <td>{format(convertStringDateToDate(date), "dd.MM.yyyy hh:mm")}</td>
              <td>{`${firstName} ${surname}`}</td>
              <td>{phone}</td>
              <td>{dishes.length}</td>
              <td>{paymentMethod[0].toUpperCase() + paymentMethod.substring(1)}</td>
              <td>{`${street} ${streetNumber}, ${city}`}</td>
              <td>
                <Link to={`/summary/${id}`}>
                  <button>Details</button>
                </Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderFilterInputs = () => (
    <>
      <div className='form-row'>
        <div className='form-col'>
          <label htmlFor='id'>ID: </label>
          <input
            type='text'
            placeholder='ID'
            id='id'
            onChange={(e) => setIdValue(e.target.value)}
            value={idValue}></input>
        </div>
        <div className='form-col'>
          <label htmlFor='email'>Email: </label>
          <input
            type='text'
            placeholder='Email'
            id='email'
            onChange={(e) => setEmailValue(e.target.value)}
            value={emailValue}></input>
        </div>
        <div className='form-col'>
          <label htmlFor='name'>First name: </label>
          <input
            type='text'
            placeholder='Name'
            id='name'
            onChange={(e) => setFirstNameValue(e.target.value)}
            value={firstNameValue}></input>
        </div>
        <div className='form-col'>
          <label htmlFor='surname'>Surname: </label>
          <input
            type='text'
            placeholder='Surname'
            id='surname'
            onChange={(e) => setSurnameValue(e.target.value)}
            value={surnameValue}></input>
        </div>
        <div className='form-col'>
          <label htmlFor='phone'>Phone: </label>
          <input
            type='text'
            placeholder='Phone'
            id='phone'
            onChange={(e) => setPhoneValue(e.target.value)}
            value={phoneValue}></input>
        </div>
      </div>
    </>
  );

  if (loading) return <Loader />;
  return (
    <div className='container all-orders'>
      {error && <Alert hideCloseBtn>{error.message}</Alert>}
      {data && (
        <>
          {renderFilterInputs()}
          {renderOrdersTable()}
          <ReactPaginate
            className='react-paginate'
            breakLabel='...'
            previousLabel={<HiOutlineChevronLeft />}
            nextLabel={<HiOutlineChevronRight />}
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            initialPage={currentPage - 1}
            pageRangeDisplayed={5}
            pageCount={data.getOrders.allPages}
          />
        </>
      )}
    </div>
  );
};

export default AllOrders;
