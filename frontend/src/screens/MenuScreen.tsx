import "./menu-screen.scss";
import React from "react";
import TypeChooser from "../components/CategoriesChooser";
import Dishes from "../components/Dishes";
import { OrderComponent } from "../components/OrderComponent";

const MenuScreen = () => {
  return (
    <main className='container'>
      <TypeChooser />
      <div className='menu'>
        <Dishes />
        <OrderComponent />
      </div>
    </main>
  );
};

export default MenuScreen;
