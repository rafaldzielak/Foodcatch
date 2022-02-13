import React, { useEffect } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserFromDbAction, logoutUserAction } from "../state/actions/AuthActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const Navbar = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromDbAction());
  }, [dispatch]);

  const user = useTypedSelector((state) => state.user);

  const handleUserLogout = () => {
    dispatch(logoutUserAction());
  };

  if (pathname !== "/")
    return (
      <nav className='navbar'>
        <div className='container'>
          <div>
            <Link to='/'>
              <img src='./img/logo2.png' alt='' /> <span className='title'>FoodCatch</span>
            </Link>
          </div>
          {user.email && user.isAdmin && (
            <div>
              <h4>
                <span className='mr-1'>You are logged in as an admin.</span>
                <Link to='/admin/orders' className='mr-1'>
                  <button>Orders</button>
                </Link>
                <Link to='/admin/bookings' className='mr-1'>
                  <button>Bookings</button>
                </Link>
                <button onClick={handleUserLogout}>Logout</button>
              </h4>
            </div>
          )}
        </div>
      </nav>
    );
  else return <></>;
};

export default Navbar;
