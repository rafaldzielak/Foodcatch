import React, { useState } from "react";
import Modal from "react-modal";
import "./TableBooks.scss";
import DatePicker from "react-date-picker";
import { BiCalendar } from "react-icons/bi";
import addDays from "date-fns/addDays";
import Select from "react-select";
import { useMutation } from "@apollo/client";
import { createBookingMutation, getBookingQuery } from "../queries/bookingQueries";

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

interface Booking {
  people: Number;
  phone: String;
  name: String;
  date: String;
}

const TableBook = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedPeople, setSelectedPeople] = useState(2);
  const [chosenDate, setChosenDate] = useState<Date>();

  const [createBookingMut] = useMutation<{ createBooking: Booking }>(createBookingMutation);

  const showPossiblePeople = () => {
    const peopleArr: number[] = [];
    for (let i = 1; i < 12; i++) peopleArr.push(i);
    return (
      <div className='people'>
        {peopleArr.map((num) => (
          <div
            key={num}
            className={`person ${num === selectedPeople && "active"}`}
            onClick={() => setSelectedPeople(num)}>
            {num}
          </div>
        ))}
        <div className={`person ${selectedPeople === 12 && "active"}`} onClick={() => setSelectedPeople(12)}>
          More
        </div>
      </div>
    );
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const bookTableHandler = () => {
    createBookingMut({
      variables: {
        name: "Rafal",
        date: chosenDate!.toISOString(),
        people: 5,
        phone: "234723984",
      },
      refetchQueries: [{ query: getBookingQuery }],
    }).then(({ data }) => console.log(data?.createBooking));
  };

  return (
    <>
      <button className='big' onClick={openModal}>
        Book a Table
      </button>
      <Modal
        className='book-modal'
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}>
        <h2>Book a Table</h2>
        <div>How many of you will come?</div>
        {showPossiblePeople()}
        {selectedPeople === 12 && <span>Contact us directly!</span>}
        <div>Choose date</div>
        <DatePicker
          clearIcon={null}
          calendarIcon={<BiCalendar />}
          minDate={new Date()}
          maxDate={addDays(new Date(), 60)}
          minDetail={"year"}
          onChange={(e: Date) => setChosenDate(e)}
          value={chosenDate}
        />
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
          />
        </div>
        <button className='small' onClick={bookTableHandler}>
          Check Availability
        </button>
      </Modal>
    </>
  );
};

export default TableBook;
