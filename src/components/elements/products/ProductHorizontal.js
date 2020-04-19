import React, { Component } from 'react';
import { Rate } from 'antd';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Rating from '../Rating';

class ProductHorizontal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { product, currency } = this.props;
    return (
      <div className="ps-product--horizontal">
        <div className="ps-product__thumbnail">
          <NavLink to="/shop">
            <img src={product.thumbnail} alt="martfury" />
          </NavLink>
        </div>
        <div className="ps-product__content">
          <NavLink to={`/product/${product.id}`} className="ps-product__title">{product.title} </NavLink>
          <div className="ps-product__rating">
            <Rating />
          </div>
          {product.sale === true ? (
            <p className="ps-product__price sale">
              {currency ? currency.symbol : '$'}
              {product.price}
              <del className="ml-2">
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
export default connect(mapStateToProps)(ProductHorizontal);
