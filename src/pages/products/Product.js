import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem } from '../../store/cart/action';
import Rating from './Rating';
import { ucFirst } from '../../lib/js';

class Product extends Component {
  render() {
    const { product } = this.props;

    return (
      <Link to={`/products/${product.id}`} className="ps-product">
        <div className="ps-product__thumbnail">
          <img src={product.thumbnail} alt="product thumbnail" />
        </div>

        <div className="ps-product__container">
          <span className="ps-product__vendor">{product.companyName}</span>
          <div className="ps-product__content">
            <p className="ps-product__title">{ucFirst(product.title)} </p>
            <div className="ps-product__rating">
              <Rating />
              <span>{product.ratingCount}</span>
            </div>
            <p className="sales-count">Sold: {product.sold}</p>
            <div className="ps-product__price sale product-price">
              <span><span>#</span>{product.price.toLocaleString('en-GB')}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
const mapStateToProps = (state) => state.setting;
export default connect(mapStateToProps)(Product);
