import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeAds = () => (
  <div className="ps-home-ads">
    <div className="ps-container">
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
          <NavLink to="/shop" className="ps-collection">
            <img
              src="/static/img/collection/home-1/1.jpg"
              alt="martfury"
            />
          </NavLink>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
          <NavLink to="/shop" className="ps-collection">
            <img
              src="/static/img/collection/home-1/2.jpg"
              alt="martfury"
            />
          </NavLink>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
          <NavLink to="/shop" className="ps-collection">
            <img
              src="/static/img/collection/home-1/3.jpg"
              alt="martfury"
            />
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);

export default HomeAds;
