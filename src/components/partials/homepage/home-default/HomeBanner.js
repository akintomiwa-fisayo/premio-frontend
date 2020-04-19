import React, { Component } from 'react';

import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import SlideShow from '../../../elements/SlideShow';

class HomeBanner extends Component {
  render() {
    const carouselSetting = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
    };
    return (
      <div className="ps-home-banner ps-home-banner--1 ps-container">
        <SlideShow items={[
          {
            label: '1 the label of tthe item',
            content: <img
              src="/static/img/slider/home-1/slide-1.jpg"
              alt="martfury"
            />,
          },
          {
            label: '2 the label of tthe item',
            content: <img
              src="/static/img/slider/home-1/slide-2.jpg"
              alt="martfury"
            />,
          },
          {
            label: '3 the label of tthe item',
            content: <img
              src="/static/img/slider/home-1/slide-3.jpg"
              alt="martfury"
            />,
          },
        ]}
        />
      </div>
    );
  }
}

export default HomeBanner;
