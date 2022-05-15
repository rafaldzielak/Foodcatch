import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { Order, OrdersResponse } from "../models/order";
import {
  deleteOrderMutation,
  editOrderMutation,
  getOrderQuery,
  getOrdersQuery,
} from "../queries/orderQueries";
import { convertStringDateToDate } from "../state/actions/OrderActions";
import "./AllOrders.scss";
import ReactPaginate from "react-paginate";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import useDebounce from "../hooks/useDebounce";
import { BsCheckSquareFill } from "react-icons/bs";
import { MdMoped } from "react-icons/md";
import { FaCheck, FaInfo, FaTimes, FaTrash } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import ReactTooltip from "react-tooltip";

const AllOrders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idValue, setIdValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [surnameValue, setSurnameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const tooltipRef = useRef<HTMLParagraphElement>(null);

  const email = useDebounce<string>(emailValue);
  const id = useDebounce<string>(idValue);
  const firstName = useDebounce<string>(firstNameValue);
  const surname = useDebounce<string>(surnameValue);
  const phone = useDebounce<string>(phoneValue);

  const { data, loading, error, refetch } = useQuery<{ getOrders: OrdersResponse }>(getOrdersQuery, {
    variables: { page: currentPage },
  });

  const [editOrderMut] = useMutation<{ editOrder: Order }>(editOrderMutation, {
    refetchQueries: [getOrdersQuery, getOrderQuery],
  });

  const [deleteOrderMut] = useMutation<{ editOrder: Order }>(deleteOrderMutation, {
    refetchQueries: [getOrdersQuery, getOrderQuery],
  });

  useEffect(() => {
    refetch({ page: currentPage, email, id, firstName, surname, phone });
  }, [currentPage, refetch, email, id, firstName, surname, phone]);

  const handleDeliverOrder = (id: string) => editOrderMut({ variables: { id, isDelivered: true } });
  const handleDeleteOrder = (id: string) => deleteOrderMut({ variables: { id } });

  const renderOrdersTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>Date</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Dishes</th>
          <th>Payment</th>
          <th>Notes</th>
          <th>Paid</th>
          <th>Delivered</th>
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
            isPaid,
            isDelivered,
            notes,
          } = order;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td className='email'>{email}</td>
              <td>{format(convertStringDateToDate(date), "dd.MM.yyyy HH:mm")}</td>
              <td className='name'>{`${firstName} ${surname}`}</td>
              <td>{phone}</td>
              <td className='address'>{`${street} ${streetNumber}, ${city}`}</td>
              <td>{dishes.length}</td>
              <td>{paymentMethod[0].toUpperCase() + paymentMethod.substring(1)}</td>
              <td>{notes && <FaInfo className='info' data-tip={notes} />}</td>
              <td>{isPaid ? <BsCheckSquareFill className='success' /> : <FaTimes className='danger' />}</td>
              <td>
                {isDelivered ? <BsCheckSquareFill className='success' /> : <FaTimes className='danger' />}
              </td>
              <td>
                <button
                  className={isDelivered ? "disabled" : ""}
                  data-tip='Mark as delivered'
                  onClick={() => handleDeliverOrder(id)}>
                  <MdMoped />
                  <HiCheck />
                </button>
              </td>
              <td>
                <Link to={`/summary/${id}`}>
                  <button>Details</button>
                </Link>
              </td>
              <td>
                <button className='cursor-standard' data-tip data-for={id}>
                  <>
                    <ReactTooltip id={id} effect='solid' delayHide={300} delayShow={300}>
                      <h4 className='mb-1'>Are you sure to delete this order?</h4>
                      <FaCheck
                        data-event={"click focus"}
                        onClick={() => handleDeleteOrder(id)}
                        className='border-white p-1 success pointer'
                      />
                    </ReactTooltip>
                    <FaTrash className='danger-light' />
                  </>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const renderFilterInputs = () => (
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
  );

  if (loading) return <Loader />;
  return (
    <div className='container all-orders'>
      {renderFilterInputs()}
      {error && <Alert hideCloseBtn>{error.message}</Alert>}
      {data && !error && (
        <>
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
      <ReactTooltip effect='solid' />
    </div>
  );
};

export default AllOrders;
