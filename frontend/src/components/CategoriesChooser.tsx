import React, { useState } from "react";
import "./categories-chooser.scss";

const categoriesMock = ["Appetizers", "Soups", "Main Dishes", "Desserts"];
interface PropTypes {
  setType: Function;
}

const TypeChooser: React.FC<PropTypes> = ({ setType }) => {
  const [selected, setSelected] = useState(categoriesMock[0]);
  return (
    <nav className='type-chooser noselect'>
      {categoriesMock.map((categorie, index) => (
        <div
          key={categorie}
          className={selected === categorie ? "active" : "inactive"}
          onClick={() => {
            setType(categoriesMock[index]);
            setSelected(categoriesMock[index]);
          }}>
          {categorie}
        </div>
      ))}
    </nav>
  );
};

export default TypeChooser;
