import React, { useEffect } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserFromDbAction } from "../state/actions/AuthActions";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromDbAction());
  }, [dispatch]);

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
