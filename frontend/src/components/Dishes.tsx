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
import { BroccoliImg, PepperImg, BestSellerImg, NewImg } from "../assets/svg";

interface PropTypes {
  chosenType: dishType;
}

export const vegeIcon = <BroccoliImg data-tip='Vegetarian' />;
export const spicyIcon = <PepperImg data-tip='Spicy' />;
export const bestsellerIcon = <BestSellerImg data-tip='Our Bestseller' />;
export const newIcon = <NewImg data-tip='New in Our Offer' />;

const Dishes: React.FC<PropTypes> = ({ chosenType }) => {
  const { addToCartAction } = useActions();
  const [modalImgUrl, setModalImgUrl] = useState("");

  const closeModal = () => setModalImgUrl("");

  const { data: orderData, loading, error } = useQuery<{ getDishes: Dish[] }>(getDishesQuery);

  const dispatch = useDispatch();
  const { isAdmin } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (orderData?.getDishes) dispatch(getDishesAction(orderData?.getDishes));
  }, [orderData, dispatch]);

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [chosenType, orderData]);

  return (
    <div className='dishes'>
      {loading && <Loader />}
      {error && <Alert>{error}</Alert>}
      {modalImgUrl && <ModalImg imgUrl={modalImgUrl} closeAction={closeModal} />}
      {orderData?.getDishes
        ?.filter((dish) => dish.type === chosenType)
        .map((dish) => {
          const { isNew, isBestseller, isSpicy, isVege } = dish;
          return (
            <React.Fragment key={dish.id}>
              <div className='dish'>
                <div className='img'>
                  <img src={dish.imgURL} alt='' onClick={() => setModalImgUrl(dish.imgURL)} />
                </div>
                <h2>
                  {dish.name} {isVege && vegeIcon} {isSpicy && spicyIcon} {isNew && newIcon}{" "}
                  {isBestseller && bestsellerIcon}
                </h2>
                <p className='desc'>{dish.description}</p>
                <div className='price'>
                  <p>{dish.price} zł</p>
                  <button className='ls-2' onClick={() => addToCartAction(dish.id)}>
                    Add to Order
                  </button>
                  {isAdmin && (
                    <Link to={`/dishes/edit/${dish.id}`}>
                      <button className='ls-2 mt-1 alt'>Edit Dish</button>
                    </Link>
                  )}
                </div>
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      <ReactTooltip effect='solid' />
    </div>
  );
};

export default Dishes;
