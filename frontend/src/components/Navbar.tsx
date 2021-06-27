import React from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  if (pathname !== "/")
    return (
      <nav className='navbar'>
        <div className='container'>
          <div>
            <Link to='/'>
              <img src='./img/logo2.png' alt='' /> <span className='title'>FoodCatch</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  else return <></>;
};

export default Navbar;
