import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import TypeChooser from "../components/CategoriesChooser";
import Dishes from "../components/Dishes";
import { OrderComponent } from "../components/OrderComponent";
import "./menu-screen.scss";

export type dishType = "Appetizers" | "Soups" | "Main Dishes" | "Desserts" | "";

const MenuScreen = () => {
  const [chosenType, setChosenType] = useState<dishType>("Appetizers");

  return (
    <main className='container'>
      <Helmet>
        <title>Menu | FoodCatch</title>
      </Helmet>
      <TypeChooser setType={setChosenType} />
      <div className='menu'>
        <Dishes chosenType={chosenType} />
        <OrderComponent />
      </div>
    </main>
  );
};

export default MenuScreen;
