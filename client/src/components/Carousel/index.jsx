import React from "react";
import Slider from "react-slick";
import {Box} from "@mui/material"
import ImageRoot from "../ImageRoot";

export default function Carousel({listImage}) {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2.5,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
        {
            listImage && listImage?.map((e,i) => (
                <ImageRoot key={i} image={e}/>
            )) 
        }
    </Slider>
  );
}