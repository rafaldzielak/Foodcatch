import React, { useState } from "react";
import Modal from "react-modal";
import "./TableBooks.scss";

const customStyles = {
  content: {
    // top: "35%",
    // left: "50%",
    // right: "auto",
    // bottom: "auto",
    // marginRight: "-50%",
    // transform: "translate(-50%, -50%)",
  },
};

const TableBook = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [selectedPeople, setSelectedPeople] = useState(2);

  const showPossiblePeople = () => {
    const peopleArr: number[] = [];
    for (let i = 1; i < 13; i++) peopleArr.push(i);
    return (
      <div className='people'>
        {peopleArr.map((num) => (
          <div
            className={`person ${num === selectedPeople && "active"}`}
            onClick={() => setSelectedPeople(num)}>
            {num}
            {num === peopleArr.length && "+"}
          </div>
        ))}
      </div>
    );
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={openModal}>Book a Table</button>
      <Modal
        className='book-modal'
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}>
        <h2>Book a Table</h2>
        <div>How many of you will come?</div>
        {showPossiblePeople()}
      </Modal>
    </>
  );
};

export default TableBook;
