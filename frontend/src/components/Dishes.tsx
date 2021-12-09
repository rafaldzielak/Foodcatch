import React, { useEffect } from "react";
import "./dishes.scss";
import ReactTooltip from "react-tooltip";
import { dishesMock } from "../mocks/dishesMock";
import { useActions } from "../hooks/useActions";
import { dishType } from "../screens/MenuScreen";
import { useState } from "react";
import ModalImg from "./ModalImg";

interface PropTypes {
  chosenType: dishType;
}

const vegeIcon = (
  <img
    src='https://image.flaticon.com/icons/png/128/2909/2909841.png'
    alt=''
    data-tip='This Dish Is Vegetarian'
  />
);
const spicyIcon = (
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

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [chosenType]);

  return (
    <div className='dishes'>
      {modalImgUrl && <ModalImg imgUrl={modalImgUrl} closeAction={closeModal} />}
      {dishesMock
        .filter((dish) => dish.type === chosenType)
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
