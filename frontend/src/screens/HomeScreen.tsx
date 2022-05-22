import React from "react";
import { Link } from "react-router-dom";
import "./homescreen.scss";
import TableBook from "./TableBook";
import res from "../assets/img/res.jpg";
import res2 from "../assets/img/res2.jpg";
import res3 from "../assets/img/res3.jpg";
import res4 from "../assets/img/res4.jpg";
import res5 from "../assets/img/res5.jpg";
import res6 from "../assets/img/res6.jpg";
import res7 from "../assets/img/res7.jpg";
import res8 from "../assets/img/res8.jpg";
import res9 from "../assets/img/res9.jpg";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const HomeScreen = () => {
  return (
    <div className='homescreen'>
      <Carousel
        autoPlay
        infiniteLoop
        interval={5000}
        // showArrows={false}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        stopOnHover={false}
        swipeable={false}
        transitionTime={1000}>
        <img src={res} alt='' />
        <img src={res2} alt='' />
        <img src={res3} alt='' />
        <img src={res4} alt='' />
        <img src={res5} alt='' />
        <img src={res6} alt='' />
        <img src={res7} alt='' />
        <img src={res8} alt='' />
        <img src={res9} alt='' />
      </Carousel>
      <h1 className='front-page'>Order Happiness</h1>
      <Link to='/menu'>
        <button className='big transparent mr-5'>Order Online</button>
      </Link>

      <TableBook />
    </div>
  );
};

export default HomeScreen;
