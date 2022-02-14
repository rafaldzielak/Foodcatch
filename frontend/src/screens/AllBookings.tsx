import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { convertStringDateToDate } from "../state/actions/OrderActions";
import "./AllOrders.scss";
import ReactPaginate from "react-paginate";
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import useDebounce from "../hooks/useDebounce";
import ReactTooltip from "react-tooltip";
import { BookingsResponse } from "../models/booking";
import { getBookingsQuery } from "../queries/bookingQueries";
import useToggle from "../hooks/useToggle";

const AllBookings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [idValue, setIdValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [peopleValue, setPeopleValue] = useState<number>(0);
  const [getPast, togglePast] = useToggle();

  const email = useDebounce<string>(emailValue);
  const id = useDebounce<string>(idValue);
  const name = useDebounce<string>(nameValue);
  const phone = useDebounce<string>(phoneValue);
  const people = useDebounce<number>(peopleValue);

  const { data, loading, error, refetch } = useQuery<{ getBookings: BookingsResponse }>(getBookingsQuery, {
    variables: { page: currentPage, email, id, name, phone, people, getPast },
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);
  console.log(data);

  useEffect(() => {
    console.log("REFETCH");
    refetch({ page: 1 });
  }, [email, id, name, phone, refetch, peopleValue, getPast]);

  const renderOrdersTable = () => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Readable ID</th>
          <th>Email</th>
          <th>Date</th>
          <th>Name</th>
          <th>Phone</th>
          <th>People</th>
        </tr>
      </thead>
      <tbody>
        {data?.getBookings?.bookings?.map((order) => {
          const { id, email, date, name, people, phone, readableId } = order;
          return (
            <tr key={id}>
              <td>{id}</td>
              <td>{readableId}</td>
              <td className='email'>{email}</td>
              <td>{format(convertStringDateToDate(date), "dd.MM.yyyy HH:mm")}</td>
              <td className='name'>{name}</td>
              <td>{phone}</td>
              <td>{people}</td>

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
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            placeholder='Name'
            id='name'
            onChange={(e) => setNameValue(e.target.value)}
            value={nameValue}></input>
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
        <div className='form-col'>
          <label htmlFor='people'>People: </label>
          <input
            type='number'
            placeholder='People'
            id='people'
            onChange={(e) => setPeopleValue(Number(e.target.value))}
            value={peopleValue || ""}></input>
        </div>
        <div className='form-col'>
          <label htmlFor='past'>Display past: </label>
          <input
            type='checkbox'
            id='past'
            className='get-past'
            onChange={() => togglePast()}
            checked={getPast}></input>
        </div>
      </div>
    </>
  );

  if (loading) return <Loader />;
  return (
    <div className='container all-orders'>
      {renderFilterInputs()}
      {error && <Alert hideCloseBtn>{error.message}</Alert>}
      {data && !error && (
        <>
          <h1>{getPast ? "Past bookings:" : "Planned bookings:"}</h1>
          {renderOrdersTable()}
          <ReactPaginate
            className='react-paginate'
            breakLabel='...'
            previousLabel={<HiOutlineChevronLeft />}
            nextLabel={<HiOutlineChevronRight />}
            onPageChange={(event) => setCurrentPage(event.selected + 1)}
            initialPage={currentPage - 1}
            pageRangeDisplayed={5}
            pageCount={data.getBookings.allPages}
          />
        </>
      )}
      <ReactTooltip effect='solid' />
    </div>
  );
};

export default AllBookings;
