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
          <button className='big transparent mr-5'>Order Online</button>
        </Link>
        <TableBook />
      </div>
    </>
  );
};

export default HomeScreen;
