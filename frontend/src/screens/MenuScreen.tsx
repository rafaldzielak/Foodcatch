import "./menu-screen.scss";
import React from "react";
import TypeChooser from "../components/CategoriesChooser";
import Dishes from "../components/Dishes";
import { OrderComponent } from "../components/OrderComponent";
import { useState } from "react";

export type dishType = "Appetizers" | "Soups"| "Main Dishes"| "Desserts" | "";

const MenuScreen = () => {
   const [chosenType, setChosenType] = useState<dishType>("Appetizers")

  return (
    <main className='container'>
      <TypeChooser setType={setChosenType} />
      <div className='menu'>
        <Dishes chosenType={chosenType} />
        <OrderComponent  />
      </div>
    </main>
  );
};

export default MenuScreen;
