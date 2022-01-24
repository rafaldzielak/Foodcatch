import React, { useEffect } from "react";
import "./dishes.scss";
import ReactTooltip from "react-tooltip";
import { useActions } from "../hooks/useActions";
import { dishType } from "../screens/MenuScreen";
import { useState } from "react";
import ModalImg from "./ModalImg";
import { useQuery } from "@apollo/client";
import { Dish } from "../state/actionInterfaces";
import { getDishesQuery } from "../queries/dishQueries";
import Loader from "./Loader";
import Alert from "./Alert";
import { getDishesAction } from "../state/actions/DishActions";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Link } from "react-router-dom";

interface PropTypes {
  chosenType: dishType;
}

export const vegeIcon = (
  <img
    src='https://image.flaticon.com/icons/png/128/2909/2909841.png'
    alt=''
    data-tip='This Dish Is Vegetarian'
  />
);
export const spicyIcon = (
  <img
    src='https://cdn0.iconfinder.com/data/icons/food-2-11/128/food-29-512.png'
    alt=''
    data-tip='This Dish Is Spicy'
  />
);

const Dishes: React.FC<PropTypes> = ({ chosenType }) => {
  const { addToCartAction } = useActions();
  const [modalImgUrl, setModalImgUrl] = useState("");

  const closeModal = () => setModalImgUrl("");

  const { data, loading, error } = useQuery<{ getDishes: Dish[] }>(getDishesQuery);

  const dispatch = useDispatch();
  const { isAdmin } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (data?.getDishes) dispatch(getDishesAction(data?.getDishes));
  }, [data, dispatch]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [chosenType, data]);

  return (
    <div className='dishes'>
      {loading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {modalImgUrl && <ModalImg imgUrl={modalImgUrl} closeAction={closeModal} />}
      {data?.getDishes
        ?.filter((dish) => dish.type === chosenType)
        .map((dish) => (
          <React.Fragment key={dish.id}>
            <div className='dish'>
              <div className='img'>
                <img src={dish.imgURL} alt='' onClick={() => setModalImgUrl(dish.imgURL)} />
              </div>
              <h2>
                {dish.name} {dish.isVege && vegeIcon} {dish.isSpicy && spicyIcon}
              </h2>
              <p className='desc'>{dish.description}</p>
              <div className='price'>
                <p>{dish.price} zł</p>
                <button className='ls-2' onClick={() => addToCartAction(dish.id)}>
                  Add to Order
                </button>
                {isAdmin && (
                  <Link to={`/dishes/edit/${dish.id}`}>
                    <button className='ls-2 mt-1 alt' onClick={() => addToCartAction(dish.id)}>
                      Edit Dish
                    </button>
                  </Link>
                )}
              </div>
            </div>
            <hr />
          </React.Fragment>
        ))}
      <ReactTooltip effect='solid' />
    </div>
  );
};

export default Dishes;
