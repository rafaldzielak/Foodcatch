import React from "react";
import { Link } from "react-router-dom";
import "./homescreen.scss";

const HomeScreen = () => {
  return (
    <>
      <div className='homescreen'>
        <h1>Order Happiness</h1>
        <Link to='/menu'>
          <button className='transparent'>Show Menu</button>
        </Link>
      </div>
    </>
  );
};

export default HomeScreen;
