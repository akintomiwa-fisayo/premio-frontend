import React, { Component } from 'react';
import Slider from 'react-slick';
import { NavLink } from 'react-router-dom';
import NextArrow from '../../../elements/carousel/NextArrow';
import PrevArrow from '../../../elements/carousel/PrevArrow';
import CountDownSimple from '../../../elements/CountDownSimple';

import ProductDealOfDay from '../../../elements/products/ProductDealOfDay';
import { onSale } from '../../../../public/static/data/product';
import Product from '../../../elements/products/Product';

class HomeProductsPreview extends Component {
  render() {
    const { props } = this;
    return (
      <div className="products-prev ps-container">
        <div className="products-prev-header">
          <h4>{props.title}</h4>
          <NavLink to="/shop"> View all </NavLink>
        </div>

        <div className="products-preview">
          {onSale.map((product) => (
            <Product
              product={product}
              key={product.title}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default HomeProductsPreview;
