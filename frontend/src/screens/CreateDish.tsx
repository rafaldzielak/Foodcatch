import { useLazyQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Select, { OptionTypeBase } from "react-select";
import Switch from "react-switch";
import Alert from "../components/Alert";
import { bestsellerIcon, newIcon, spicyIcon, vegeIcon } from "../components/Dishes";
import Loader from "../components/Loader";
import useToggle from "../hooks/useToggle";
import {
  createDishMutation,
  deleteDishMutation,
  editDishMutation,
  getDishesQuery,
  getDishQuery,
} from "../queries/dishQueries";
import { Dish } from "../state/actionInterfaces";
import "./CreateDish.scss";

const options = [
  { value: "Appetizers", label: "Appetizers" },
  { value: "Soups", label: "Soups" },
  { value: "Main Dishes", label: "Main Dishes" },
  { value: "Desserts", label: "Desserts" },
];

const CreateDish = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [imgURL, setImgURL] = useState("");
  const [isVege, toggleIsVege] = useToggle();
  const [isSpicy, toggleIsSpicy] = useToggle();
  const [isNew, toggleIsNew] = useToggle();
  const [isBestseller, toggleIsBestseller] = useToggle();
  const [type, setType] = useState<OptionTypeBase>();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = useParams<{ id: string }>();

  const [fetchDish, { loading, error }] = useLazyQuery<{ getDish: Dish }>(getDishQuery);

  useEffect(() => {
    if (id) {
      fetchDish({ variables: { id } }).then((response) => {
        setTitle(response.data?.getDish.name || "");
        setImgURL(response.data?.getDish.imgURL || "");
        setPrice(response.data?.getDish.price || 0);
        setDescription(response.data?.getDish.description || "");
        toggleIsVege(response.data?.getDish.isVege);
        toggleIsSpicy(response.data?.getDish.isSpicy);
        toggleIsNew(response.data?.getDish.isNew);
        toggleIsBestseller(response.data?.getDish.isBestseller);
        const type = response.data?.getDish.type;
        setType({ value: type, label: type });
      });
    }
  }, [fetchDish, id, toggleIsBestseller, toggleIsNew, toggleIsSpicy, toggleIsVege]);

  const [createDishMut] = useMutation<{ createOrder: Dish }>(createDishMutation);
  const [editDishMut] = useMutation<{ createOrder: Dish }>(editDishMutation, {
    refetchQueries: [getDishesQuery, getDishQuery],
  });
  const [deleteDishMut] = useMutation<{ deleteDish: Pick<Dish, "id"> }>(deleteDishMutation, {
    refetchQueries: [getDishesQuery, getDishQuery],
  });

  const handleAddDish = () => {
    setSuccessMessage("");
    setErrorMessage("");
    createDishMut({
      variables: {
        name: title,
        price,
        description,
        imgURL,
        isVege,
        isSpicy,
        isNew,
        isBestseller,
        type: type?.value,
      },
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

  const handleEditDish = () => {
    setSuccessMessage("");
    setErrorMessage("");
    editDishMut({
      variables: {
        id,
        name: title,
        price,
        description,
        imgURL,
        isVege,
        isSpicy,
        isNew,
        isBestseller,
        type: type?.value,
      },
    })
      .then(() => setSuccessMessage("Dish edited successfully!"))
      .catch((error) => setErrorMessage(error.message));
  };

  const handleRemoveDish = () => {
    setSuccessMessage("");
    setErrorMessage("");
    deleteDishMut({
      variables: { id },
    })
      .then(() => {
        setSuccessMessage("Dish removed successfully!");
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
            value={price || ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className='description'>
          <div className='ls-1 fs-2'>Description (add description to more or less fit the area below)</div>
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
          <div className='toggle vege'>
            <div className='ls-1 fs-2'>New {newIcon}</div>
            <Switch onChange={toggleIsNew} checked={isNew} className='react-switch' />
          </div>
          <div className='toggle spicy'>
            <div className='ls-1 fs-2'>Bestseller {bestsellerIcon}</div>
            <Switch onChange={toggleIsBestseller} checked={isBestseller} className='react-switch' />
          </div>
        </div>
      </div>
      <hr />
      <button
        onClick={() => {
          if (id) handleEditDish();
          else handleAddDish();
        }}
        className={id ? "mr-1" : ""}>
        {id ? "Edit" : "Add"} dish
      </button>
      {id && (
        <button className='bg-error' onClick={handleRemoveDish}>
          Remove dish
        </button>
      )}
    </>
  );

  return (
    <div className='container dish-create'>
      <Helmet>
        <title>Add a Dish | Admin | FoodCatch</title>
      </Helmet>
      {successMessage && (
        <Alert type='success'>
          {successMessage} <Link to='/menu'>Click here to go to menu</Link>
        </Alert>
      )}
      {errorMessage && <Alert>{errorMessage}</Alert>}
      <h1 className='ls-1'>{id ? "Edit" : "Add"} a dish</h1>
      {error && <Alert>{error.message}</Alert>}
      {loading && !error ? <Loader /> : showFormInput()}
    </div>
  );
};

export default CreateDish;
