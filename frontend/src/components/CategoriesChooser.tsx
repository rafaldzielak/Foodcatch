import React, { useState } from "react";
import "./categories-chooser.scss";

const categoriesMock = ["Appetizers", "Soups", "Main Dishes", "Desserts"];

const TypeChooser = () => {
  const [selected, setSelected] = useState(categoriesMock[0]);
  return (
    <nav className='type-chooser noselect'>
      {categoriesMock.map((categorie, index) => (
        <div
          className={selected === categorie ? "active" : ""}
          onClick={() => setSelected(categoriesMock[index])}>
          {categorie}
        </div>
      ))}
    </nav>
  );
};

export default TypeChooser;
