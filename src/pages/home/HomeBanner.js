import React, { Component } from 'react';

import SlideShow from '../../components/elements/SlideShow';

import slide1 from '../../public/static/img/slider/home-1/slide-1.jpg';
import slide2 from '../../public/static/img/slider/home-1/slide-2.jpg';
import slide3 from '../../public/static/img/slider/home-1/slide-3.jpg';

class HomeBanner extends Component {
  render() {
    return (
      <div className="ps-home-banner ps-home-banner--1">
        <SlideShow
          items={[
            {
              label: '1 the label of tthe item',
              content: <img
                src={slide1}
                alt="martfury"
              />,
            },
            {
              label: '2 the label of tthe item',
              content: <img
                src={slide2}
                alt="martfury"
              />,
            },
            {
              label: '3 the label of tthe item',
              content: <img
                src={slide3}
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
