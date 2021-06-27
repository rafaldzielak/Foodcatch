import React from "react";
import "./dishes.scss";
import ReactTooltip from "react-tooltip";
import { dishesMock } from "../mocks/dishesMock";
import { useActions } from "../hooks/useActions";
import { dishType } from "../screens/MenuScreen";

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
  return (
    <div className='dishes'>
      <hr />
      {dishesMock
        .filter((dish) => dish.type === chosenType)
        .map((dish) => (
          <React.Fragment key={dish.id}>
            <div className='dish'>
              <img src={dish.imgURL} alt='' />
              <h2>
                {dish.title} {dish.isVege && vegeIcon} {dish.isSpicy && spicyIcon}
              </h2>
              <p className='desc'>{dish.description}</p>
              <div className='price'>
                <p>{dish.price} zł</p>
                <button onClick={() => addToCartAction(dish.id)}>Order</button>
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
