import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import Select, { OptionTypeBase } from "react-select";
import Switch from "react-switch";
import { spicyIcon, vegeIcon } from "../components/Dishes";
import useToggle from "../hooks/useToggle";
import { createDishMutation } from "../queries/dishQueries";
import { Dish } from "../state/actionInterfaces";
import "./CreateDish.scss";
import Alert from "../components/Alert";
import { Link } from "react-router-dom";

const options = [
  { value: "Appetizers", label: "Appetizers" },
  { value: "Soups", label: "Soups" },
  { value: "Main Dishes", label: "Main Dishes" },
  { value: "Desserts", label: "Desserts" },
];

const CreateDish = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [isVege, toggleIsVege] = useToggle();
  const [isSpicy, toggleIsSpicy] = useToggle();
  const [type, setType] = useState<OptionTypeBase>();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [createOrderMut] = useMutation<{ createOrder: Dish }>(createDishMutation);

  const handleAddDish = () => {
    setSuccessMessage("");
    setErrorMessage("");
    createOrderMut({
      variables: { name: title, price, description, imgURL, isVege, isSpicy, type: type?.value },
    })
      .then(() => {
        setSuccessMessage("Dish created successfully!");
        setTitle("");
        setPrice(0);
        setImgURL("");
        setDescription("");
        toggleIsSpicy(false);
        toggleIsVege(false);
      })
      .catch((error) => setErrorMessage(error.message));
  };

  const showFormInput = () => (
    <>
      <div className='container form-container'>
        <div className='select-wrapper'>
          <div className='ls-1 fs-2'>Type</div>
          <Select
            className='ls-1 select'
            value={type}
            onChange={(selectedOption) => setType(selectedOption)}
            options={options}></Select>
        </div>
        {
          <img
            className='food-img'
            src={imgURL || "https://bibliotekant.pl/wp-content/uploads/2021/04/placeholder-image.png"}
            alt={imgURL}></img>
        }
        <div className='imgURL'>
          <div className='ls-1 fs-2'>Image URL</div>
          <input type='text' className='imgURL' value={imgURL} onChange={(e) => setImgURL(e.target.value)} />
        </div>

        <div className=''>
          <div className='ls-1 fs-2'>Name</div>
          <input type='text' className='name' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className=''>
          <div className='ls-1 fs-2'>Price</div>
          <input
            type='number'
            className='phone'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className='description'>
          <div className='ls-1 fs-2'>Description</div>
          <textarea
            className='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='toggle-wrapper'>
          <div className='toggle vege'>
            <div className='ls-1 fs-2'>Vege {vegeIcon}</div>
            <Switch onChange={toggleIsVege} checked={isVege} className='react-switch' />
          </div>
          <div className='toggle spicy'>
            <div className='ls-1 fs-2'>Spicy {spicyIcon}</div>
            <Switch onChange={toggleIsSpicy} checked={isSpicy} className='react-switch' />
          </div>
        </div>
      </div>
      <hr />
    </>
  );

  return (
    <div className='container dish-create'>
      {successMessage && (
        <Alert type='success'>
          {successMessage} <Link to='/menu'>Click here to go to menu</Link>
        </Alert>
      )}
      {errorMessage && <Alert>{errorMessage}</Alert>}
      <h1 className='ls-1'>Add a dish</h1>
      {showFormInput()}
      <button onClick={handleAddDish}>Add dish</button>
    </div>
  );
};

export default CreateDish;
