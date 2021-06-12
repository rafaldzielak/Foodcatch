import React from "react";
import TypeChooser from "../components/CategoriesChooser";
import Dishes from "../components/Dishes";

const MenuScreen = () => {
  return (
    <main className='container'>
      <TypeChooser />
      <Dishes />
    </main>
  );
};

export default MenuScreen;
