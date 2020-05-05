import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCart, removeItem, updateCartSuccess } from '../../store/cart/action';
import { onSale } from '../../public/static/data/product';


class Cart extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatch(getCart());
    // set Cart items
    this.props.dispatch(updateCartSuccess({
      cartItems: onSale,
    }));
  }

  handleRemoveCartItem(product) {
    this.props.dispatch(removeItem(product));
  }

  render() {
    const {
      amount, cartItems, nav, header,
    } = this.props;
    console.log(this.props);
    return (
      <div id="cartDrawalContent">
        <div className="ps-panel__content  ps-container">
          <div className="ps-cart--mobile">
            <div className="ps-cart__content">
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((product) => (
                  <div className="ps-product--cart-mobile" key={product.id}>
                    <div className="ps-product__thumbnail">
                      <Link to={`/products/${product.id}`}>
                        <img src={product.thumbnail} alt="martfury" />
                      </Link>
                    </div>
                    <div className="ps-product__content">
                      <span
                        className="ps-product__remove"
                        onClick={this.handleRemoveCartItem.bind(this, product)}
                      >
                        <i className="icon-cross" />
                      </span>
                      <Link to={`/products/${product.id}`} className="ps-product__title"> {product.title} </Link>
                      <p className="vendor"> <strong>Sold by:</strong> {product.vendor} </p>
                      <p className="price"> ${product.price} </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="ps-cart__items">
                  <span>No products in cart</span>
                </div>
              )}
            </div>
            <div className="ps-cart__footer">
              <h3> Sub Total:<strong>${amount || 4000}</strong> </h3>
              <button type="button" className="btn btn-default">Checkout </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.cart,
  ...state.setting,
});
export default connect(mapStateToProps)(Cart);
