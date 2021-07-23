import React from "react";
import { Link } from "react-router-dom";
import "./homescreen.scss";
import TableBook from "./TableBook";

const HomeScreen = () => {
  return (
    <>
      <div className='homescreen'>
        <h1 className='front-page'>Order Happiness</h1>
        <Link to='/menu'>
          <button className='transparent mr-5'>Show Menu</button>
        </Link>
        <TableBook />
      </div>
    </>
  );
};

export default HomeScreen;
