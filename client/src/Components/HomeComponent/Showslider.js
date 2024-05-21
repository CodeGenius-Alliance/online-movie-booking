import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ShowSlider.css";

const carouselShows = [
  {
    id: 1,
    img: "https://assets-in.bmscdn.com/promotions/cms/creatives/1707397896423_patteweb.jpeg",
  },
  {
    id: 2,
    img: "https://assets-in.bmscdn.com/promotions/cms/creatives/1707830089268_fisherweb.jpg",
  },
  {
    id: 3,
    img: "https://assets-in.bmscdn.com/promotions/cms/creatives/1708515826796_desksksk.jpg",
  },
];

function Showslider() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    // rtl: true  right to left
  };
  return (
    <Slider {...settings}>
      {carouselShows.map((it) => (
        <div className="banner-div">
          <img className="banner-image" src={it.img} alt="" />
        </div>
      ))}
    </Slider>
  );
}

export default Showslider;
