import React from "react";
import "./address.scss";

const AddressComponent = () => {
  return (
    <div className='address'>
      <h2>Your Address</h2>
      <hr />
      <form>
        <div className='form-row'>
          <label htmlFor='name'>Name: </label>
          <input type='text' placeholder='Name' id='name'></input>
        </div>
        <div className='form-row'>
          <label htmlFor='surname'>Surname: </label>
          <input type='text' placeholder='Surname' id='surname'></input>
        </div>
        <div className='form-row'>
          <label htmlFor='street'>Street: </label>
          <input type='text' placeholder='Street' id='street'></input>
        </div>
        <div className='form-row'>
          <label htmlFor='number'>Street Number: </label>
          <input type='text' placeholder='Street Number' id='number'></input>
        </div>
        <div className='form-row'>
          <label htmlFor='city'>City: </label>
          <input type='text' placeholder='City' id='city'></input>
        </div>
      </form>
    </div>
  );
};

export default AddressComponent;
