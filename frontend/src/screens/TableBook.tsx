import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./TableBooks.scss";
import DatePicker from "react-date-picker";
import { BiCalendar } from "react-icons/bi";
import addDays from "date-fns/addDays";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { createBookingMutation, getBookingQuery } from "../queries/bookingQueries";
import Message from "../components/Message";
import useLocalStorage from "../hooks/useLocalStorage";
import { Booking } from "../models/booking";
import { useHistory } from "react-router";
import { add } from "date-fns";

const hours = [
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
];
const minutes = [
  { value: "00", label: "00" },
  { value: "30", label: "30" },
];

const getCurrentDateWithoutTime = () => new Date(new Date().setHours(0, 0, 0, 0));

const TableBook = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedPeople, setSelectedPeople] = useLocalStorage("selectedPeople", 2);
  const [chosenDate, setChosenDate] = useLocalStorage<Date>("selectedDate", getCurrentDateWithoutTime());
  const [chosenHours, setChosenHours] = useLocalStorage<number>("chosenHours");
  const [chosenMinutes, setChosenMinutes] = useLocalStorage<number>("chosenMinutes");
  const [guestName, setGuestName] = useLocalStorage<string>("guestName");
  const [guestPhone, setGuestPhone] = useLocalStorage<string>("guestPhone");
  const [error, setError] = useState("");
  const [warning, setWarning] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (selectedPeople === 12) setWarning("Please contact us directly for more than 11 people.");
    else setWarning("");
  }, [selectedPeople]);

  const [createBookingMut] = useMutation<{ createBooking: Booking }>(createBookingMutation);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);

  const showNameAndPhoneInput = () => (
    <>
      <div className='name-phone'>
        <div className='name'>
          <div>Enter your name</div>
          <input
            type='text'
            className='name'
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
          />
        </div>
        <div className='phone'>
          <div>Enter your phone number</div>
          <input
            type='text'
            className='phone'
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
          />
        </div>
      </div>
      <hr />
    </>
  );

  const showPossiblePeople = () => {
    const peopleArr: number[] = [];
    for (let i = 1; i < 12; i++) peopleArr.push(i);
    return (
      <>
        <div>How many of you will come?</div>
        <div className='people'>
          {peopleArr.map((num) => (
            <div
              key={num}
              className={`person ${num === selectedPeople && "active"}`}
              onClick={() => setSelectedPeople(num)}>
              {num}
            </div>
          ))}
          <div
            className={`person ${selectedPeople === 12 && "active"}`}
            onClick={() => setSelectedPeople(12)}>
            More
          </div>
        </div>
        {selectedPeople === 12 && <span>Contact us directly!</span>}
        <hr />
      </>
    );
  };

  const compareDates = () => {
    const currentDate = getCurrentDateWithoutTime();
    if (chosenDate >= currentDate) return chosenDate;
    setChosenDate(currentDate);
    return currentDate;
  };

  const showDateAndTimeChooser = () => (
    <div className='date-time'>
      <div>
        <div>Choose date</div>
        <DatePicker
          clearIcon={null}
          calendarIcon={<BiCalendar />}
          minDate={getCurrentDateWithoutTime()}
          maxDate={addDays(new Date(), 60)}
          minDetail={"year"}
          onChange={(e: Date) => setChosenDate(new Date(e.toDateString()))}
          value={compareDates()}
        />
      </div>
      <div className='time-select-wrapper'>
        <div>Choose time</div>
        <div className='time-select'>
          <Select
            className='select'
            options={hours}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            placeholder='hour'
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                text: "#777",
                primary25: "#ddd",
                primary: "#aaa",
              },
            })}
            onChange={(e) => setChosenHours(Number(e?.value))}
          />
          <Select
            className='select'
            options={minutes}
            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
            placeholder='minutes'
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                text: "orangered",
                primary25: "#ddd",
                primary: "#aaa",
              },
            })}
            onChange={(e) => setChosenMinutes(Number(e?.value))}
          />
        </div>
      </div>
    </div>
  );

  const bookTableHandler = () => {
    if (
      !selectedPeople ||
      !chosenDate ||
      !chosenHours ||
      chosenMinutes === null ||
      !guestName ||
      !guestPhone
    ) {
      setWarning("");
      setError("Please fill in all fields to proceed.");
      return;
    }

    setError("");
    const date = add(chosenDate, { hours: chosenHours, minutes: chosenMinutes }).toString();
    createBookingMut({
      variables: { name: guestName, date, people: selectedPeople, phone: guestPhone },
      refetchQueries: [{ query: getBookingQuery }],
    })
      .then(({ data }) => history.push(`/book/${data?.createBooking.readableId}`))
      .catch((error) => setError(error.message));
  };

  return (
    <>
      <button className='big' onClick={openModal}>
        Book a Table
      </button>
      <Modal
        className='book-modal'
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        onAfterClose={() => {
          setError("");
          setWarning("");
        }}>
        <h2>Book a Table</h2>
        <hr />
        {error && <Message type='error' text={error} />}
        {!error && warning && <Message type='warning' text={warning} />}
        {showNameAndPhoneInput()}
        {showPossiblePeople()}
        {showDateAndTimeChooser()}
        <button className='small' onClick={bookTableHandler}>
          Book a Table
        </button>
      </Modal>
    </>
  );
};

export default TableBook;
