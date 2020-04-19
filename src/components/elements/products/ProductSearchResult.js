import React, { Component } from 'react';
import { Rate } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Rating from '../Rating';

class ProductResult extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { product, currency } = this.props;

    return (
      <div className="ps-product ps-product--wide ps-product--search-result">
        <div className="ps-product__thumbnail">
          <NavLink to={`/product/${product.id}`}>
            <img src={product.thumbnail} alt="martfury" />
          </NavLink>
        </div>
        <div className="ps-product__content">
          <NavLink to={`/product/${product.id}`} className="ps-product__title">{product.title} </NavLink>
          <div className="ps-product__rating">
            <Rating />
            <span>{product.ratingCount}</span>
          </div>
          {product.sale === true ? (
            <p className="ps-product__price sale">
              {currency ? currency.symbol : '$'}
              {product.price}
              <del className="ml-1">
                {currency ? currency.symbol : '$'}
                {product.salePrice}
              </del>
            </p>
          ) : (
            <p className="ps-product__price">
              {currency ? currency.symbol : '$'}
              {product.price}
            </p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => state.setting;
export default connect(mapStateToProps)(ProductResult);
