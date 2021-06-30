import React, { useEffect, useState } from "react";
import "./address.scss";
import Alert from "./Alert";

interface PropTypes {
  setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>;
  error: string;
}

const AddressComponent: React.FC<PropTypes> = ({ setIsFormValid, error }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [streetNo, setStreetNo] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (name && surname && street && streetNo && city) setIsFormValid(true);
    else setIsFormValid(false);
  }, [name, surname, street, streetNo, city, setIsFormValid]);

  return (
    <div className='address'>
      <h2>Your Address</h2>
      <hr />
      {error && <Alert hideCloseBtn>{error}</Alert>}
      <form>
        <div className='form-row'>
          <label htmlFor='name'>Name: </label>
          <input
            type='text'
            placeholder='Name'
            id='name'
            onChange={(e) => setName(e.target.value)}
            value={name}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='surname'>Surname: </label>
          <input
            type='text'
            placeholder='Surname'
            id='surname'
            onChange={(e) => setSurname(e.target.value)}
            value={surname}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='street'>Street: </label>
          <input
            type='text'
            placeholder='Street'
            id='street'
            onChange={(e) => setStreet(e.target.value)}
            value={street}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='number'>Street Number: </label>
          <input
            type='text'
            placeholder='Street Number'
            id='number'
            onChange={(e) => setStreetNo(e.target.value)}
            value={streetNo}></input>
        </div>
        <div className='form-row'>
          <label htmlFor='city'>City: </label>
          <input
            type='text'
            placeholder='City'
            id='city'
            onChange={(e) => setCity(e.target.value)}
            value={city}></input>
        </div>
      </form>
    </div>
  );
};

export default AddressComponent;
