import React, { useEffect, useState } from "react";
import "./dishes.scss";
import ReactTooltip from "react-tooltip";

const dishesMock = [
  {
    id: 1284723,
    title: "Greek Olives With Feta Filling",
    description:
      "Olives are one of those foods that can divide a room. But after over a decade in Greece, where if you declared that you disliked olives you would be met with disbelieving, uncomprehending stares, I am firmly in the ‘love them’ camp. And so will you be if you try stuffing juicy olives with a delicious feta cheese mixture, crumbing them and frying them!",
    isVege: true,
    isSpicy: false,
    imgURL: "./img/appetizer.jpg",
  },
  {
    id: 1284723,
    title: "Fried Calamari With Salsa Sauce",
    description:
      "This fried calamari recipe is tender pieces of squid soaked in buttermilk, then coated in seasoned flour and deep fried to golden brown perfection.",
    isVege: true,
    isSpicy: true,
    imgURL: "./img/calmari.png",
  },
  {
    id: 1284724,
    title: "Grilled Shrimp and Chorizo",
    description:
      "Shrimp and Chorizo Appetizers with Roasted Pepper Soup — These punchy and flavorful skewers are packed with spicy chorizo and shrimp, served with homemade roasted pepper soup shooters. Perfect as a party appetizer, your guests won’t be able to stop at 1!",
    isVege: false,
    isSpicy: false,
    imgURL: "./img/shrimp.bmp",
  },
];

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

const Dishes = () => {
  return (
    <>
      {dishesMock.map((dish) => (
        <React.Fragment key={dish.id}>
          <div className='dish'>
            <img src={dish.imgURL} alt='' />
            <h2>
              {dish.title} {dish.isVege && vegeIcon} {dish.isSpicy && spicyIcon}
            </h2>
            <p className='desc'>{dish.description}</p>
            <div className='buy'>Add to Cart Area</div>
          </div>
          <hr />
        </React.Fragment>
      ))}
      <ReactTooltip effect='solid' />
    </>
  );
};

export default Dishes;
